class WebComp extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
  }

  static get observedAttributes() {
    return ['markup', 'styles'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    fetch(newVal)
        .then((response) => response.text())
        .then((response) => {
          switch (attrName) {
            case 'markup':
              const styles = this.shadow.innerHTML.split('<style>').length === 1
                ? ''
                : this.shadow.innerHTML.split('<style>')[1]
                    .split('</style>')[0];
              this.shadow.innerHTML = response + `<style>${styles}</style>`;
              break;

            case 'styles':
              const html = this.shadow.innerHTML.split('<style>');
              const end = html.length === 1 ? '' : html[1].split('</style>')[1];
              this.shadow.innerHTML = html[0] +
                  `<style>${response}</style>` + end;
              break;
          }
        });
  }
};

customElements.define('web-comp', WebComp);
const main = document.querySelector('main');
const webComp = main.appendChild(document.createElement('web-comp'));

webComp.setAttribute('markup', 'chunks/about.html');
// webComp.setAttribute('styles', 'chunks/about.css');

function changeAttrs(event) {
  event.preventDefault();
  webComp.setAttribute(
      'markup',
      `chunks/${event.target.getAttribute('href')}.html`
  );
  /* webComp.setAttribute(
      'styles',
      `chunks/${event.target.getAttribute('href')}.css`
  ); */
}

const items = document.querySelectorAll('.web-component');
items.forEach((item) => {
  item.addEventListener('click', changeAttrs);
});

