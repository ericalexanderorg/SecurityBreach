## Research

Chatgpt the chat UI can work reasonably well with the prompt below. I tried to automate with their URL in Jan 2025
but couldn't get it to work. The API won't scrape a URL like the chat UI version does. Even if I scrape locally
or use one of the many services, you still have to summarize the HTML. In most instances the HTML is too long to 
pass directly to chatgpt first. 

So if I have to do all the heavy lifting and pay for chatgpt API, then it's probably best for me to just scrape, 
summarize, and use scikitlearn to classify locally. 


## Prompt

Please provide a summary of the article at the following URL, classify it using the following criteria, and return the information in JSON format:

- **entity**: The entity that was hacked.
- **links**: A list of the article URLs.
- **month**: The month the event occurred as a number.
- **summary**: A brief summary of the article that focuses on how the hack occured (140 characters or less).
- **tags**:
  - **actor**: One of the following: `Criminal`, `Nation State: [Actor Name]`, `Hacktivist`, `Insider`.
  - **cost-usd**: The monetary cost in USD if mentioned, otherwise 0.
  - **impacted-user-count**: The number of users affected, if mentioned, otherwise 0.
  - **initial-access**: One of the following: `SIM Card Swap`, `Phishing`, `OWASP`, `Monitoring Failure`, `Missing Patch`, `Misconfiguration`, `Insider`, `Injection`, `Hijack`, `Hardware Additions`, `DOS`, `Compromised Valid Account`, `Compromised Account`, `Broken Authentication and Session Management`, `Broken Access Control`, `BEC`.
  - **motive**: One of the following: `Political`, `PII`, `Money`, `Hacktivist`, `Hacktivism`, `Espionage`.
- **year**: The year the event occurred as a number"


URL: https://www.bleepingcomputer.com/news/security/label-giant-avery-says-website-hacked-to-steal-credit-cards/