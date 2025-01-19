import os
import requests
from openai import OpenAI
import urllib.parse
import sys
import re
from datetime import datetime

# Set your GitHub token and OpenAI API key as environment variables
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
GITHUB_REPO = "ericalexanderorg/SecurityBreach"

# GitHub API base URL
GITHUB_API_URL = "https://api.github.com"

client = OpenAI(api_key=OPENAI_API_KEY)

# Headers for GitHub and OpenAI API requests
github_headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def extract_url(input_string):
    # Regular expression to find URLs
    url_pattern = r'https?://\S+'
    urls = re.findall(url_pattern, input_string)
    
    # Return the first URL found (or None if no URL is found)
    return urls[0] if urls else None

# Function to get the issue details
def get_issue_details(issue_number):
    url = f"{GITHUB_API_URL}/repos/{GITHUB_REPO}/issues/{issue_number}"
    response = requests.get(url, headers=github_headers)
    if response.status_code == 200:
        issue_data = response.json()
        description = issue_data['body']
        return extract_url(description)
    else:
        print(f"Error fetching issue {issue_number}: {response.status_code}")
        return None

# Function to extract URL from the issue description
def extract_url(description):
    # Search for URLs in the description
    import re
    urls = re.findall(r'https?://\S+', description)
    return urls[0] if urls else None

# Function to send prompt to ChatGPT API with updated requirements
def get_chatgpt_response(url):
    prompt = f"""
Please provide a summary of the article at the following URL, classify it using the following criteria, and return the information in JSON format:

- **entity**: The entity that was hacked.
- **links**: A list of the article URLs.
- **month**: The month the event occurred as a number.
- **summary**: A brief summary of the article that focuses on how the hack occurred (140 characters or less).
- **tags**:
  - **actor**: One of the following: `Criminal`, `Nation State: [Actor Name]`, `Hacktivist`, `Insider`.
  - **cost-usd**: The monetary cost in USD if mentioned, otherwise 0.
  - **impacted-user-count**: The number of users affected, if mentioned, otherwise 0.
  - **initial-access**: One of the following: `SIM Card Swap`, `Phishing`, `OWASP`, `Monitoring Failure`, `Missing Patch`, `Misconfiguration`, `Insider`, `Injection`, `Hijack`, `Hardware Additions`, `DOS`, `Compromised Valid Account`, `Compromised Account`, `Broken Authentication and Session Management`, `Broken Access Control`, `BEC`.
  - **motive**: One of the following: `Political`, `PII`, `Money`, `Hacktivist`, `Hacktivism`, `Espionage`.
- **year**: The year the event occurred as a number.

URL: {url}
    """
    print(url)
    response = client.chat.completions.create(model="gpt-4o",
    messages=[
        {"role": "developer", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": f"{prompt}"
        }
    ]
    )
    print(response)
    return response.choices[0].text.strip()

# Function to create a GitHub PR with the given data
def create_github_pr(file_name, content, issue_number):
    # Create the branch and commit the file
    branch_name = f"update-breach-{file_name}"
    # Create the new branch
    create_branch_url = f"{GITHUB_API_URL}/repos/{GITHUB_REPO}/git/refs"
    response = requests.get(f"{GITHUB_API_URL}/repos/{GITHUB_REPO}/git/refs/heads/main", headers=github_headers)
    sha = response.json()[0].object.sha

    # Create the new branch
    branch_data = {
        "ref": f"refs/heads/{branch_name}",
        "sha": sha
    }
    requests.post(create_branch_url, json=branch_data, headers=github_headers)

    # Create a new file in the DATA/BREACHES/V1 directory
    create_file_url = f"{GITHUB_API_URL}/repos/{GITHUB_REPO}/contents/DATA/BREACHES/V1/{file_name}"
    file_data = {
        "message": f"fixes #{issue_number}",
        "content": content,
        "branch": branch_name
    }
    response = requests.put(create_file_url, json=file_data, headers=github_headers)

    if response.status_code == 201:
        print(f"File {file_name} created successfully.")
    else:
        print(f"Error creating file: {response.status_code}, {response.text}")

    # Create the pull request
    pr_data = {
        "title": f"Update breach data for {file_name}",
        "head": branch_name,
        "base": "main",
        "body": f"fixes #{issue_number}"
    }
    pr_url = f"{GITHUB_API_URL}/repos/{GITHUB_REPO}/pulls"
    pr_response = requests.post(pr_url, json=pr_data, headers=github_headers)

    if pr_response.status_code == 201:
        print(f"Pull request created successfully: {pr_response.json()['html_url']}")
    else:
        print(f"Error creating PR: {pr_response.status_code}, {pr_response.text}")

# Main function to handle the entire process
def process_issue(issue_number):
    # Step 1: Get issue details and extract URL
    issue_description = get_issue_details(issue_number)
    if issue_description:
        url = extract_url(issue_description)
        if url:
            # Step 2: Send the URL to ChatGPT and get the response
            chatgpt_response = get_chatgpt_response(url)

            # Step 3: Format the filename and content
            current_date = datetime.now().strftime("%Y.%m")
            filename = f"{current_date}.{urllib.parse.quote_plus(chatgpt_response['entity'])}.json"
            content = chatgpt_response['data']  # Assuming the returned JSON has data field

            # Step 4: Create the GitHub PR
            create_github_pr(filename, content, issue_number)
        else:
            print("No URL found in the issue description.")
    else:
        print("Issue not found or failed to retrieve.")

if __name__ == "__main__":
    # Ensure an issue number is provided as a command-line argument
    if len(sys.argv) != 2:
        print("Usage: python script.py <issue_number>")
        sys.exit(1)

    # Retrieve the issue number from the command-line arguments
    issue_number = int(sys.argv[1])
    process_issue(issue_number)
