import requests
import json
import os
import etl as base

# Function to handle API calls
def uclassify_api(method, path='', payload='', read=True):
    response = {}
    if read:
        token = os.environ.get('UC_API_KEY_READ')
    else: 
        token = os.environ.get('UC_API_KEY_WRITE')
    headers = {
        'Authorization': 'Token {}'.format(token),
        'content-type': 'application/json'
    }
    if not path:
        url = 'https://api.uclassify.com/v1/{}'.format(os.environ.get('UC_UNAME'))
    else:
        url = 'https://api.uclassify.com/v1/{}/{}'.format(os.environ.get('UC_UNAME'), path)
    print(url)
    if method is 'GET':
        r = requests.get(url, headers=headers)
        response = r.json()
    if method is 'POST':
        r = requests.post(url, data=json.dumps(payload), headers=headers)
    if method is 'DELETE':
        r = requests.delete(url, headers=headers)

    if r.status_code is not 200:
        print(r)
        print(r.text)
        print('error calling API, exiting')
        os._exit(1)
    
    return response

def create_classifier(classifier_name):
    # delete it if it exists
    print('Deleting classifier: {}'.format(classifier_name))
    uclassify_api('DELETE', classifier_name, '', False)
    print('Creating classifier: {}'.format(classifier_name))
    payload = {'classifierName': classifier_name}
    uclassify_api('POST','', payload, False)

def create_class(classifier_name, class_name):
    class_name = transform_name(class_name)
    print('Creating class {} in classifier {}'.format(class_name, classifier_name))
    payload = {'className': class_name}
    path = '{}/addClass'.format(classifier_name)
    uclassify_api('POST', path, payload, False)

def train_class(classifier_name, class_name, text_list):
    class_name = transform_name(class_name)
    print('Training class {} in classifier {} with {} texts'.format(class_name, classifier_name, len(text_list)))
    path = '{}/{}/train'.format(classifier_name, class_name)
    payload = {"texts": text_list}
    uclassify_api('POST', path, payload, False)

def transform_name(name):
    # transform name to meet uclassify constraints on names
    name = name.replace(':', '_')
    name = name.replace('_?', '')
    return name

def main():
    # Pull in breach data
    data = base.get_summrys()
    # establish our version number. We'll use it to create our classifier name
    version = "1"
    # Loop through our essential tags
    essential_tags = base.get_essential_tags()
    for tag in essential_tags:
        # Create the classifier. No harm if it's already there
        classifier_name = "security_breach_{}_v{}".format(tag,version)
        create_classifier(classifier_name)
        # Build our class names and add associated texts
        classes = {}
        for d in data['classified'][tag]:
            if d['Tag'] not in classes:
                classes[d['Tag']]=[]
            classes[d['Tag']].append(d['Data'])
        for key, value in classes.items():
            create_class(classifier_name, key)
            train_class(classifier_name, key, value)

if __name__ == "__main__":
    main()