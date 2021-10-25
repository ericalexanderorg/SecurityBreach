# Looking for help
Looking for help. I've struggled with time to keep up on breach intake and attribution. Let me know if you'd like to help. -Eric




# SecurityBreach
Crowd sourced catalog of security breaches. 

View the data through the UI: https://ericalexander.org/SecurityBreach

View the JSON data directly: https://github.com/ericalexanderorg/SecurityBreach/tree/master/DATA/BREACHES/V1

## Why?
Defensive security starts with situational awareness, it's the first two stages of the OODA Loop. If you have no situational awareness about what's happening in the real world, then you're likely to be chasing your tail and/or the latest security marketing FUD. 

## Desired state/condition
- [x] Crowd sourced finding and cataloging of breach data
- [x] Data stored in a JSON within this repo. Can be downloaded and incorporated into your situational awareness tool of choice. Data is versioned so we can support a current version and one previous version schema for 90 days.
- [x] Github issues used to queue up findings that need to be added. 
- [x] Github peer reviews used to add and validate findings. One or more peer reviews will be needed to add data so we can maintain taxonomy and validate the quality of information.
- [x] A basic react UI that enables easy exploration of the data
- [x] A build pipeline that builds and deploys the UI after every PR approval
- [x] Github action on new issues that auto-classifies new breach data into a PR
- [x] Weekly ML job (currently manually run).
- [] Full auto classify. Get the classify ML to the point no humans are needed.
- [] Auto intake. Use the code in the SecurityNews project to auto find breach news and feed into the auto classify.

## State change in progress
* Intake new issues

## ETA for next state update?
January 1, 2021


