document.addEventListener('DOMContentLoaded', () => {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const moodSwing = document.getElementById('mood-swing');

  const moodStyles = {
    happy: { color: '#FFD700', text: '#333' },
    sad: { color: '#E91E63', text: '#fff' },
    energetic: { color: '#00BFFF', text: '#fff' }
  };

  function setMoodStyle(mood) {
    const styles = moodStyles[mood.toLowerCase()];
    if (styles) {
      document.body.style.backgroundColor = styles.color;
      document.body.style.color = styles.text;
    }
  }

  async function getQuote(mood) {
    let category = '';

    // Map your button moods to Quote Garden API categories
    if (mood.toLowerCase() === 'happy') {
      category = 'life';
    } else if (mood.toLowerCase() === 'sad') {
      category = 'sadness';
    } else if (mood.toLowerCase() === 'energetic') {
      category = 'motivation';
    }

    const apiUrl = `https://api.photogallery.com/images?tag_slug=`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data && data.data.length > 0) {
        const quoteData = data.data[0];
        quoteText.textContent = quoteData.quoteText;
        quoteAuthor.textContent = '- ' + quoteData.quoteAuthor;
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
  getQuote('happy');
  setMoodStyle('happy');

  moodSwing.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const mood = event.target.dataset.mood;
      getQuote(mood);
      setMoodStyle(mood);
    }
  });
});
