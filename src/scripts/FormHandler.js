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

  handleSubmit(e) {
    e.preventDefault();

    // newFormData not working for some reason... ?
    const name = this.form[0];
    const email = this.form[1];
    const phone = this.form[2];
    const subject = this.form[3];
    const message = this.form[4];
    const honeypot = this.form[7];

    if (honeypot.checked) return;

    let errors = false;
    [name, email, phone, subject, message].forEach(input => {
      if (input.value === '') {
        errors = true;
        input.classList.add('contact__input--error');
        setTimeout(() => {
          input.classList.remove('contact__input--error');
        }, 4000);
      }
    });

    if (errors) return;
  }
}

export default FormHandler;
