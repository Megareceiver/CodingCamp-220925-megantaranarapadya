document.addEventListener('DOMContentLoaded', () => {
    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
    }

    const welcomeEl = document.getElementById('welcomeMessage');
    const namePrompt = prompt("Hi, what's your name?");
    welcomeEl.textContent = namePrompt && namePrompt.trim()
        ? `Hi ${namePrompt.trim()}, welcome to our Travel Agency!`
        : `Hi there, welcome to our Travel Agency!`;
    setTimeout(() => welcomeEl.classList.add('visible'), 50);

    const nav = document.querySelector('nav');
    const navHeight = () => (nav ? nav.offsetHeight : 0);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight() - 12;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    const form = document.getElementById('contactForm');
    const resultDiv = document.getElementById('formResult');

    form.addEventListener('submit', e => {
        e.preventDefault();

        form.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let hasError = false;

        if (!name) {
            const err = document.getElementById('name').nextElementSibling;
            err.textContent = "Please enter your name.";
            err.classList.remove('hidden');
            hasError = true;
        }

        if (!email) {
            const err = document.getElementById('email').nextElementSibling;
            err.textContent = "Please enter your email.";
            err.classList.remove('hidden');
            hasError = true;
        } else {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!pattern.test(email)) {
                const err = document.getElementById('email').nextElementSibling;
                err.textContent = "Invalid email format.";
                err.classList.remove('hidden');
                hasError = true;
            }
        }

        if (!message) {
            const err = document.getElementById('message').nextElementSibling;
            err.textContent = "Please write a message.";
            err.classList.remove('hidden');
            hasError = true;
        }

        if (hasError) return;

        resultDiv.innerHTML = `
      <h3 class="font-bold mb-2">Your Submitted Data</h3>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong> ${escapeHtml(message)}</p>
      <p class="mt-3 text-sm text-gray-600">Thank you! We will contact you shortly.</p>
    `;
        resultDiv.classList.remove('hidden');

        const top = resultDiv.getBoundingClientRect().top + window.pageYOffset - navHeight() - 12;
        window.scrollTo({ top, behavior: 'smooth' });

        form.reset();
    });
});

const btn = document.getElementById("menu-btn");
const menuMobile = document.getElementById("menu-mobile");
const iconHamburger = document.getElementById("icon-hamburger");
const iconClose = document.getElementById("icon-close");

btn.addEventListener("click", () => {
    menuMobile.classList.toggle("hidden");

    if (menuMobile.classList.contains("hidden")) {
        iconHamburger.classList.remove("hidden");
        iconClose.classList.add("hidden");
    } else {
        iconHamburger.classList.add("hidden");
        iconClose.classList.remove("hidden");
    }
});