#!/bin/bash

# CD to where actions/checkout adds code
cd "$GITHUB_WORKSPACE" || exit
echo "$PWD"
ls -alh

# Set issue number and title
GITHUB_ISSUE_NUMBER=$(jq --raw-output .issue.number "$GITHUB_EVENT_PATH")
GITHUB_ISSUE_TITLE=$(jq --raw-output .issue.title "$GITHUB_EVENT_PATH")

# Grab the issue body and extract the first URL
echo "Getting URL from issue body"
GITHUB_ISSUE_BODY=$(jq --raw-output .issue.body "$GITHUB_EVENT_PATH")
echo "$GITHUB_ISSUE_BODY"
URL=$(echo "$GITHUB_ISSUE_BODY" | grep -o "https\?://[a-zA-Z0-9./?=_-]*")
echo "$URL"

echo "Installing dependencies"
#pip3 install -r ./ML/SCRIPTS/requirements-classify-sklearn.txt
pip3 install requests


# Prep dataset file by removing last 3 lines that contain: }]}
echo "Prepping dataset"
DATA_FILE="./UI/v1/src/dataProvider/security-breach-v1.json"
TEMP=$(head -n -3 $DATA_FILE)
echo "$TEMP" > $DATA_FILE
echo "}," >> $DATA_FILE

# Classify and append to dataset
echo "Classifying"
JSON="ERROR CLASSIFYING!"
cd ML/SCRIPTS
$JSON=$(python3 classify-sklearn.py "$URL" "$GITHUB_ISSUE_TITLE")
cd ../../
echo "$JSON" >> $DATA_FILE


echo "Finalizing data file"
# Add last two lines we removed earlier
echo "]}" >> "$DATA_FILE"
# Clean up the data file with jq, also validates json.
cat $DATA_FILE | jq > tmp.out
mv tmp.out $DATA_FILE


# Pass issue number to next step using output variable
echo "Generating ouput"
echo ::set-output name=issue_number::"$GITHUB_ISSUE_NUMBER"
echo ::set-output name=json::"$JSON"
