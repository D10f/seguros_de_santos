import isEmail from 'validator/es/lib/isEmail';
import isEmpty from 'validator/es/lib/isEmpty';
import blacklist from 'validator/es/lib/blacklist';

class FormHandler {
  constructor() {
    this.form         = document.querySelector('.contact');
    this.formTogglers = document.querySelectorAll('.toggler');
    this.consentBox   = this.form.querySelector('#consent');
    this.submitBtn    = this.form.querySelector('button');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', e => e.preventDefault());
    this.form.addEventListener('click', e => this.handleClick(e));
    this.consentBox.addEventListener('change', () => this.toggleSubmit());
    this.formTogglers.forEach(el => el.addEventListener('click', () => this.openForm()));
  }

  toggleSubmit() {
    this.submitBtn.disabled = !this.consentBox.checked;
  }

  openForm() {
    this.form.classList.remove('contact--closed');
    this.form.classList.remove('contact--hidden');
  }

  closeForm() {
    this.form.classList.add('contact--closed');
    this.form.classList.remove('contact--hidden');
    this.form.reset();
  }

  hideForm() {
    this.form.classList.add('contact--hidden');
  }

  handleClick(e) {
    if (e.target.className === 'contact__close') {
      return this.closeForm();
    }
    if (e.target.className === 'contact__minimize') {
      return this.hideForm();
    }
    if (e.target.className === 'cta font-regular') {
      return this.handleSubmit(e);
    }
    if (this.form.classList.contains('contact--hidden')) {
      return this.openForm();
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // Honeypot against spambots
    const honeypot = this.form[7];
    if (honeypot.checked) return;

    const formData = new FormData(this.form);

    for (const [ key, value ] of formData) {
      const input = value.trim();

      // If input is empty or is not a valid email address
      if (isEmpty(input) || (key === 'email' && !isEmail(input))) {
        const el = this.form.querySelector(`.contact__input[name=${key}]`);

        el.classList.add('contact__input--error');
        setTimeout(() => {
          el.classList.remove('contact__input--error');
        }, 4000);

        return;
      }

      // Remove blacklisted characters
      value = blacklist(input, '<>');
    }

    this.submitBtn.disabled = true;
    this.form.querySelector('.contact__overlay-confirm').classList.add('contact__overlay--visible');

    setTimeout(() => {
      this.submitBtn.disabled = false;
      this.closeForm();
    }, 4000);

    setTimeout(() => {
      this.form.querySelector('.contact__overlay-confirm').classList.remove('contact__overlay--visible');
    }, 4500);

    // fetch('https://seguroscdesantos.xyz/email/cc.php', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(res => res.text())
    // .then(data => {
    //   // check for status code = 202
    //   // show confirmation overlay
    //
    //   setTimeout(() => {
    //     // hide confirmation overlay
    //     this.submitBtn.disabled = false;
    //     this.form.closeForm();
    //   }, 4000);
    // })
    // .catch(err => {
    //   // show error overlay
    // });
  }
}

export default FormHandler;
