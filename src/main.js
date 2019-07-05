import './web-comp.js';


const main = document.querySelector('main');
const webComp = main.appendChild(document.createElement('web-comp'));

webComp.setAttribute('markup', 'chunks/about.html');
document.querySelector('a[href="about"]').classList.add('active');

function changeAttrs(event) {
  event.preventDefault();
  webComp.setAttribute(
      'markup',
      `chunks/${event.target.getAttribute('href')}.html`
  );
  document.querySelectorAll('.nav-item a')
      .forEach((elem) => elem.classList.remove('active'));

  event.target.classList.add('active');
  // event.target.style.color = 'red';
}

const items = document.querySelectorAll('.web-component');
items.forEach((item) => {
  item.addEventListener('click', changeAttrs);
});
