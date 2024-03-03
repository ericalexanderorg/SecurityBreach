import json
import os

def etl(data_dir, output_file):
    data = {}
    data['breaches'] = []
    breach_id = 0

    for item in os.listdir(data_dir):
        if item.endswith('.json'):
            item_path = os.path.join(data_dir, item)
            with open(item_path, 'r') as json_file:
                file_data = json.load(json_file)
                file_data['id'] = breach_id
                breach_id += 1
            key = item.split('.')[0]
            data['breaches'].append(file_data)

    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)


data_dir = '../../DATA/BREACHES/V1'
output_file = '../v2/src/data.json'
etl(data_dir, output_file)