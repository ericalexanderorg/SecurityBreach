import json
import os
import requests
from datetime import datetime
from urllib.parse import urlparse
from urllib.parse import quote

def debug(message):
    # Always print summry api key error
    if 'api key' in message:
        print(message)
    else:
        #print(message)
        pass

def get_essential_tags():
    return ['actor','motive','initial-access']

def get_summry(link, entity, year=datetime.now().year, month=datetime.now().month):
    # Set flag to determine if we're going to attempt to pull summry from their API
    pull_summry = True
    # extract the domain name, we'll use it in our filename
    parsed_uri = urlparse(link)
    domain = parsed_uri.netloc
    skip_domains = ["reddit.com"]
    if domain in skip_domains:
        pull_summry = False
    # clean up our entity name so it works in the filename
    entity = quote(entity, safe= '')
    # define our filename
    fname = '{}.{}.{}.{}.txt'.format(year, month, entity, domain).lower()
    debug(fname)
    # File already exists in our cache?
    fpath = '../DATA/SUMMRY/{}'.format(fname)
    if os.path.exists(fpath):
        debug('Link found in cache: {}'.format(link))
        f = open(fpath, "r")
        return f.read()
    elif pull_summry:
        # Pull the summry
        debug('Pulling summry: {}'.format(link))
        api_url = "https://api.smmry.com/&SM_API_KEY={}&SM_URL={}".format(os.environ.get('SUMMRY_API_KEY'),link)
        r = requests.get(api_url)
        data = r.json()
        if 'sm_api_message' in data:
            if 'INVALID API KEY' in data['sm_api_message']:
                debug('Invalid SUMMRY api key, exiting')
                os._exit(1)
            if 'DAILY QUOTA' in data['sm_api_message']:
                debug('Daily quota hit. Will not attempt to pull SUMMRY again')
                pull_summry = False
            elif 'SENTENCE AMOUNT REDUCED' in data['sm_api_message']:
                debug(data['sm_api_message'])
                # we'll use it, carry on
            else:
                api_error = "API ERROR: {}".format(data['sm_api_message'])
                debug(api_error)
                # Add error to cache so we don't try and pull again
                data['sm_api_content'] = api_error
        if 'sm_api_content' in data:
            summry = data['sm_api_content']
            # Write it to our cache
            f = open(fpath, "a")
            f.write(summry)
        else:
            print('Error pulling summry on url: {}'.format(link))
            print(data)
            os._exit(1)
        return summry

# pull the summry if we don't already have it
def get_breach_summrys(breach):
    summries=[]
    for link in breach['links']:
        summries.append(get_summry(link, breach['entity'], breach['year'], breach['month']))
    return summries

def get_summrys():
    # Pull in breach data
    path = "../../DATA/BREACHES/V1/"

    # Define data dict using essential tags
    # We're going to be using to create our CSVs
    essential_tags = get_essential_tags()
    data={}
    cleansed_data={}
    cleansed_data['classified']={}
    cleansed_data['test']={}
    for tag in essential_tags:
        data[tag]=[]
        cleansed_data['classified'][tag]=[]
        cleansed_data['test'][tag]=[]

    # Iterate through the breach data and create our data dict
    for breach_file in os.listdir(path):
        # Process breach json files but skip the version json file
        if ".json" in breach_file and "V1.json" not in breach_file:
            print(breach_file)
            with open(path + breach_file) as json_file:
                breach = json.load(json_file)
                # Sanity check. Make sure the tags we need are in the breach data
                for tag in essential_tags:
                    if tag in breach['tags']:
                        # Get summry associated with this breach and tag
                        for summry in get_breach_summrys(breach):
                            this_data = {'Tag': breach['tags'][tag], 'Data': summry}
                            data[tag].append(this_data)

    # Cleanup
    for tag in data:
        for breach in data[tag]:
            # Remove data that has error statements
            if breach['Data'] is not None:
                if 'ERROR' not in breach['Data']:
                    # Remove motive and actor tags with unknown attribution and also use to create our test data
                    if tag in ['motive','actor']:
                        if breach['Tag'] in ['?','']:
                            # add to test data
                            cleansed_data['test'][tag].append(breach)
                        else:
                            # Not enough data to classify by specific actor. Generalize. 
                            if tag is 'actor':
                                actor = breach['Tag']
                                if ":" in actor:
                                    actor = actor.split(':')[0]
                                    cleansed_data['classified'][tag].append({'Tag': actor, 'Data': breach['Data']})
                            else:
                                cleansed_data['classified'][tag].append(breach)
                    else:
                        cleansed_data['classified'][tag].append(breach)

    # Dedupe
    for data_type in cleansed_data:
        for tag in cleansed_data[data_type]:
            temp_list = []
            for index,value in enumerate(cleansed_data[data_type][tag]):
                if value not in temp_list:
                    temp_list.append(value)
            cleansed_data[data_type][tag] = temp_list
    
    return cleansed_data
    


