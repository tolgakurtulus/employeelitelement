import '@web/test-runner-mocha';
import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/employee-form.js';
import { store } from '../src/store/index.js';
import i18next from '../src/translations/index.js';

describe('EmployeeForm', () => {
  it('renders the form with initial values', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    expect(el.firstName).to.equal('');
    expect(el.lastName).to.equal('');
    expect(el.dateOfEmployment).to.equal('');
    expect(el.dateOfBirth).to.equal('');
    expect(el.phone).to.equal('');
    expect(el.email).to.equal('');
    expect(el.department).to.equal('Analytics');
    expect(el.position).to.equal('Junior');
  });

  it('displays translation text correctly', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const title = el.shadowRoot.querySelector('h2').textContent;
    expect(title).to.include(i18next.t('addNewEmployee'));
    const submitButton = el.shadowRoot.querySelector('button');
    expect(submitButton.textContent).to.include(i18next.t('addEmployee'));
  });

  it('handles form input changes correctly', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    el.firstName = 'John';
    el.lastName = 'Doe';
    el.dateOfEmployment = '2025-01-01';
    el.dateOfBirth = '1990-01-01';
    el.phone = '123456789';
    el.email = 'john.doe@example.com';
    el.department = 'Tech';
    el.position = 'Medior';

    expect(el.firstName).to.equal('John');
    expect(el.lastName).to.equal('Doe');
    expect(el.dateOfEmployment).to.equal('2025-01-01');
    expect(el.dateOfBirth).to.equal('1990-01-01');
    expect(el.phone).to.equal('123456789');
    expect(el.email).to.equal('john.doe@example.com');
    expect(el.department).to.equal('Tech');
    expect(el.position).to.equal('Medior');
  });

  it('submits the form data correctly', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    el._page = () => {};

    el.firstName = 'John';
    el.lastName = 'Doe';
    el.dateOfEmployment = '2025-01-01';
    el.dateOfBirth = '1990-01-01';
    el.phone = '123456789';
    el.email = 'john.doe@example.com';
    el.department = 'Tech';
    el.position = 'Medior';

    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    const employees = store.getEmployees();
    expect(employees).to.have.lengthOf(1);
    expect(employees[0].firstName).to.equal('John');
    expect(employees[0].lastName).to.equal('Doe');
  });

  it('displays confirmation popup when updating an employee', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    el._page = () => {};

    el.employeeId = '1';
    el.firstName = 'Jane';
    el.lastName = 'Doe';

    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    const popup = el.shadowRoot.querySelector('.popup-overlay');
    expect(popup).to.not.be.null;

    const proceedButton = popup.querySelector('.proceed');
    expect(proceedButton).to.exist;
    proceedButton.click();

    const employees = store.getEmployees();
    expect(employees[0].firstName).to.equal('Jane');
    expect(employees[0].lastName).to.equal('Doe');
  });

  it('closes the confirmation popup correctly', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    el.showConfirmPopup = true;
    const popup = el.shadowRoot.querySelector('.popup-overlay');
    const cancelButton = popup.querySelector('.cancel');
    cancelButton.click();
    expect(el.showConfirmPopup).to.be.false;
  });
});
