class LoginForm extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['markup'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    fetch(newVal)
      .then(response => response.text())
      .then((response) => {
        if (attrName === 'markup') {
          const styles = this.shadow.innerHTML.split('<style>').length === 1
            ? ''
            : this.shadow.innerHTML.split('<style>')[1]
              .split('</style>')[0];
          this.shadow.innerHTML = `${response}<style>${styles}</style>`;
          this.closeArea = this.shadow.querySelector('.reg_main_bg');
          this.modalForm = this.shadow.querySelector('.reg-wrapper');
          this.closeFormBtn = this.shadow.querySelector('.close-form');

          this.closeArea.onclick = function closePopUp() {
            this.modalForm.style.display = 'none';
            document.body.style.overflow = 'auto';
          }.bind(this);

          this.closeFormBtn.onclick = function closePopUp() {
            this.modalForm.style.display = 'none';
            document.body.style.overflow = 'auto';
          }.bind(this);
        }
      }).then(() => this.getElems());
  }

  getElems() {
    this.btn = this.shadow.querySelector('#login-btn');

    this.btn.onclick = function addUser(event) {
      fetch('https://fea13-dima.glitch.me/users', {});
    }.bind(this);
  }
}

customElements.define('login-form', LoginForm);
