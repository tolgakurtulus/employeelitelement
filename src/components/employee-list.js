import { LitElement, html, css } from 'lit';
import { store } from '../store/index.js';
import page from 'page';

export class EmployeeList extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    button:hover,
    a:hover {
      filter: brightness(1.1);
    }

    .c-headerup {
      font-size: 11px;
      font-weight: 100;
      color: gray;
      margin: 50px 0 10px 50px;
      opacity: 0.6;
    }
    .c-header {
      width: calc(100% - 140px);
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: white;
      margin: 0 50px;
      padding: 0 20px;
      img {
        height: 30px;
      }
    }
    .c-header__right {
      display: flex;
      align-items: center;
      gap: 20px;
      p,
      a {
        color: #ff6600;
        text-decoration: none;
        font-size: 12px;
      }
      img {
        height: 18px;
      }
      div,
      a {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }

    .container {
      width: 90%;
      margin: 20px auto;
      padding: 5px 20px;
      border-radius: 10px;
    }
    h2 {
      color: #ff6600;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background: white;
    }
    th,
    td {
      padding: 15px 10px;
      border-bottom: 1px solid #f0f0f0;
      text-align: center;
      font-size: 14px;
      opacity: 0.7;
    }
    th {
      color: #ff6600;
    }
    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        background: white;
        border: none;
      }
      img {
        height: 20px;
        cursor: pointer;
      }
    }
    .pagination {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }
    .page {
      padding: 5px 10px;
      cursor: pointer;
    }
    .active {
      background: #ff6600;
      color: white;
      border: none;
      border-radius: 50%;
    }
    /* Butonların varsayılan stili */
    .arrow {
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }
    .arrow:disabled {
      cursor: default;
    }
    /* Popup Styling */
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
      border-radius: 3px;
      width: 400px;

      p {
        color: #707070;
        font-size: 15px;
      }
    }
    .popup__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        color: #ff6600;
        margin: 0;
        font-size: 20px;
      }

      img {
        height: 20px;
        cursor: pointer;
      }
    }
    .popup button {
      margin-top: 10px;
      padding: 10px;
      border-radius: 8px;
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
    employees: { type: Array },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    showPopup: { type: Boolean },
    selectedEmployee: { type: Object },
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.itemsPerPage = 1;
    this.employees = [];
    this.showPopup = false;
    this.selectedEmployee = null;

    store.subscribe(this._updateEmployees.bind(this));
    this.employees = store.employees;
  }

  _updateEmployees(employees) {
    this.employees = employees;
    this.requestUpdate();
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(start, start + this.itemsPerPage);
  }

  changePage(page) {
    this.currentPage = page;
  }

  handleEdit(employee) {
    const employeeWithId = { ...employee, id: employee.id };
    const queryParams = new URLSearchParams(employeeWithId).toString();
    page(`/add-employee?${queryParams}`);
  }

  openPopup(employee) {
    console.log('🚀 ~ employee:', employee);
    this.selectedEmployee = employee;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedEmployee = null;
  }

  deleteEmployee() {
    if (this.selectedEmployee) {
      store.removeEmployee(this.selectedEmployee.id);
    }
    this.closePopup();
  }

  render() {
    const totalPages = Math.ceil(this.employees.length / this.itemsPerPage);
    // Belirleyelim: eğer ilk sayfada isek sol (önceki) buton gri, eğer son sayfada isek sağ (sonraki) buton gri,
    // diğer durumlarda her iki buton da turuncu.
    const prevColor = this.currentPage === 1 ? 'grey' : '#ff6600';
    const nextColor = this.currentPage === totalPages ? 'grey' : '#ff6600';

    return html`
      <div class="c-headerup">
        Employee List (Table View)
      </div>
      <div class="c-header">
        <img src="https://www.ing.com.tr/F/Documents/Images/kurumsal_logo_genel_mudurluk/ING_Logo_TuruncuBG_Big.png" />
        <div class="c-header__right">
          <div>
            <img src="/public/assets/employees.svg" />
            <p>Employees</p>
          </div>
          <a href="/add-employee">
            <img src="/public/assets/plus.svg" />
            Add New</a
          >
          <p>TR</p>
        </div>
      </div>
      <div class="container">
        <h2>Employee List</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Employment</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.paginatedEmployees.map(
              (employee) => html`
                <tr>
                  <td>${employee.firstName}</td>
                  <td>${employee.lastName}</td>
                  <td>${employee.dateOfEmployment}</td>
                  <td>${employee.dateOfBirth}</td>
                  <td>${employee.phone}</td>
                  <td>${employee.email}</td>
                  <td>${employee.department}</td>
                  <td>${employee.position}</td>
                  <td class="actions">
                    <button @click="${() => this.handleEdit(employee)}">
                      <img src="/public/assets/pen.svg" />
                    </button>
                    <button @click="${() => this.openPopup(employee)}">
                      <img src="/public/assets/waste.svg" />
                    </button>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>

        <div class="pagination">
          <!-- Önceki (sol) ok -->
          <button class="arrow" style="color: ${prevColor};" ?disabled="${this.currentPage === 1}" @click="${() => this.changePage(this.currentPage - 1)}">
            &lt;
          </button>

          <!-- Sayfa numaraları -->
          ${[...Array(totalPages)].map(
            (_, i) => html`
              <span class="page ${this.currentPage === i + 1 ? 'active' : ''}" @click="${() => this.changePage(i + 1)}">
                ${i + 1}
              </span>
            `
          )}

          <!-- Sonraki (sağ) ok -->
          <button class="arrow" style="color: ${nextColor};" ?disabled="${this.currentPage === totalPages}" @click="${() => this.changePage(this.currentPage + 1)}">
            &gt;
          </button>
        </div>
      </div>
      ${this.showPopup
        ? html`
            <div class="popup-overlay">
              <div class="popup">
                <div class="popup__header">
                  <h2>Are you sure?</h2>
                  <img @click="${this.closePopup}" src="/public/assets/close.svg" />
                </div>
                <p>
                  Selected Employee record of ${this.selectedEmployee ? this.selectedEmployee.firstName : ''} ${this.selectedEmployee ? this.selectedEmployee.lastName : ''} will be deleted.
                </p>
                <button class="proceed" @click="${this.deleteEmployee}">
                  Proceed
                </button>
                <button class="cancel" @click="${this.closePopup}">Cancel</button>
              </div>
            </div>
          `
        : ''}
    `;
  }
}

customElements.define('employee-list', EmployeeList);
