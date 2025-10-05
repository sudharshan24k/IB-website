// contact-api.js
// Handles Web3Forms AJAX integration for contact form

document.addEventListener('DOMContentLoaded', function() {
  // Web3Forms AJAX handler
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const object = {};
      formData.forEach((value, key) => { object[key] = value });
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(object)
        });
        const result = await response.json();
        if (result.success) {
          showFormFeedback('success', 'Thank you! Your message has been sent.');
          form.reset();
        } else {
          showFormFeedback('error', 'Oops! Something went wrong.');
        }
      } catch (err) {
        showFormFeedback('error', 'Network error. Please try again.');
      }
    });
  }
});

function showFormFeedback(type, message) {
  const feedback = document.getElementById('form-feedback');
  if (!feedback) return;
  feedback.className = 'mb-6 text-center';
  feedback.innerHTML =
    type === 'success'
      ? `<div class="inline-flex flex-col items-center animate-bounce-gentle">
            <svg class="w-16 h-16 text-green-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 12l2 2l4-4" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            <span class="text-green-700 text-lg font-semibold">${message}</span>
         </div>`
      : `<div class="inline-flex flex-col items-center animate-bounce-gentle">
            <svg class="w-16 h-16 text-red-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M15 9l-6 6m0-6l6 6" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            <span class="text-red-700 text-lg font-semibold">${message}</span>
         </div>`;
  feedback.classList.remove('hidden');
  setTimeout(() => {
    feedback.classList.add('hidden');
    feedback.innerHTML = '';
  }, 3000);
}
