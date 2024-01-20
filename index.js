// Pronalaženje veličine fonta za h2 element
// const h2Element = document.querySelector('h1');
// const computedStyle = window.getComputedStyle(h2Element);
// const fontSize = computedStyle.getPropertyValue('font-size');

// console.log('Veličina fonta za h2:', fontSize);

const forma = document.getElementsByClassName('form-inline')[0];
if (forma) {
  forma.addEventListener('submit', event => {
    event.preventDefault(); // sprečava podnošenje forme
    performSearch(); // poziva funkciju performSearch()
  });
}



import './src/buttonscroll.js';
import { subscribeToNewsletter } from './src/newsletter.js';
import { handleContactForm } from './src/contact.js';
import { handleLogin } from './src/login.js';
import { createCard, performSearch } from './src/search.js';
import {handleRegisterForm} from './src/register.js';
document.addEventListener('DOMContentLoaded', function () {
  handleContactForm();
  handleLogin();
  handleRegisterForm();
  subscribeToNewsletter();
});
