
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1291586406904496211/UFbDsMO-78NG4RWLpE9HH0yGPnZVnp2gz-qwI2vtKV_Rv0_73Of3eBD17zd4QnzTRV49';
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
  hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.querySelector('header').classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
      // Only close menu if clicking outside header entirely
      if (!document.querySelector('header').contains(e.target)) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
          document.querySelector('header').classList.remove('active');
      }
  });
  // Get all menu items
  const menuItems = document.querySelectorAll('.nav-menu li a');

  // Add click handler to each menu item
  menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
          if (item.getAttribute('href').startsWith('#')) {
              e.preventDefault();
              const targetId = item.getAttribute('href');
              const targetElement = document.querySelector(targetId);
              const headerHeight = document.querySelector('header').offsetHeight;
            
              if (targetElement) {
                  const elementPosition = targetElement.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                  window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                  });
              }
          }
          // Close menu
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
          document.querySelector('header').classList.remove('active');
      });
  });
const contactForm = document.getElementById('contact-form');

function showCustomAlert(message) {
    const modal = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const closeButton = document.getElementById('closeAlert');

    alertMessage.textContent = message;
    modal.style.display = 'block';

    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: `New contact form submission:
            Name: ${formData.name}
            Email: ${formData.email}
            Message: ${formData.message}`
        }),
    })
    .then(response => {
        if (response.ok) {
            showCustomAlert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showCustomAlert('There was an error sending your message. Please try again later.');
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send';
    });
});

// News carousel script
const carousel = document.querySelector('.news-carousel');
const items = carousel.querySelectorAll('.news-item');
const dotsContainer = document.querySelector('.dots');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

// Create dots
items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

let carouselInterval;

function startCarouselTimer() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
}

function goToSlide(index) {
    items[currentIndex].classList.remove('active');
    dotsContainer.children[currentIndex].classList.remove('active');
    currentIndex = index;
    items[currentIndex].classList.add('active');
    dotsContainer.children[currentIndex].classList.add('active');
    startCarouselTimer(); // Reset the timer when manually changing slides
}

function nextSlide() {
    goToSlide((currentIndex + 1) % items.length);
}

function prevSlide() {
    goToSlide((currentIndex - 1 + items.length) % items.length);
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Start the initial timer
startCarouselTimer();

// Add click event listeners to dots
dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Function to toggle header visibility
function toggleHeaderVisibility() {
    const header = document.querySelector('header');
    const footer = document.getElementById('main-footer');
    const headerHeight = header.offsetHeight;
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop - windowHeight < headerHeight) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
}

// Add scroll event listener
window.addEventListener('scroll', toggleHeaderVisibility);
// Initial check
toggleHeaderVisibility();
  // Add this to your existing script
  const languageSelect = document.getElementById('languageSelect');

  // Add this function right before your existing translatePage function
  function getBrowserLanguage() {
      const language = navigator.language || navigator.userLanguage;
      // Currently supporting 'en' and 'es', default to 'en' for other languages
      return language.startsWith('es') ? 'es' : 'en';
  }

  function translatePage(lang) {
      // Existing text translation
      const elements = document.querySelectorAll('[data-lang]');
      elements.forEach(element => {
          const key = element.getAttribute('data-lang');
          if (translations[lang] && translations[lang][key]) {
              element.textContent = translations[lang][key];
          }
      });

      // Add image translation
      const imageElements = document.querySelectorAll('[data-lang-img]');
      imageElements.forEach(element => {
          const key = element.getAttribute('data-lang-img');
          if (translations[lang] && translations[lang][key]) {
              element.style.backgroundImage = `url('${translations[lang][key]}')`;
          }
      });
  }

  function translatePage(lang) {
      // Handle text translations including easter eggs
      const elements = document.querySelectorAll('[data-lang]');
      elements.forEach(element => {
          const key = element.getAttribute('data-lang');
          if (translations[lang] && translations[lang][key]) {
              let text = translations[lang][key];
    
              // Handle easter eggs
              const easterEggs = element.querySelectorAll('.easter-egg');
              easterEggs.forEach(egg => {
                  const eggType = egg.getAttribute('data-egg');
                  text = text.replace(`{${eggType}}`, `<span class="easter-egg" data-egg="${eggType}">${eggType}</span>`);
              });
    
              element.innerHTML = text;
          }
      });

      // Handle image translations for news carousel
      const imageElements = document.querySelectorAll('[data-lang-img]');
      imageElements.forEach(element => {
          const key = element.getAttribute('data-lang-img');
          if (translations[lang] && translations[lang][key]) {
              element.style.backgroundImage = `url('${translations[lang][key]}')`;
          }
      });

      // Reattach easter egg listeners
      initializeEasterEggs();
  }
  function initializeEasterEggs() {
      const easterEggs = document.querySelectorAll('.easter-egg');
      const secretButtonContainer = document.getElementById('secret-button-container');
      let foundEggs = [];
      
      easterEggs.forEach(egg => {
          egg.addEventListener('click', () => {
              if (!foundEggs.includes(egg.dataset.egg)) {
                  egg.classList.add('found');
                  foundEggs.push(egg.dataset.egg);
                  
                  if (foundEggs.length === 3) {
                      secretButtonContainer.style.display = 'block';
                      secretButtonContainer.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'center'
                      });
                  }
              }
          });
      });
  }

  // Call initializeEasterEggs on page load
  document.addEventListener('DOMContentLoaded', initializeEasterEggs);
// Improve language selector handling
languageSelect.addEventListener('change', (e) => {
    // Close menu first
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    document.querySelector('header').classList.remove('active');
    
    // Then handle language change
    translatePage(e.target.value);
    localStorage.setItem('preferredLanguage', e.target.value);
});

  // Replace your existing DOMContentLoaded event listener with this:
  document.addEventListener('DOMContentLoaded', () => {
      const savedLanguage = localStorage.getItem('preferredLanguage') || getBrowserLanguage();
      languageSelect.value = savedLanguage;
      translatePage(savedLanguage);
  });

  // Update the game logo links in the projects section
document.addEventListener('DOMContentLoaded', () => {
    const gameLinks = document.querySelectorAll('.game-logo-link');
    
    gameLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = document.getElementById('languageSelect').value;
            const baseUrl = link.getAttribute('href');
            window.location.href = `${baseUrl}?lang=${currentLang}`;
        });
    });
});