# SecurityBreach
Crowd sourced catalog of security breaches. [Join us on Slack](https://join.slack.com/t/securitybreach/shared_invite/enQtNzk1ODA5MDk5NzE0LTAwODQxMDZkNzAxM2FmZDc2ZGJjN2ZiMmUwOGY2MmI2Y2Q0Y2U3ODhiZTFkMmYzN2JlNjExMDAzM2EyMGI2YjE)

View the data through the UI: https://ericalexander.org/SecurityBreach

View the JSON data directly: https://raw.githubusercontent.com/ericalexanderorg/SecurityBreach/master/UI/v1/src/dataProvider/security-breach-v1.json

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

## State change in progress
* Intake new issues

## ETA for next state update?
January 1, 2020


