import './web-comp.js';
import './reg-form.js';
import './login-form.js';


const main = document.querySelector('main');
const webComp = main.appendChild(document.createElement('web-comp'));
const regForm = document.body.appendChild(document.createElement('reg-form'));
const loginForm = document.body.appendChild(document.createElement('login-form'));

webComp.setAttribute('markup', 'chunks/about.html');
document.querySelector('a[href="about"]').classList.add('active');

function changeAttrs(event) {
  event.preventDefault();
  webComp.setAttribute(
    'markup',
    `chunks/${event.target.getAttribute('href')}.html`,
  );
  document.querySelectorAll('.nav-item a')
    .forEach(elem => elem.classList.remove('active'));

  event.target.classList.add('active');
}

const items = document.querySelectorAll('.web-component');
items.forEach((item) => {
  item.addEventListener('click', changeAttrs);
});

const regBtn = document.getElementsByClassName('regist')[0];
regBtn.onclick = function clickHandler(event) {
  event.preventDefault();
  regForm.setAttribute(
    'markup',
    `chunks/${event.target.getAttribute('href')}.html`,
  );
  document.body.style.overflow = 'hidden';
};

const signInBtn = document.getElementsByClassName('login')[0];
signInBtn.onclick = function clickHandler(event) {
  event.preventDefault();
  loginForm.setAttribute(
    'markup',
    `chunks/${event.target.getAttribute('href')}.html`,
  );
  document.body.style.overflow = 'hidden';
};