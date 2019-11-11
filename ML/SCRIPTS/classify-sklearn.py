import sys
import os
import json
from datetime import datetime
from sklearn.datasets import load_files
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import SGDClassifier
from sklearn.naive_bayes import MultinomialNB
import etl as base

def transform_name(name):
    # transform name to meet uclassify constraints on names
    name = name.replace('_', ':')
    name = name.replace('UNKOWN', '?')
    return name

def main(url='', entity=''):
    # Determine if we're in a script. We'll use to determine output later.
    script = False
    # Sanity check
    if not url and not entity:
        # Was called directly as a script, validate arguments
        message='No url defined. Pass a URL like so: python3 classify-sklearn.py https://example.com "Entity Name"'
        if len(sys.argv) < 3:
            sys.exit(message)
        url = sys.argv[1]
        if not url.startswith('http'):
            sys.exit(message)
        script = True

    # Get our summry
    summry = base.get_summry(url, sys.argv[2])

    # Build our output dict
    output = {}
    output['year'] = datetime.now().year
    output['month'] = datetime.now().month
    output['entity'] = sys.argv[2]
    output['summary'] = summry[0:100]
    output['tags'] = {}
    output['tags']['impacted-user-count'] = 0
    output['tags']['cost-usd'] = 0
    output['links'] = []
    output['links'].append(url)

    # Define essential tags
    essential_tags = base.get_essential_tags()

    # Predict essential tags
    for etag in essential_tags:
        # Load our training data
        train_dir = "../DATA/SKLEARN/{}".format(etag)
        train = load_files(train_dir, encoding="utf-8")
        # Establish occurance counts
        count_vect = CountVectorizer()
        X_train_counts = count_vect.fit_transform(train.data)
        # Establish frequency counts
        tfidf_transformer = TfidfTransformer()
        X_train_tfidf = tfidf_transformer.fit_transform(X_train_counts)
        # Select classifier based on etag
        # Not sure why but the nb classifier works better with actor
        if etag in ['actor']:
            # Train classifier using multi-nomial naive bayse
            clf = MultinomialNB().fit(X_train_tfidf, train.target)
        else:
            # Train using stochastic gradient descent
            clf = SGDClassifier().fit(X_train_tfidf, train.target)

        # Predict current summry
        # Establish occurance counts
        X_new_counts = count_vect.transform([summry])
        # Establish frequency counts
        X_new_tfidf = tfidf_transformer.transform(X_new_counts)
        predicted = clf.predict(X_new_tfidf)
        # Get our predicted category
        for doc, category in zip([summry], predicted):
            category = train.target_names[category]
        
        # Add to our output
        output['tags'][etag] = transform_name(category)
    
    if script:
        print('------------------------------------------------------------------------------------')
        print(summry)
        print('------------------------------------------------------------------------------------')
        print(json.dumps(output, indent=4, sort_keys=True))
        print('------------------------------------------------------------------------------------')
    else:
        return output

if __name__ == "__main__":
    main()





