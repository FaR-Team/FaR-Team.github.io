const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1329280192266371072/UeGQJbhTXJ4rTWSZ_rjHxQFqR5g_j4XHpwxWfncuXIcNJWzn8hQdJToF7KiIfCNiTUXT';
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
  hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.querySelector('header').classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
      if (!document.querySelector('header').contains(e.target)) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
          document.querySelector('header').classList.remove('active');
      }
  });

  const menuItems = document.querySelectorAll('.nav-menu li a');


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

const carousel = document.querySelector('.news-carousel');
const items = carousel.querySelectorAll('.news-item');
const dotsContainer = document.querySelector('.dots');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

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
    startCarouselTimer();
}

function nextSlide() {
    goToSlide((currentIndex + 1) % items.length);
}

function prevSlide() {
    goToSlide((currentIndex - 1 + items.length) % items.length);
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

startCarouselTimer();

dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

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

window.addEventListener('scroll', toggleHeaderVisibility);
toggleHeaderVisibility();

const languageSelect = document.getElementById('languageSelect');

function updateContent(language) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        const keys = key.split('.');
        let translation = translations[language];
        
        for (const k of keys) {
            translation = translation[k];
        }
        
        if (translation) {
            element.textContent = translation;
        }
    });
}

function getBrowserLanguage() {
    const language = navigator.language || navigator.userLanguage;
    return language.startsWith('es') ? 'es' : 'en';
}

function translatePage(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            let text = translations[lang][key];
        
            // Extract easter eggs from text and replace with spans
            const eggRegex = /\{([^}]+)\}/g;
            text = text.replace(eggRegex, (match, eggType) => 
                `<span class="easter-egg" data-egg="${eggType}">${eggType}</span>`
            );
        
            element.innerHTML = text;
        }
    });

    const imageElements = document.querySelectorAll('[data-lang-img]');
    imageElements.forEach(element => {
        const key = element.getAttribute('data-lang-img');
        if (translations[lang] && translations[lang][key]) {
            element.style.backgroundImage = `url('${translations[lang][key]}')`;
        }
    });

    initializeEasterEggs();
}

languageSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    translatePage(selectedLang);
    localStorage.setItem('preferredLanguage', selectedLang);
});function initializeEasterEggs() {
    const easterEggs = document.querySelectorAll('.easter-egg');
    const totalEggs = 3;
    let foundEggs = 0;

    easterEggs.forEach(egg => {
        egg.replaceWith(egg.cloneNode(true));
    });

    // Reattach fresh listeners to the new elements
    document.querySelectorAll('.easter-egg').forEach(egg => {
        egg.addEventListener('click', () => {
            if (!egg.classList.contains('found')) {
                egg.classList.add('found');
                foundEggs++;
            
                if (foundEggs === totalEggs) {
                    document.getElementById('secret-button-container').style.display = 'block';

                    document.getElementById('secret-button-container').scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeEasterEggs);

document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || getBrowserLanguage();
    languageSelect.value = savedLanguage;
    translatePage(savedLanguage);
});

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

function updateImages(language) {
    const imageElements = document.querySelectorAll('[data-lang-img]');
    imageElements.forEach(element => {
        const imageKey = element.getAttribute('data-lang-img');
        if (translations[language][imageKey]) {
            if (element.tagName === 'IMG') {
                element.src = translations[language][imageKey];
            } else {
                element.style.backgroundImage = `url('${translations[language][imageKey]}')`;
            }
        }
    });
}
