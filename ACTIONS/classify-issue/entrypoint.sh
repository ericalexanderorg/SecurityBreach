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
# A tool (https://fire.fundersclub.com/) is used to email links to issues
# The tool adds a link to above in the issue, so we need to extract the second link
if [[ $URL == *"fundersclub.com"* ]]; then
    echo "Removing fundersclub.com link"
    URL=$(echo "$GITHUB_ISSUE_BODY" | grep -o "https\?://[a-zA-Z0-9./?=_-]*" | sed -n '2p')
fi

echo "$URL"

echo "Installing dependencies"
#pip3 install -r ./ML/SCRIPTS/requirements-classify-sklearn.txt
pip3 install requests

# Generate output file name
MONTH=$(date '+%m')
YEAR=$(date '+%Y')
ENTITY=$(python3 -c "import urllib.parse; print(urllib.parse.quote_plus('''$GITHUB_ISSUE_TITLE'''))")
DATA_FILE="$GITHUB_WORKSPACE/DATA/BREACHES/V1/$YEAR.$MONTH.$ENTITY.json"
echo "OUTPUT FILE: $DATA_FILE"

# Classify and write output
echo "Classifying"
cd ML/SCRIPTS || exit
python3 classify-sklearn.py "$URL" "$GITHUB_ISSUE_TITLE" "$DATA_FILE"

# Pass issue number to next step using output variable
echo "Generating ouput"
echo ::set-output name=issue_number::"$GITHUB_ISSUE_NUMBER"
echo ::set-output name=pr_comment::"fixes #$GITHUB_ISSUE_NUMBER"
