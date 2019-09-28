# Data Management
This doc defines how we manage data within the json file and how we manage json versioning

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


