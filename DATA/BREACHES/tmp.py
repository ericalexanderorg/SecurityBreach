import os
import json

def read_taxonomy(file_path):
    d = {}
    with open(file_path, 'r') as file:
        data = json.load(file)

    for k in data['tag-taxonomy']['initial-access']:
        alias = data['tag-taxonomy']['initial-access'][k]['alias']
        d[alias] = k;

    return d

def replace_tags(directory, taxonomy_dict):
    # Iterate through files in the directory
    count = 0
    for filename in os.listdir(directory):
        if filename.endswith('.json'):
            print(filename)
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as file:
                data = json.load(file)

            # Check if the 'tags' key exists and contains 'initial-access' key
            if 'tags' in data and 'initial-access' in data['tags']:
                initial_access_value = data['tags']['initial-access']
                # Check if the initial-access value exists in the taxonomy dictionary
                if initial_access_value in taxonomy_dict and initial_access_value:
                    # Replace the initial-access value with the corresponding value from the taxonomy dictionary
                    data['tags']['initial-access'] = taxonomy_dict[initial_access_value]

            # Write the updated JSON data back to the file
            with open(filepath, 'w') as file:
                json.dump(data, file, indent=4)

        count += 1
        
        if count >= 500000000:
            os._exit(0)


directory_path = './V1'
taxonomy_file_path = 'taxonomy_v1.json'

taxonomy = read_taxonomy(taxonomy_file_path)
#print(taxonomy)

replace_tags(directory_path, taxonomy)
