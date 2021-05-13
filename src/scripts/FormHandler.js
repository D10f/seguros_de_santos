class FormHandler {
  constructor() {
    this.form = document.querySelector('.contact');
    this.formTogglers = document.querySelectorAll('.toggler');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', e => this.handleSubmit(e));
    this.form.addEventListener('click', e => this.handleClick(e));
    this.formTogglers.forEach(el => el.addEventListener('click', () => this.openForm()));
  }

  handleClick(e) {
    if (e.target.className === 'contact__close') {
      return this.closeForm();
    }
    if (e.target.className === 'contact__minimize') {
      return this.hideForm();
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

    // Extract input values
    // Check honeypot
    // Check input values
    // Send email (network Request to backend)
  }
}

export default FormHandler;
