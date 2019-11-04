import json
import os
import requests
import csv
from urllib.parse import urlparse
from urllib.parse import quote


# pull the summry if we don't already have it
def get_summries(breach):
    # Set flag to determine if we're going to attempt to pull summry from their API
    pull_summry = True
    summries=[]
    for link in breach['links']:
        # extract the domain name, we'll use it in our filename
        parsed_uri = urlparse(link)
        domain = parsed_uri.netloc
        # clean up our entity name so it works in the filename
        entity = quote(breach['entity'], safe= '')
        # define our filename
        fname = '{}.{}.{}.{}.txt'.format(breach['year'], breach['month'], entity, domain).lower()
        print(fname)
        # File already exists in our cache?
        fpath = '../DATA/SUMMRY/{}'.format(fname)
        if os.path.exists(fpath):
            print('Link found in cache: {}'.format(link))
            f = open(fpath, "r")
            summries.append(f.read())
        elif pull_summry:
            # Pull the summry
            print('Pulling summry: {}'.format(link))
            api_url = "https://api.smmry.com/&SM_API_KEY={}&SM_URL={}".format(os.environ.get('SM_API_KEY'),link)
            r = requests.get(api_url)
            data = r.json()
            if 'sm_api_message' in data:
                if 'INVALID API KEY' in data['sm_api_message']:
                    print('Invalid SUMMRY api key, exiting')
                    os._exit(1)
                elif 'DAILY QUOTA' in data['sm_api_message']:
                    print('Daily quota hit. Will not attempt to pull SUMMRY again')
                    pull_summry = False
                else:
                    api_error = "API ERROR: {}".format(data['sm_api_message'])
                    print(api_error)
                    # Add error to cache so we don't try and pull again
                    data['sm_api_content'] = api_error
            if 'sm_api_content' in data:
                summry = data['sm_api_content']
                # Write it to our cache
                f = open(fpath, "a")
                f.write(summry)
                # append it to our results
                summries.append(summry)
        return summries


def main():
    # Pull in breach data
    breaches = json.loads(open('../../UI/v1/src/dataProvider/security-breach-v1.json').read())

    # Define essential tags
    # We're going to be using to create our CSVs
    essential_tags=['actor','motive','initial-access']
    data={}
    for tag in essential_tags:
        data[tag]=[]
    #print(data)

    # Iterate through the breach data
    for breach in breaches['breaches']:
        for tag in essential_tags:
            if tag in breach['tags']:
                if not breach['tags'][tag] is "?" and not breach['tags'][tag] is "":
                    for summry in get_summries(breach):
                        this_data = {'Tag': breach['tags'][tag], 'Data': summry}
                        data[tag].append(this_data)
    

    print('Creating CSV files')
    csv_columns = ['Tag','Data']
    for tag in essential_tags:
        csv_file = "../DATA/CSV/{}.csv".format(tag)
        #try:
        with open(csv_file, 'w') as csvfile:
            print('Opened {}'.format(csv_file))
            writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
            writer.writeheader()
            for d in data[tag]:
                try:
                    writer.writerow(d)
                except:
                    print("Error writing the following data to file {}: {}".format(csv_file,d))
        #except IOError:
        #    print("I/O error writing file {}".format(csv_file)) 


if __name__ == "__main__":
    main()
