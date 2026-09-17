document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');

  // Options for the Intersection Observer
  const observerOptions = {
    root: null,
    threshold: 0.5 // Triggers when 50% of the slide is in view
  };

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Restart animation on slide entry
        entry.target.classList.remove('animate');
        void entry.target.offsetWidth; // Force CSS reflow to re-trigger CSS animations
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  slides.forEach(slide => {
    slideObserver.observe(slide);
  });
});