class WebComp extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
  }

  static get observedAttributes() {
    return ['markup'];
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
          }
        });
  }
};

customElements.define('web-comp', WebComp);

