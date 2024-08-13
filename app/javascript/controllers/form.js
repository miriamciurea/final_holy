document.addEventListener('turbo:load', () => {
  const form = document.getElementById('newsletter-form');
  const submitButton = document.getElementById('subscribe-button');

  if (form && submitButton) {
    form.addEventListener('submit', function(event) {
      // Disable the button immediately to prevent multiple submissions
      submitButton.textContent = 'SUBSCRIBING...';
      submitButton.disabled = true;
    });
  }
});
