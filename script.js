function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function() {
  // Initial animation for logo elements
  const logoElements = document.querySelectorAll('.logo.animate-fade-up');
  logoElements.forEach(element => {
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.opacity = '';
    }, 100);
  });

  // Elements are already set to animate via CSS classes
  // This function ensures animations restart if the user navigates back to this section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Restart animations by removing and re-adding classes
        const textElements = entry.target.querySelectorAll('.animate-swipe-left, .animate-swipe-right');
        textElements.forEach(element => {
          element.style.animation = 'none';
          element.offsetHeight; // Trigger reflow
          element.style.animation = '';
        });
      }
    });
  }, { threshold: 0.5 });
  
  // Observe the profile section
  const profileSection = document.querySelector('#profile');
  if (profileSection) {
    observer.observe(profileSection);
  }

  // Setup observer for nav sections to reset logo animation
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const logoElements = document.querySelectorAll('.logo.animate-fade-up');
        logoElements.forEach(element => {
          element.style.animation = 'none';
          element.offsetHeight; // Trigger reflow
          element.style.animation = '';
        });
      }
    });
  }, { threshold: 0.9 });

  // Observe the nav sections
  const navElements = document.querySelectorAll('#desktop-nav, #hamburger-nav');
  navElements.forEach(nav => {
    navObserver.observe(nav);
  });

  // Set up observer for sections that should animate when scrolled into view
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find all content elements within the section instead of animating the section itself
        const contentElements = entry.target.querySelectorAll('.about-content');
        contentElements.forEach(element => {
          element.style.animation = 'swipeInLeft 1s ease forwards';
        });
      }
    });
  }, { threshold: 0.2 });

  // Add the about section to be observed
  const aboutSection = document.querySelector('#about');
  if (aboutSection) {
    // Instead of adding animate-section class to the section itself,
    // we'll add about-content class to the content containers
    const containers = aboutSection.querySelectorAll('.section-container, .about-details-container');
    containers.forEach(container => {
      container.classList.add('about-content');
    });
    sectionObserver.observe(aboutSection);
    
    // About section fade up animation
    const aboutFadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelector('.about-content').classList.add('animate-fade-up');
          aboutFadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    aboutFadeObserver.observe(aboutSection);
  }
  
  // For Projects section
  const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelector('.projects-container').classList.add('animate-fade-up');
        projectsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const projectsSection = document.querySelector('#projects');
  if (projectsSection) {
    projectsObserver.observe(projectsSection);
  }
});