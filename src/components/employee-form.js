import { LitElement, html, css } from 'lit';
import { store } from '../store/index.js';

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
    /* Popup styling */
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
    employeeId: { type: String }, // Mevcut çalışanı güncellemek için
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

    // URL'deki parametrelerle formu dolduruyoruz (edit modunda)
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
        this.employeeId = urlParams.get('id'); // edit modu için employeeId
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
      // Edit modunda onaylama popup'ı açıyoruz
      this.pendingEmployeeData = { id: Number(this.employeeId), ...employeeData };
      this.showConfirmPopup = true;
    } else {
      // Yeni çalışan ekleme
      store.addEmployee(employeeData);
      this.resetForm();
    }
  }

  confirmUpdate() {
    if (this.pendingEmployeeData) {
      store.updateEmployee(this.pendingEmployeeData);
    }
    this.closeConfirmPopup();
    this.resetForm();
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
        <h2>${this.employeeId ? 'Edit Employee' : 'Add New Employee'}</h2>
        <form @submit="${this.handleSubmit}">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" .value="${this.firstName}" @input="${(e) => (this.firstName = e.target.value)}" required />

          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" .value="${this.lastName}" @input="${(e) => (this.lastName = e.target.value)}" required />

          <label for="dateOfEmployment">Date of Employment:</label>
          <input type="date" id="dateOfEmployment" .value="${this.dateOfEmployment}" @input="${(e) => (this.dateOfEmployment = e.target.value)}" required />

          <label for="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" .value="${this.dateOfBirth}" @input="${(e) => (this.dateOfBirth = e.target.value)}" required />

          <label for="phone">Phone Number:</label>
          <input type="tel" id="phone" .value="${this.phone}" @input="${(e) => (this.phone = e.target.value)}" required />

          <label for="email">Email Address:</label>
          <input type="email" id="email" .value="${this.email}" @input="${(e) => (this.email = e.target.value)}" required />

          <label for="department">Department:</label>
          <select id="department" .value="${this.department}" @change="${(e) => (this.department = e.target.value)}" required>
            <option value="Analytics">Analytics</option>
            <option value="Tech">Tech</option>
          </select>

          <label for="position">Position:</label>
          <select id="position" .value="${this.position}" @change="${(e) => (this.position = e.target.value)}" required>
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>

          <button type="submit">
            ${this.employeeId ? 'Save Changes' : 'Add Employee'}
          </button>
        </form>
      </div>
      ${this.showConfirmPopup
        ? html`
            <div class="popup-overlay">
              <div class="popup">
                <h2>Confirm Update</h2>
                <p>Are you sure you want to save changes?</p>
                <button class="proceed" @click="${this.confirmUpdate}">
                  Proceed
                </button>
                <button class="cancel" @click="${this.closeConfirmPopup}">
                  Cancel
                </button>
              </div>
            </div>
          `
        : ''}
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
