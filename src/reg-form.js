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
    this.form = this.shadow.querySelector('.reg_main_content');
    this.userName = this.shadow.querySelector('#username');
    this.userEmail = this.shadow.querySelector('#email');
    this.userEmail.disabled = true;
    this.userPassword = this.shadow.querySelector('#password');
    this.userPassword.disabled = true;
    this.userPasswordConfirm = this.shadow.querySelector('#passwordConfirmation');
    this.userPasswordConfirm.disabled = true;
    this.userPhoto = this.shadow.querySelector('input[type="file"]');
    this.userPhoto.valid = false;
    this.btn = this.shadow.querySelector('#reg-btn');
    this.btn.disabled = true;
    this.errorSpace = this.shadow.querySelector('#err');
    this.errorSpace.style = `
      color: #fc5f45;
      font-size: 14px;
    `;
    this.modalForm = this.shadow.querySelector('.reg-wrapper');

    this.userName.oninput = function (event) {
      this.userName.valid = this.userName.value.length >= 1
      if(this.userName.valid) {
        this.errorSpace.innerHTML = "";
        this.userEmail.disabled = false;
      } else {
        this.errorSpace.innerText = "* Username field cannot be blank";
        this.userEmail.disabled = true;
        this.btn.disabled = true;
      };
      if (
        (this.userPasswordConfirm.value === this.userPassword.value)
        && this.userPhoto.valid
        && this.userName.valid
        ) {
          this.btn.disabled = false;
        } else {
          this.btn.disabled = true;
        };
    }.bind(this)

    this.userEmail.oninput = function (event) {
      let err = this.errorSpace
      let check = event.target.value
      let pas1 = this.userPassword
      let emailInput = this.userEmail
      let btn = this.btn;
      async function letCheck (pas1, check) {
          let response = await fetch("https://fea13-dima.glitch.me/users");
          let data = await response.json();
          let isReg = data.some(obj => obj.email === check)
          let vali = !isReg;
          if (/\S+@\S+\.\S+/.test(emailInput.value)) {
              err.innerHTML = "";
              emailInput.style.color = "green";
              pas1.disabled = false;
          } else {
              err.innerHTML = "Enter correct email";
              emailInput.style.color = "red";
              pas1.disabled = true;
              btn.disabled = true;
          };
          if (!vali) {
              err.innerHTML = "EMAIL ALREADY REGISTERED!";
              emailInput.style.color = "red";
              pas1.disabled = true;
              btn.disabled = true;
          };
      }
      letCheck(pas1, check);
      if (
        (this.userPasswordConfirm.value === this.userPassword.value)
        && this.userPhoto.valid
        && this.userName.valid
        ) {
          this.btn.disabled = false;
        } else {
          this.btn.disabled = true;
        };
    }.bind(this)

    this.userPassword.oninput = function (event) {
      let pass = this.userPassword.value;
      this.userPassword.valid = pass.length >= 6 && !!pass.match ( /\d/ ) && !!pass.match ( /\D/ );
      this.userPassword.style.color = this.userPassword.valid ? "green" : "red";
      this.userPasswordConfirm.valid = this.userPasswordConfirm.value === this.userPassword.value;
      this.userPasswordConfirm.style.color = this.userPasswordConfirm.valid ? "green" : "red";
      if (this.userPassword.valid) {
        this.errorSpace.innerHTML = "";
        this.userPasswordConfirm.valid = false;
        this.userPasswordConfirm.disabled = false;
      } else {
        this.errorSpace.innerHTML = "Min lenght 6 and at least 1 number";
        this.btn.disabled = true;
        this.userPasswordConfirm.disabled = true;
      };
      if (
        (this.userPasswordConfirm.value === this.userPassword.value)
        && this.userPhoto.valid
        && this.userName.valid
        ) {
          this.btn.disabled = false;
        } else {
          this.btn.disabled = true;
        };
    }.bind(this);

    this.userPasswordConfirm.oninput = function ( event ) {
      this.userPasswordConfirm.valid = this.userPasswordConfirm.value === this.userPassword.value;
      this.userPasswordConfirm.style.color = this.userPasswordConfirm.valid ? "green" : "red";
      if (this.userPasswordConfirm.valid && this.userPhoto.valid && this.userName.valid) {
        this.btn.disabled = false;
      }

      let passSha = Sha256.hash(this.userPasswordConfirm.value);
      if (
        this.userPasswordConfirm.valid
        && this.userPhoto.valid
        && this.userName.valid
        ) {
          this.btn.disabled = false;
        } else {
          this.btn.disabled = true;
        };
      return passSha;
    }.bind(this)

    this.userPhoto.onchange = function getFile(event) {
      const file = event.target.files[0];
      const avaBlock = this.shadow.querySelector('.avatar_block');
      const avaContainer = this.shadow.querySelector('.img-container');
      this.avaUrl = '';

      let reader = new FileReader;
      reader.readAsDataURL(file);

      if (file.type.indexOf( "image" ) === -1 ) {
        avaContainer.style = 'background: url("");';
        avaBlock.style = 'height: 0;';
        this.errorSpace.innerText = "Wrong type of file";
        this.userPhoto.valid = false;
      } else if (file.type.indexOf ( "image" ) === 0 && file.size > 307200 ) {
        avaContainer.style = 'background: url("");';
        avaBlock.style = 'height: 0;';
        this.errorSpace.innerText = "Image size is too big";
        this.userPhoto.valid = false;
      } else if (file.type.indexOf('image') === 0 && file.size <= 307200) {
        this.userPhoto.valid = true;
        reader.onload = function (event) {
          this.errorSpace.innerText = "";
          this.avaUrl = event.target.result;
          avaBlock.style = `
            height: auto;
          `;
          avaContainer.style = `
            background: url('${this.avaUrl}');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
          `;
        }.bind(this)
      };
      if (
        this.userPasswordConfirm.valid
        && this.userPhoto.valid
        && this.userName.valid
        ) {
          this.btn.disabled = false;
        } else {
          this.btn.disabled = true;
        };
      
    }.bind(this);


    this.btn.onclick = function addUser(event) {
      fetch('https://fea13-dima.glitch.me/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: this.avaUrl,
          name: this.userName.value,
          email: this.userEmail.value,
          passHash: Sha256.hash(this.userPassword),
        }),
      })
        .then(response => response.json())
        .then(response => {
          document.cookie = `userId=${response.id};`;
          document.cookie = `pass=${response.passHash};`;
          document.cookie = `name=${response.name};`;
          this.form.innerHTML = `
          <h5 style="color: #5fd552; text-align: center;">Регистрация прошла успешно!</h5>
          `;
          setTimeout(() => {
            this.modalForm.style.display = 'none';
            document.body.style.overflow = 'auto';
          }, 2000);
        });
    }.bind(this);
  }
}

customElements.define('reg-form', RegForm);
