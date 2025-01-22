#!/usr/bin/env python3
import sys
import json
import subprocess
from datetime import datetime
from pathlib import Path
import re
from urllib.parse import quote
import requests
from github import Github
import os

def extract_links(text):
    url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    return re.findall(url_pattern, text)

def get_first_non_fundersclub_link(links):
    return next((link for link in links if 'fundersclub' not in link.lower()), None)

def sanitize_title(title):
    return quote(title.lower().replace(' ', '-'))

def main():
    if len(sys.argv) != 2:
        print("Usage: script.py <issue_number>")
        sys.exit(1)

    issue_number = int(sys.argv[1])
    
    # Initialize GitHub client (requires GITHUB_TOKEN environment variable)
    token = os.environ.get('GITHUB_TOKEN')
    if not token:
        print("GITHUB_TOKEN environment variable not set")
        sys.exit(1)
    
    g = Github(token)
    repo = g.get_repo(os.environ.get('GITHUB_REPOSITORY', 'ericalexanderorg/SecurityBreach'))
    issue = repo.get_issue(issue_number)
    
    # Extract links and find the first non-fundersclub link
    links = extract_links(issue.body)
    target_link = get_first_non_fundersclub_link(links)
    
    if not target_link:
        print("No suitable link found in issue")
        sys.exit(1)
    
    # Run classify-issue.py and get JSON result
    try:
        result = subprocess.run(
            ['python', 'classify-sklearn.py', target_link, issue.title],
            capture_output=True,
            text=True,
            check=True
        )
        json_data = json.loads(result.stdout)
    except (subprocess.CalledProcessError, json.JSONDecodeError) as e:
        print(f"Error processing classify-issue.py: {e}")
        sys.exit(1)
    
    # Create file path and content
    today = datetime.now()
    entity_name = sanitize_title(issue.title)
    file_path = f'DATA/BREACHES/V1/{today.year}.{today.month:02d}.{entity_name}'
    
    # Create branch
    branch_name = f'breach-{issue_number}'
    default_branch = repo.default_branch
    ref = repo.get_git_ref(f'heads/{default_branch}')
    repo.create_git_ref(f'refs/heads/{branch_name}', ref.object.sha)
    
    # Create or update file in new branch
    try:
        content = json.dumps(json_data, indent=2)
        repo.create_file(
            path=file_path,
            message=f'Add breach data for {entity_name}',
            content=content,
            branch=branch_name
        )
        
        # Create pull request
        pr = repo.create_pull(
            title=f'Add breach data for {entity_name}',
            body=f'Fixes #{issue_number}',
            head=branch_name,
            base=default_branch
        )
        print(f"Created PR: {pr.html_url}")
        
    except Exception as e:
        print(f"Error creating PR: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()