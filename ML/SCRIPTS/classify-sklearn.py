import sys
import os
import json
import re
from datetime import datetime
from sklearn.datasets import load_files
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import SGDClassifier
from sklearn.naive_bayes import MultinomialNB
import etl as base

def get_month_year(url, summry):
    try:
        month,year = extract_date(summry)
        if month is not None and year is not None:
            return month,year
    except:
        print("Error attempting to extract date from url")

    try:
        month,year = extract_date(url)
        if month is not None and year is not None:
            return month,year
    except: 
        print("Error attemptint to extract date from summry")

    # Couldn't extract a month/year so just set it to the current month/year
    month = datetime.now().month
    year = datetime.now().year

    return month,year
    

def extract_date(input):
    month_dict = {
            "january": "01",
            "february": "02",
            "march": "03",
            "april": "04",
            "may": "05",
            "june": "06",
            "july": "07",
            "august": "08",
            "september": "09",
            "october": "10",
            "november": "11",
            "december": "12"
        }

    # match/extract from this example: https://www.classaction.org/data-breach-lawsuits/ccm-health-march-2024
    pattern = r"(\b(?:january|february|march|april|may|june|july|august|september|october|november|december)\b)-(\d{4})"
    matches = re.findall(pattern, input, re.IGNORECASE)
    if matches:
        for match in matches:
            month_name, year = match
            month = month_dict[month_name.lower()]
            return month,year

    # match/extract from this example: April 10, 2023
    pattern = r"([a-zA-Z]+) (\d{1,2}), (\d{4})"
    match = re.match(pattern, input, re.IGNORECASE)
    print(match)
    if match:
        month_name = match.group(1)
        month = month_dict[month_name]
        year = match.group(3)
        return month,year

    return None,None

def transform_name(name):
    # transform name to meet uclassify constraints on names
    name = name.replace('_', ':')
    name = name.replace('UNKOWN', '?')
    return name

def extract_cost(summry):
    cost = 0
    match = re.search('\$([0-9],*)', summry)
    if match:
        cost = int(match.group(1).replace(",", ""))
    if cost < 1000:
        # Guessing we're talking millions
        cost = cost*1000000        
    return cost

def extract_user_count(summry):
    users = 0
    match = re.search('([0-9,]*[0-9]) members', summry)
    if match:
        users = int(match.group(1).replace(",", ""))
    else:
        # Continue searching
        match = re.search('([0-9,]*[0-9]) users', summry)
        if match:
            users = int(match.group(1).replace(",", ""))
        else:
            # Continue searching
            match = re.search('([0-9,]*[0-9]) records', summry)
            if match:
                users = int(match.group(1).replace(",", ""))        
    return users

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
    month,year = get_month_year(url, summry)

    # Build our output dict
    output = {}
    output['year'] = datetime.now().year
    output['month'] = datetime.now().month
    output['entity'] = sys.argv[2]
    output['summary'] = summry[0:100]
    output['tags'] = {}
    output['tags']['impacted-user-count'] = extract_user_count(summry)
    output['tags']['cost-usd'] = extract_cost(summry)
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
        # Train classifier using multi-nomial naive bayse
        #clf = MultinomialNB().fit(X_train_tfidf, train.target)
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
        try:
            # Write output to file
            f = open(sys.argv[3], "a")
            f.write(json.dumps(output, indent=4, sort_keys=True))
            f.close()  
        except:
            # No append file defined, skipping
            pass
    else:
        return output

if __name__ == "__main__":
    main()





