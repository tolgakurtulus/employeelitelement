// src/components/employee-list.js
import { LitElement, html, css } from 'lit';
import page from 'page';
import { store } from '../store/index.js';
import i18next, { changeLanguage } from '../translations/index.js';

export class EmployeeList extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    section {
      padding: 5px 20px 20px;
    }

    button:hover,
    a:hover {
      filter: brightness(1.1);
    }

    .headerup {
      font-size: 11px;
      font-weight: 100;
      color: gray;
      margin: 10px 0;
      opacity: 0.6;
    }

    .header {
      display: flex;
      justify-content: center;
    }

    .header__container {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: white;
      padding: 0 20px;
    }
    .header__container img {
      height: 30px;
    }

    .header__logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header__logo p {
      font-size: 12px;
      font-weight: 900;
    }

    .header__logo img {
      border-radius: 5px;
    }

    .header__right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .header__right p,
    .header__right a {
      color: #ff6600;
      text-decoration: none;
      font-size: 12px;
    }

    .header__right img {
      height: 18px;
    }

    .header__right div,
    .header__right a {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .flag img {
      height: 15px;
      cursor: pointer;
    }

    .main {
      display: flex;
      justify-content: center;
    }

    .container {
      width: 100%;
      margin: 10px auto;
      padding: 0 50px;
      border-radius: 10px;
    }

    .table-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        height: 23px;
        margin-left: 13px;
        cursor: pointer;
      }
      img:first-child {
        height: 22px;
      }
      h2 {
        font-size: 23px;
        font-weight: 100;
        color: #ff6600;
      }
    }

    /* Table Styles */
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
    }

    .actions button {
      background: white;
      border: none;
    }

    .actions img {
      height: 20px;
      cursor: pointer;
    }

    /* List Styles */
    .list-view {
      display: flex;
      gap: 1%;
      flex-wrap: wrap;
    }

    .list-item {
      flex: 1 1 calc(31% - 10px);
      max-width: 31.3%;
      margin-bottom: 15px;
      background-color: white;
      border: 1px solid rgba(255, 102, 0, 0.2);
      border-radius: 10px;
      padding: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      div {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      p {
        margin: 0;
      }
      p:first-child {
        font-size: 14px;
        font-weight: 900;
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

    .arrow {
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }

    .arrow:disabled {
      cursor: default;
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
      border-radius: 3px;
      width: 400px;
    }

    .popup p {
      color: #707070;
      font-size: 15px;
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

    /* Responsive Table */
    @media screen and (max-width: 1024px) {
      section {
        padding: 10px;
      }

      .list-item {
        flex: 1 1 calc(49% - 20px);
        max-width: 49.5%;
      }
    }
    @media screen and (max-width: 992px) {
      section {
        padding: 0;
      }

      .container {
        padding: 0 5px;
      }

      table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
      }

      th,
      td {
        padding: 10px;
        font-size: 12px;
      }

      .list-item {
        width: calc(45% - 10px);
      }
    }
    @media screen and (max-width: 600px) {
      .list-view {
        gap: 0;
      }

      .list-item {
        flex: 1 1 calc(100% - 20px);
        max-width: 101%;
      }
    }
  `;

  static properties = {
    employees: { type: Array },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    showPopup: { type: Boolean },
    selectedEmployee: { type: Object },
    lang: { type: String },
    viewMode: { type: String },
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.itemsPerPage = 9;
    this.employees = [];
    this.showPopup = false;
    this.selectedEmployee = null;
    this.lang = localStorage.getItem('lang') || 'en';
    this.viewMode = localStorage.getItem('viewMode') || 'table';
    store.subscribe(this._updateEmployees.bind(this));
    this.employees = store.employees;
  }

  _updateEmployees(employees) {
    this.employees = employees;
    this.requestUpdate();
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const sortedEmployees = [...this.employees].reverse(); // Reverse the employee list
    return sortedEmployees.slice(start, start + this.itemsPerPage);
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

  _changeLanguage(lang) {
    changeLanguage(lang);
    this.lang = lang;
    this.requestUpdate();
  }

  tabeView() {
    this.viewMode = 'table';
    localStorage.setItem('viewMode', 'table');
  }
  listView() {
    this.viewMode = 'list';
    localStorage.setItem('viewMode', 'list');
  }

  renderTableView() {
    return html`
      <table>
        <thead>
          <tr>
            <th>${i18next.t('firstName')}</th>
            <th>${i18next.t('lastName')}</th>
            <th>${i18next.t('dateOfEmployment')}</th>
            <th>${i18next.t('dateOfBirth')}</th>
            <th>${i18next.t('phone')}</th>
            <th>${i18next.t('email')}</th>
            <th>${i18next.t('department')}</th>
            <th>${i18next.t('position')}</th>
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
                    <img loading="lazy" src="/public/assets/pen.svg" />
                  </button>
                  <button @click="${() => this.openPopup(employee)}">
                    <img loading="lazy" src="/public/assets/waste.svg" />
                  </button>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }

  renderListView() {
    return html`
      <div class="list-view">
        ${this.paginatedEmployees.map(
          (employee) => html`
            <div class="list-item">
              <div>
                <p>${i18next.t('firstName')}:</p>
                <p>
                  ${employee.firstName}
                </p>
              </div>
              <div>
                <p>${i18next.t('lastName')}:</p>
                <p>
                  ${employee.lastName}
                </p>
              </div>
              <div>
                <p>${i18next.t('dateOfEmployment')}:</p>
                <p>
                  ${employee.dateOfEmployment}
                </p>
              </div>
              <div>
                <p>${i18next.t('dateOfBirth')}:</p>
                <p>
                  ${employee.dateOfBirth}
                </p>
              </div>
              <div>
                <p>${i18next.t('phone')}:</p>
                <p>
                  ${employee.phone}
                </p>
              </div>
              <div>
                <p>${i18next.t('email')}:</p>
                <p>
                  ${employee.email}
                </p>
              </div>
              <div>
                <p>${i18next.t('department')}:</p>
                <p>
                  ${employee.department}
                </p>
              </div>
              <div>
                <p>${i18next.t('position')}:</p>
                <p>
                  ${employee.position}
                </p>
              </div>
              <div class="actions">
                <button @click="${() => this.handleEdit(employee)}">
                  <img loading="lazy" src="/public/assets/pen.svg" />
                </button>
                <button @click="${() => this.openPopup(employee)}">
                  <img loading="lazy" src="/public/assets/waste.svg" />
                </button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  render() {
    const totalPages = Math.ceil(this.employees.length / this.itemsPerPage);
    const prevColor = this.currentPage === 1 ? 'grey' : '#ff6600';
    const nextColor = this.currentPage === totalPages ? 'grey' : '#ff6600';

    return html`
      <section>
        <div class="headerup">
          ${i18next.t('employeeList')} (${this.viewMode === 'table' ? 'Table' : 'List'} View)
        </div>
        <div class="header">
          <div class="header__container">
            <div class="header__logo">
              <img loading="lazy" src="/public/assets/ing.webp" />
              <p>ING</p>
            </div>
            <div class="header__right">
              <div>
                <img loading="lazy" src="/public/assets/employees.svg" />
                <p>${i18next.t('employee')}</p>
              </div>
              <a href="/add-employee">
                <img loading="lazy" src="/public/assets/plus.svg" />
                ${i18next.t('addNewEmployee')}
              </a>
              <div class="flag">
                <img loading="lazy" src=${this.lang === 'en' ? '/public/assets/turkish.svg' : '/public/assets/english.svg'} @click=${() => this._changeLanguage(this.lang === 'en' ? 'tr' : 'en')} />
              </div>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="container">
            <div class="table-header">
              <h2>${i18next.t('employeeList')}</h2>
              <div>
                <img loading="lazy" src="/public/assets/tableline.svg" @click="${this.tabeView}" />
                <img loading="lazy" src="/public/assets/list.svg" @click="${this.listView}" />
              </div>
            </div>
            ${this.viewMode === 'table' ? this.renderTableView() : this.renderListView()}
            <div class="pagination">
              <button class="arrow" style="color: ${prevColor};" ?disabled="${this.currentPage === 1}" @click="${() => this.changePage(this.currentPage - 1)}">
                &lt;
              </button>
              ${[...Array(totalPages)].map(
                (_, i) => html`
                  <span class="page ${this.currentPage === i + 1 ? 'active' : ''}" @click="${() => this.changePage(i + 1)}">
                    ${i + 1}
                  </span>
                `
              )}
              <button class="arrow" style="color: ${nextColor};" ?disabled="${this.currentPage === totalPages}" @click="${() => this.changePage(this.currentPage + 1)}">
                &gt;
              </button>
            </div>
          </div>
        </div>
        ${this.showPopup
          ? html`
              <div class="popup-overlay">
                <div class="popup">
                  <div class="popup__header">
                    <h2>Are you sure?</h2>
                    <img loading="lazy" @click="${this.closePopup}" src="/public/assets/close.svg" />
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
      </section>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
