import { LitElement, html, css } from 'lit';

export class MyElement extends LitElement {
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
  `;

  static properties = {
    employees: { type: Array },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.itemsPerPage = 7;
    this.employees = [
      { id: 1, firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '23/09/2022', dateOfBirth: '23/09/2022', phone: '+(90) 532 123 45 67', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
      { id: 2, firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '23/09/2022', dateOfBirth: '23/09/2022', phone: '+(90) 532 123 45 67', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
      { id: 3, firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '23/09/2022', dateOfBirth: '23/09/2022', phone: '+(90) 532 123 45 67', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
      { id: 4, firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '23/09/2022', dateOfBirth: '23/09/2022', phone: '+(90) 532 123 45 67', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
      { id: 5, firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '23/09/2022', dateOfBirth: '23/09/2022', phone: '+(90) 532 123 45 67', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
      { id: 6, firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '23/09/2022', dateOfBirth: '23/09/2022', phone: '+(90) 532 123 45 67', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
      { id: 7, firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '23/09/2022', dateOfBirth: '23/09/2022', phone: '+(90) 532 123 45 67', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
    ];
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(start, start + this.itemsPerPage);
  }

  changePage(page) {
    this.currentPage = page;
  }

  render() {
    return html`
      <div class="container">
        <h2>Employee List asdaszzzzzzzzzzz</h2>
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
                    <button class="edit">✏️</button>
                    <button class="delete">🗑️</button>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>

        <div class="pagination">
          ${[...Array(10)].map((_, i) => html` <span class="page ${this.currentPage === i + 1 ? 'active' : ''}" @click="${() => this.changePage(i + 1)}">${i + 1}</span> `)}
        </div>
      </div>
    `;
  }
}

customElements.define('my-element', MyElement);
