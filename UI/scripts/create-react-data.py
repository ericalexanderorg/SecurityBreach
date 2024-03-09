import json
import os

def get_google_format(all_years):
    # Get a count of unique years
    year_counts = {}
    for y in all_years:
        if y in year_counts:
            year_counts[y] += 1
        else:
            year_counts[y] = 1

    # Create a two dimensional array for a Google graph
    # See here for more info https://www.react-google-charts.com/examples/bar
    r = [["Year", "Count"]]
    for key in year_counts:
        r.append([key,year_counts[key]]) 

    return r

def get_key_count(k, data):
    # Go through all breach data and extract years into a list
    all_years = []
    for breach in data['breaches']:
        if k in breach:
            all_years.append(str(breach[k]))
    all_years.sort(reverse=True)

    return get_google_format(all_years)

def get_tag_count(k, data):
    # Go through all breach data and extract years into a list
    all_years = []
    for breach in data['breaches']:
        if 'tags' in breach:
            if k in breach['tags']:
                # Get only they main reason by splitting
                tag = breach['tags'][k]
                if ":" in tag:
                    tag = tag.split(":")[0]
                all_years.append(tag)
    all_years.sort(reverse=True)

    return get_google_format(all_years)

def metrics(data):
    m = {}
    m['yearsCount'] = get_key_count('year', data)
    m['monthCount'] = get_key_count('month', data)
    m['actorCount'] = get_tag_count('actor', data)
    m['initialAccessCount'] = get_tag_count('initial-access', data)
    m['motiveCount'] = get_tag_count('motive', data)
            
    return m

def etl(data_dir, data_file, metrics_file):
    data = {}
    data['breaches'] = []
    breach_id = 0

    for item in os.listdir(data_dir):
        if item.endswith('.json'):
            print(item)
            item_path = os.path.join(data_dir, item)
            with open(item_path, 'r') as json_file:
                file_data = json.load(json_file)
                file_data['id'] = breach_id
                breach_id += 1
            key = item.split('.')[0]
            data['breaches'].append(file_data)

    with open(data_file, 'w') as f:
        json.dump(data, f, indent=4)

    m = metrics(data)
    with open(metrics_file, 'w') as f:
        json.dump(m, f, indent=4)


data_dir = '../../DATA/BREACHES/V1'
data_file = '../v2/src/data.json'
metrics_file = '../v2/src/dashboard/metrics.json'
etl(data_dir, data_file, metrics_file)