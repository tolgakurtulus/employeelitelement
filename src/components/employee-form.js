import { LitElement, html, css } from 'lit';
import page from 'page';
import { store } from '../store/index.js';
import i18next from '../translations/index.js';

export class EmployeeForm extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    .container {
      width: 90%;
      margin: 20px auto;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background: white;
    }
    h2 {
      color: #ff6600;
    }
    form {
      display: grid;
      gap: 15px;
    }
    label {
      font-weight: bold;
    }
    input,
    select {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ddd;
      font-size: 1rem;
    }
    button {
      padding: 10px 20px;
      background-color: #ff6600;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
    }
    button:hover {
      background-color: #ff3300;
    }
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .popup {
      background: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      width: 300px;
    }
    .popup h2 {
      color: #ff6600;
    }
    .popup button {
      margin-top: 10px;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
    }
    .popup .proceed {
      background-color: #ff6600;
      color: white;
      border: none;
    }
    .popup .cancel {
      background-color: white;
      border: 1px solid #ff6600;
      color: #ff6600;
    }
  `;

  static properties = {
    firstName: { type: String },
    lastName: { type: String },
    dateOfEmployment: { type: String },
    dateOfBirth: { type: String },
    phone: { type: String },
    email: { type: String },
    department: { type: String },
    position: { type: String },
    employeeId: { type: String },
    showConfirmPopup: { type: Boolean },
    pendingEmployeeData: { type: Object },
  };

  constructor() {
    super();
    this.firstName = '';
    this.lastName = '';
    this.dateOfEmployment = '';
    this.dateOfBirth = '';
    this.phone = '';
    this.email = '';
    this.department = 'Analytics';
    this.position = 'Junior';
    this.employeeId = '';
    this.showConfirmPopup = false;
    this.pendingEmployeeData = null;

    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('firstName')) {
        this.firstName = urlParams.get('firstName');
        this.lastName = urlParams.get('lastName');
        this.dateOfEmployment = urlParams.get('dateOfEmployment');
        this.dateOfBirth = urlParams.get('dateOfBirth');
        this.phone = urlParams.get('phone');
        this.email = urlParams.get('email');
        this.department = urlParams.get('department');
        this.position = urlParams.get('position');
        this.employeeId = urlParams.get('id');
      }
    }, 100);
  }

  handleSubmit(event) {
    event.preventDefault();
    const employeeData = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfEmployment: this.dateOfEmployment,
      dateOfBirth: this.dateOfBirth,
      phone: this.phone,
      email: this.email,
      department: this.department,
      position: this.position,
    };

    if (this.employeeId) {
      this.pendingEmployeeData = { id: Number(this.employeeId), ...employeeData };
      this.showConfirmPopup = true;
    } else {
      store.addEmployee(employeeData);
      this.resetForm();
      page('/');
    }
  }

  confirmUpdate() {
    if (this.pendingEmployeeData) {
      store.updateEmployee(this.pendingEmployeeData);
    }
    this.closeConfirmPopup();
    this.resetForm();
    page('/');
  }

  closeConfirmPopup() {
    this.showConfirmPopup = false;
    this.pendingEmployeeData = null;
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.dateOfEmployment = '';
    this.dateOfBirth = '';
    this.phone = '';
    this.email = '';
    this.department = 'Analytics';
    this.position = 'Junior';
    this.employeeId = '';
  }

  render() {
    return html`
      <div class="container">
        <h2>
          ${this.employeeId ? i18next.t('editEmployee') : i18next.t('addNewEmployee')}
        </h2>
        <form @submit="${this.handleSubmit}">
          <label for="firstName">${i18next.t('firstName')}:</label>
          <input maxlength="30" type="text" id="firstName" .value="${this.firstName}" @input="${(e) => (this.firstName = e.target.value)}" required pattern="[A-Za-zığüşöçİĞÜŞÖÇs]*" title="Only letters and spaces are allowed." />
          <label for="lastName">${i18next.t('lastName')}:</label>
          <input maxlength="30" type="text" id="lastName" .value="${this.lastName}" @input="${(e) => (this.lastName = e.target.value)}" required pattern="[A-Za-zığüşöçİĞÜŞÖÇs]*" title="Only letters and spaces are allowed." />
          <label for="dateOfEmployment">${i18next.t('dateOfEmployment')}:</label>
          <input type="date" id="dateOfEmployment" .value="${this.dateOfEmployment}" @input="${(e) => (this.dateOfEmployment = e.target.value)}" required />
          <label for="dateOfBirth">${i18next.t('dateOfBirth')}:</label>
          <input type="date" id="dateOfBirth" .value="${this.dateOfBirth}" @input="${(e) => (this.dateOfBirth = e.target.value)}" required />
          <label for="phone">${i18next.t('phone')}:</label>
          <input maxlength="15" type="tel" id="phone" .value="${this.phone}" @input="${(e) => (this.phone = e.target.value)}" required />
          <label for="email">${i18next.t('email')}:</label>
          <input maxlength="100" type="email" id="email" .value="${this.email}" @input="${(e) => (this.email = e.target.value)}" required />
          <label for="department">${i18next.t('department')}:</label>
          <select id="department" .value="${this.department}" @change="${(e) => (this.department = e.target.value)}" required>
            <option value="Analytics">Analytics</option>
            <option value="Tech">Tech</option>
          </select>
          <label for="position">${i18next.t('position')}:</label>
          <select id="position" .value="${this.position}" @change="${(e) => (this.position = e.target.value)}" required>
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>
          <button type="submit">
            ${this.employeeId ? i18next.t('saveChanges') : i18next.t('addEmployee')}
          </button>
        </form>
      </div>
      ${this.showConfirmPopup
        ? html`
            <div class="popup-overlay">
              <div class="popup">
                <h2>${i18next.t('confirmUpdate')}</h2>
                <p>${i18next.t('areYouSure')}</p>
                <button class="proceed" @click="${this.confirmUpdate}">
                  ${i18next.t('proceed')}
                </button>
                <button class="cancel" @click="${this.closeConfirmPopup}">
                  ${i18next.t('cancel')}
                </button>
              </div>
            </div>
          `
        : ''}
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
