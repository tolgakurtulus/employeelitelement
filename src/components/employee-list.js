import { LitElement, html, css } from 'lit';
import { store } from '../store/index.js';
import page from 'page';

export class EmployeeList extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .c-headerup {
      font-size: 11px;
      font-weight: 100;
      color: gray;
      margin-left: 50px;
      margin-top: 50px;
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
      div {
        display: flex;
        align-items: center;
        gap: 20px;
        p,
        a {
          color: #ff6600;
          text-decoration: none;
        }
      }
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
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    th,
    td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    th {
      background: #f4f4f4;
      color: #ff6600;
    }
    .actions {
      display: flex;
      gap: 8px;
    }
    .edit,
    .delete {
      cursor: pointer;
      padding: 5px;
      border-radius: 5px;
      border: none;
    }
    .edit {
      background: #ffcc00;
    }
    .delete {
      background: #ff3300;
      color: white;
    }
    .pagination {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      gap: 5px;
    }
    .page {
      padding: 5px 10px;
      border: 1px solid #ddd;
      cursor: pointer;
    }
    .active {
      background: #ff6600;
      color: white;
      border: none;
    }
    /* Popup Styling */
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: none;
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
    this.itemsPerPage = 7;
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
    const employeeWithId = { ...employee, id: employee.id }; // employee nesnesi id'yi içermelidir
    const queryParams = new URLSearchParams(employeeWithId).toString();
    page(`/add-employee?${queryParams}`);
  }

  openPopup(employee) {
    this.selectedEmployee = employee;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedEmployee = null;
  }

  deleteEmployee() {
    if (this.selectedEmployee) {
      // Silme işlemi burada yapılacak, örneğin:
      store.removeEmployee(this.selectedEmployee.id); // store'dan silme
    }
    this.closePopup();
  }

  render() {
    return html`
      <div class="c-headerup">
        Employee List (Table View)
      </div>
      <div class="c-header">
        <img src="https://www.ing.com.tr/F/Documents/Images/kurumsal_logo_genel_mudurluk/ING_Logo_TuruncuBG_Big.png" />
        <div class="c-headerup__right">
          <p>Employees</p>
          <a href="/add-employee">+ Add New</a>
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
                    <button class="edit" @click="${() => this.handleEdit(employee)}">✏️</button>
                    <button class="delete" @click="${() => this.openPopup(employee)}">🗑️</button>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>

        <div class="pagination">
          ${[...Array(Math.ceil(this.employees.length / this.itemsPerPage))].map(
            (_, i) => html`
              <span class="page ${this.currentPage === i + 1 ? 'active' : ''}" @click="${() => this.changePage(i + 1)}">
                ${i + 1}
              </span>
            `
          )}
        </div>
      </div>

      <!-- Popup -->
      <div class="popup-overlay" style="display: ${this.showPopup ? 'flex' : 'none'}">
        <div class="popup">
          <h2>Are you sure?</h2>
          <p>
            Selected Employee record of ${this.selectedEmployee ? this.selectedEmployee.firstName : ''} ${this.selectedEmployee ? this.selectedEmployee.lastName : ''} will be deleted.
          </p>
          <button class="proceed" @click="${this.deleteEmployee}">Proceed</button>
          <button class="cancel" @click="${this.closePopup}">Cancel</button>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
