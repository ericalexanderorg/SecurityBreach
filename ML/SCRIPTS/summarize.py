import requests
from bs4 import BeautifulSoup
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from string import punctuation
from collections import defaultdict
import nltk

class WebSummarizer:
    def __init__(self):
        # Download required NLTK data
        try:
            nltk.data.find('tokenizers/punkt')
            nltk.data.find('tokenizers/punkt_tab')
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('punkt')
            nltk.download('punkt_tab')
            nltk.download('stopwords')
        
        self.stop_words = set(stopwords.words('english'))
    
    def fetch_page(self, url):
        """Fetch and parse webpage content."""
        try:
            response = requests.get(url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Remove script and style elements
            for script in soup(["script", "style"]):
                script.decompose()
            
            # Get text content
            text = soup.get_text()
            
            # Clean up whitespace
            lines = (line.strip() for line in text.splitlines())
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            text = ' '.join(chunk for chunk in chunks if chunk)
            
            return text
        
        except requests.RequestException as e:
            raise Exception(f"Error fetching the webpage: {str(e)}")
    
    def preprocess_text(self, text):
        """Preprocess the text for summarization."""
        # Tokenize into sentences
        sentences = sent_tokenize(text)
        
        # Create word frequency distribution
        word_freq = defaultdict(int)
        
        for sentence in sentences:
            words = word_tokenize(sentence.lower())
            for word in words:
                if word not in self.stop_words and word not in punctuation:
                    word_freq[word] += 1
        
        return sentences, word_freq
    
    def score_sentences(self, sentences, word_freq):
        """Score sentences based on word frequency."""
        sentence_scores = defaultdict(int)
        
        for i, sentence in enumerate(sentences):
            words = word_tokenize(sentence.lower())
            word_count = len([word for word in words if word not in self.stop_words and word not in punctuation])
            
            for word in words:
                if word in word_freq:
                    sentence_scores[i] += word_freq[word]
            
            # Normalize score by sentence length
            if word_count > 0:
                sentence_scores[i] = sentence_scores[i] / word_count
        
        return sentence_scores
    
    def generate_summary(self, text, num_sentences=3):
        """Generate a summary of the specified number of sentences."""
        sentences, word_freq = self.preprocess_text(text)
        
        if len(sentences) <= num_sentences:
            return text
        
        sentence_scores = self.score_sentences(sentences, word_freq)
        
        # Get top scoring sentences
        top_sentences = sorted(sentence_scores.items(), key=lambda x: x[1], reverse=True)[:num_sentences]
        top_sentences = sorted(top_sentences, key=lambda x: x[0])  # Sort by original position
        
        # Construct summary
        summary = ' '.join(sentences[i] for i, _ in top_sentences)
        return summary
    
    def summarize_url(self, url, num_sentences=3):
        """Main method to summarize a webpage."""
        try:
            text = self.fetch_page(url)
            summary = self.generate_summary(text, num_sentences)
            return summary
        except Exception as e:
            return str(e)

# Example usage
if __name__ == "__main__":
    summarizer = WebSummarizer()
    url = "https://www.tue.nl/en/news-and-events/cyberattack"
    summary = summarizer.summarize_url(url, num_sentences=12)
    print(f"Summary of {url}:\n{summary}")
