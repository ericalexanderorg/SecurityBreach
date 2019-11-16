FROM smizy/scikit-learn:0.21.3-alpine

LABEL "com.github.actions.name"="Classify security breach"
LABEL "com.github.actions.description"="Pull SUMMRY, classify, add comments to issue, and create a PR."
LABEL "com.github.actions.icon"="message-square"
LABEL "com.github.actions.color"="gray-dark"

LABEL "repository"="https://github.com/ericalexanderorg/SecurityBreach/ACTIONS/classify-issue"
LABEL "homepage"="https://github.com/ericalexanderorg/SecurityBreach/ACTIONS/classify-issue"
LABEL "maintainer"="Eric Alexander"

RUN apk add --no-cache bash curl jq

COPY "entrypoint.sh" "/entrypoint.sh"
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]