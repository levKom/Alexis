class RegForm extends HTMLElement {
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
    this.userName = this.shadow.querySelector('#username');
    this.userEmail = this.shadow.querySelector('#email');
    this.userPassword = this.shadow.querySelector('#password');
    this.userPasswordConfirm = this.shadow.querySelector('#passwordConfirmation');
    this.userPhoto = this.shadow.querySelector('#avatar');
    this.btn = this.shadow.querySelector('#reg-btn');
    this.preview = this.shadow.querySelector('#preview');

    this.userPassword.onchange = function (event) {
      document.cookie = `hash=${Sha256.hash(this.value)}`
    };

    this.shadow.querySelector('input[type="file"]').onchange = function getFile(event) {
      const file = event.target.files[0];
      const avaBlock = this.shadow.querySelector('.avatar_block');
      const avaContainer = this.shadow.querySelector('.img-container');
      // const ava_wrap_label = this.shadow.querySelector('.avatar_wrapper label');
      this.avaUrl = '';
      file.type.indexOf('image') === 0
        ? this.avaUrl = URL.createObjectURL(file)
        : console.error('NOT IMAGE!!!!!');
      avaBlock.style = `
        height: auto;
      `;
      avaContainer.style = `
        background: url('${this.avaUrl}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      `;
    }.bind(this);

    this.btn.onclick = function addUser(event) {
      console.log('user added!');
      fetch('https://fea13-dima.glitch.me/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.userName.value,
          email: this.userEmail.value,
          avatar: this.avaUrl,
          passHash: Sha256.hash(this.userPassword)
        })
      })
        .then(response => response.json())
        .then(response => document.cookie = `userId=${response.id}; pass=${response.passHash};`)
    }.bind(this);
  }
}

customElements.define('reg-form', RegForm);
