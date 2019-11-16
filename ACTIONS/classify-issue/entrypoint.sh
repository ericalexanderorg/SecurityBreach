#!/bin/bash

# Set issue number and title
GITHUB_ISSUE_NUMBER=$(jq --raw-output .issue.id "$GITHUB_EVENT_PATH")
GITHUB_ISSUE_TITLE=$(jq --raw-output .issue.title "$GITHUB_EVENT_PATH")

# Grab the issue body and extract the first URL
GITHUB_ISSUE_BODY=$(jq --raw-output .issue.body "$GITHUB_EVENT_PATH")
echo "$GITHUB_ISSUE_BODY"
URL=$(echo "$GITHUB_ISSUE_BODY" | grep -o "https\?://[a-zA-Z0-9./?=_-]*")
echo "$URL"

# Create a branch with the
BRANCH_NAME="auto-classified-issue-$GITHUB_ISSUE_NUMBER"

git checkout -b $BRANCH_NAME

# Setup a virtual environment and install dependencies.
python3 -m venv ./.ve
source ./.ve/bin/activate
pip3 install -r ML/SCRIPTS/requirements-classify-sklearn.txt

# Prep dataset file by removing last 3 lines that contain: }]}
$DATA_FILE="UI/v1/src/dataProvider/security-breach-v1.json"
$TEMP=$(cat UI/v1/src/dataProvider/security-breach-v1.json | head -n -3 file)
echo "$TEMP" > $DATA_FILE
echo "   }," >> $DATA_FILE

# Classify and append to dataset
python ML/SCRIPTS/classify-sklearn.py $URL $GITHUB_ISSUE_TITLE >> $DATA_FILE

# Add last two lines we removed earlier
echo "  ]" >> $DATA_FILE
echo "}" >> $DATA_FILE

# Pass issue number to next step using output variable
echo ::set-output name=issue_number::$GITHUB_ISSUE_NUMBER
