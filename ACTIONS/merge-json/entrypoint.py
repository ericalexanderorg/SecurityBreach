#!/usr/bin/env python3

import json
import os

out = os.environ['GITHUB_WORKSPACE'] + "/UI/v1/src/dataProvider/security-breach-v1.json"
path = os.environ['GITHUB_WORKSPACE'] + "/DATA/BREACHES/"
version = "V1"
path = path + version + "/"

with open(path + version + ".json") as initial:
    data = json.load(initial)

data['breaches'] = []

for breach in os.listdir(path):
    version_file_name = version + ".json"
    if breach not in version_file_name:
        with open(path + breach) as breach_file:
            data['breaches'].append(json.load(breach_file))

with open(out, 'w') as write_file:
    json.dump(data, write_file)