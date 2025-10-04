// contact-api.js
// Handles EmailJS integration for contact form

document.addEventListener('DOMContentLoaded', function() {
  if(window.emailjs) {
    emailjs.init('vxNeWnufyxNPUcNTy');
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
  }, 4000);
}

function sendEmailJS(e) {
  e.preventDefault();
  const form = e.target;
  emailjs.send('Gmail-globaledura', 'template_553aqm9', {
    user_name: form.name.value,
    user_email: form.email.value,
    user_phone: form.phone.value,
    subject: form.subject.value,
    message: form.message.value
  })
  .then(function(response) {
    showFormFeedback('success', 'Thank you! Your message has been sent.');
    form.reset();
  }, function(error) {
    showFormFeedback('error', 'Sorry, there was an error sending your message. Please try again later.');
  });
}
