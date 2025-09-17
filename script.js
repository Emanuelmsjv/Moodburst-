document.addEventListener('DOMContentLoaded', () => {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const moodSwing = document.getElementById('mood-swing');

  const moodStyles = {
    naruto: { color: '#FFD700', text: '#333' },
    sasuke: { color: '#E91E63', text: '#fff' },
    uchiha: { color: '#00BFFF', text: '#fff' }
  };

  function setMoodStyle(mood) {
    const styles = moodStyles[mood.toLowerCase()];
    if (styles) {
      document.body.style.backgroundColor = styles.color;
      document.body.style.color = styles.text;
    }
  }

  async function getQuote(mood) {
  const apiUrl = `https://animechan.xyz/api/quotes/anime?title=${mood.toLowerCase()}`;
  
   try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    
    if (data && data.length > 0) {
      const quoteData = data[0];
      quoteText.textContent = quoteData.quote;
      quoteAuthor.textContent = `- ${quoteData.character} (${quoteData.anime})`;
    } else {
      quoteText.textContent = `No quotes were found for the mood ${mood}.`;
      quoteAuthor.textContent = '';
    }
  } catch (error) {
    console.error('Error fetching quote:', error);
    quoteText.textContent = 'Sorry, could not fetch a quote.';
    quoteAuthor.textContent = '';
  }
}

  // Initial quote and style on page load
  getQuote('naruto');
  setMoodStyle('naruto');

  moodSwing.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const mood = event.target.dataset.mood;
      getQuote(mood);
      setMoodStyle(mood);
    }
  });
});
