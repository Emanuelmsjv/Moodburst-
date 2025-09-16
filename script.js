const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const moodSwing = document.getElementById('mood-swing');

const moodStyles = {
  happy: { color: '#FFD700', text: '#333' },
  love: { color: '#E91E63', text: '#fff' },
  inspirational: { color: '#00BFFF', text: '#fff' }
};




async function getQuote(mood) {
  const apiUrl = `https://api.quotable.io/quotes/random?tags=${mood}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await
    response.json();
    
    quoteText.textContent = quoteData.content
    quoteAuthor.textContent =
    quoteData.author;
  
  } catch (error) {
    console.error('Error fetching quote:', error);
    quoteText.textContent = 'Sorry, could not fetch a quote.';
    quoteAuthor.textContent = '';

    
  }
  
  
}

moodSwing.addEventListener('click', (event) => {
  // Check if the clicked element is a button
  if (event.target.tagName === 'BUTTON') {
    const mood = event.target.dataset.mood;
    getQuote(mood);
  }

  
   document.body.style.backgroundColor = moodStyles[mood].color;
  
  document.body.style.color = moodStyles[mood].text;

});
