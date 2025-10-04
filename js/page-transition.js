// Modern page transition: slide-fade overlay for navigation
window.addEventListener('DOMContentLoaded', function() {
  // Create overlay if not present
  let overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
  }
  // Hide overlay on load (slide up)
  setTimeout(() => {
    overlay.classList.remove('active');
  }, 30);

  // Slide overlay down on internal link click
  document.querySelectorAll('a[href]').forEach(link => {
    const url = link.getAttribute('href');
    if (url && !url.startsWith('http') && !url.startsWith('#') && !link.hasAttribute('target')) {
      link.addEventListener('click', function(e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        overlay.classList.add('active');
        setTimeout(() => { window.location = url; }, 500);
      });
    }
  });
});
