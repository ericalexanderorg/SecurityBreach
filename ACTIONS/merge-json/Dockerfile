FROM python:3

LABEL "com.github.actions.name"="Merge JSON"
LABEL "com.github.actions.description"="Merges directory of json files into 1 json file."
LABEL "com.github.actions.icon"="message-square"
LABEL "com.github.actions.color"="gray-dark"

LABEL "repository"="https://github.com/ericalexanderorg/SecurityBreach/ACTIONS/merge-json"
LABEL "homepage"="https://github.com/ericalexanderorg/SecurityBreach/ACTIONS/merge-json"
LABEL "maintainer"="Eric Alexander"

COPY "entrypoint.py" "/entrypoint.py"
RUN chmod +x /entrypoint.py
ENTRYPOINT ["/entrypoint.py"]