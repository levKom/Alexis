class AboutUs extends HTMLElement {
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

customElements.define('about-us', AboutUs);

const aboutUs = document.body.appendChild(document.createElement('about-us'));

aboutUs.setAttribute('markup', 'chunks/aboutUs.html');
aboutUs.setAttribute('styles', 'chunks/aboutUs.css');

