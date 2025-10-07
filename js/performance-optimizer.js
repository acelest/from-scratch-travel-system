// Performance Optimizer - Simple scroll progress indicator
(function() {
  const progressBar = document.querySelector('.scroll-progress');

  if (progressBar) {
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight);
      progressBar.style.transform = `scaleX(${scrolled})`;
    });
  }
})();
