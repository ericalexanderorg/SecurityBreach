FROM rackspacedot/python37

LABEL "com.github.actions.name"="ML Directory Maintenance"
LABEL "com.github.actions.description"="Moves ML files in appropriate directories"
LABEL "com.github.actions.icon"="message-square"
LABEL "com.github.actions.color"="gray-dark"

LABEL "repository"="https://github.com/ericalexanderorg/SecurityBreach/ACTIONS/ml-directory-maintenance"
LABEL "homepage"="https://github.com/ericalexanderorg/SecurityBreach/ACTIONS/ml-direcory-maintenance"
LABEL "maintainer"="Eric Alexander"

COPY "entrypoint.sh" "/entrypoint.sh"
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]