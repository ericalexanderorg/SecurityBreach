#!/bin/bash

# CD to where actions/checkout adds code
cd "$GITHUB_WORKSPACE" || exit

# Set issue number and title
GITHUB_ISSUE_NUMBER=$(jq --raw-output .issue.number "$GITHUB_EVENT_PATH")
GITHUB_ISSUE_TITLE=$(jq --raw-output .issue.title "$GITHUB_EVENT_PATH")

# Grab the issue body and extract the first URL
GITHUB_ISSUE_BODY=$(jq --raw-output .issue.body "$GITHUB_EVENT_PATH")
echo "$GITHUB_ISSUE_BODY"
URL=$(echo "$GITHUB_ISSUE_BODY" | grep -o "https\?://[a-zA-Z0-9./?=_-]*")
echo "$URL"

# Install dependencies.
#pip3 install -r ./ML/SCRIPTS/requirements-classify-sklearn.txt

# Prep dataset file by removing last 3 lines that contain: }]}
DATA_FILE="UI/v1/src/dataProvider/security-breach-v1.json"
TEMP=$(cat $DATA_FILE | head -n -3 file)
echo "$TEMP" > $DATA_FILE
echo "   }," >> $DATA_FILE

# Classify and append to dataset
JSON=$(python ML/SCRIPTS/classify-sklearn.py "$URL" "$GITHUB_ISSUE_TITLE")
echo "$JSON" >> $DATA_FILE

# Add last two lines we removed earlier
echo "  ]" >> "$DATA_FILE"
echo "}" >> "$DATA_FILE"

# Pass issue number to next step using output variable
echo ::set-output name=issue_number::"$GITHUB_ISSUE_NUMBER"
echo ::set-output name=json::"$JSON"