#!/bin/bash

# CD to where actions/checkout adds code
cd "$GITHUB_WORKSPACE" || exit
echo "$PWD"

cd ML/SCRIPTS || exit
echo "Starting: etl-directory.py"
python3 etl-directory.py
echo "Done: etl-directory.py"

