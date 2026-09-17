document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');

  // Set up Intersection Observer to handle light trigger on scroll
  const observerOptions = {
    root: null,
    threshold: 0.5 // Triggers when 50% of the section is visible
  };

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Restart animation on slide entry
        entry.target.classList.remove('animate');
        void entry.target.offsetWidth; // Force CSS reflow
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  slides.forEach(slide => {
    slideObserver.observe(slide);
  });
});