import isEmail from 'validator/es/lib/isEmail';
import isEmpty from 'validator/es/lib/isEmpty';
import blacklist from 'validator/es/lib/blacklist';

class FormHandler {
  constructor() {
    this.form = document.querySelector('.contact');
    this.consentBox = document.getElementById('consent');
    this.submitBtn = this.form.querySelector('button');
    this.formTogglers = document.querySelectorAll('.toggler');
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

    // newFormData not working for some reason... ?
    const name = this.form[0];
    const email = this.form[1];
    const phone = this.form[2];
    const subject = this.form[3];
    const message = this.form[4];
    const honeypot = this.form[7];

    // Honeypot against spambots
    if (honeypot.checked) return;

    // Input validation
    let errors = false;

    [name, email, phone, subject, message].forEach((field, idx) => {
      const input = field.value.trim();

      // Check if input is empty
      if (isEmpty(input)) {
        field.classList.add('contact__input--error');
        errors = true;
      }

      // Check if email address is valid
      if (idx === 1 && !isEmail(input)) {
        field.classList.add('contact__input--error');
        errors = true;
      }

      // Remove blacklisted characters
      field.value = blacklist(input, '<>')
    });

    // Remove error class after 4 seconds
    if (errors) {
      setTimeout(() => {
        [name, email, phone, subject, message].forEach(field => {
          field.classList.remove('contact__input--error');
        });
      }, 4000);
      return;
    }

    // Send request
  }
}

export default FormHandler;
