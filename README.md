# SecurityBreach
Catalog of security breaches. 

View the data through the UI: https://ericalexander.org/SecurityBreach
View the JSON data directly: https://raw.githubusercontent.com/ericalexanderorg/SecurityBreach/master/UI/v1/src/dataProvider/security-breach-v1.json

## Why?
Defensive security starts with situational awareness, it's the first two stages of the OODA Loop. If you have no situational awarenes about what's happening in the real world then you're likely to be chasing your tail and/or the latest security sales person FUD. 

## Desired state/condition
* Crowd sourced finding and cataloging of breach data
* Data stored in a JSON within this repo. Can be downloaded and incorporated into your situational awareness tool of choice. Data is versioned so we can support a current version and one previous version schema for 90 days.
* Github issues used to queue up findings that need to be added. 
* Github peer reviews used to add and validate findings. One or more peer reviews will be needed to add data so we can maintain taxonomy and validate the quality of information.
* A basic react UI that enables easy exploration of the data
* A build pipeline that builds and deploys the UI after every PR approval

## Current state/condition
* A json file with a couple of entries extracted from https://docs.google.com/spreadsheets/d/1UHS9rbGuQZOydJ7XVkUPSlFkFb2ZAvkzX5mq-MxrE2A/edit#gid=0

## Next state
* All data from the sheet above imported

## ETA for next state?
9/29/2019

# Data Management
How we manage data within the json file and how we manage json versioning

# Versioning
At any given time we will support 2 schema versions. 

If schema needs to be changed we will:
* Update the supported key in the previous version to: "supported": false
* The previous version will remain in the repo for 30 days but will no longer be updated

# Data Expectations

## supported
See Versioning above

## tag-taxonomy
Provides additional information for the tags defined within the tag-taxonomy dictionary. Other tags can be used but we prioritize the use of tags within the taxonomy for consistency and additional insight. 

## actor
Additional context on actor attribution and speculation.

## initial-access
Additional context on initial access. When possible we want to reference established frameworks.

## breaches
Look through the current data. It should be self explanitory.
