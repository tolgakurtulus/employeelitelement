import { fixture, expect, html } from '@open-wc/testing';
import sinon from 'sinon';
import { store } from '../../src/store/index.js';
import { EmployeeList } from '../src/components/employee-list.js';
import page from 'page';
import i18next from '../src//translations/index.js';

suite('EmployeeList Component', () => {
  let element;

  setup(async () => {
    element = await fixture(html`<employee-list></employee-list>`);
  });

  test('Component is defined', () => {
    expect(element).to.be.instanceOf(EmployeeList);
  });

  test('Initial properties are set correctly', () => {
    expect(element.currentPage).to.equal(1);
    expect(element.itemsPerPage).to.equal(9);
    expect(element.employees).to.be.an('array').that.is.empty;
    expect(element.showPopup).to.be.false;
    expect(element.selectedEmployee).to.be.null;
    expect(element.lang).to.be.a('string');
    expect(element.viewMode).to.be.oneOf(['table', 'list']);
  });

  test('Updates employees when store changes', async () => {
    const mockEmployees = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
    const storeStub = sinon.stub(store, 'employees').get(() => mockEmployees);

    element._updateEmployees(mockEmployees);
    await element.updateComplete;

    expect(element.employees).to.deep.equal(mockEmployees);
    storeStub.restore();
  });

  test('Handles page change correctly', async () => {
    element.changePage(2);
    await element.updateComplete;
    expect(element.currentPage).to.equal(2);
  });

  test('Handles employee edit navigation', () => {
    const employee = { id: 1, firstName: 'Jane', lastName: 'Doe' };
    const pageStub = sinon.stub(page, 'redirect');

    element.handleEdit(employee);

    expect(pageStub.calledOnce).to.be.true;
    pageStub.restore();
  });

  test('Opens and closes delete confirmation popup', async () => {
    const employee = { id: 1, firstName: 'Jane' };

    element.openPopup(employee);
    await element.updateComplete;
    expect(element.showPopup).to.be.true;
    expect(element.selectedEmployee).to.equal(employee);

    element.closePopup();
    await element.updateComplete;
    expect(element.showPopup).to.be.false;
    expect(element.selectedEmployee).to.be.null;
  });

  test('Deletes an employee from store', async () => {
    const removeStub = sinon.stub(store, 'removeEmployee');
    const employee = { id: 1, firstName: 'Jane' };

    element.openPopup(employee);
    element.deleteEmployee();
    await element.updateComplete;

    expect(removeStub.calledOnceWith(1)).to.be.true;
    removeStub.restore();
  });

  test('Changes language correctly', async () => {
    const langStub = sinon.stub(i18next, 'changeLanguage');
    element._changeLanguage('fr');
    await element.updateComplete;

    expect(langStub.calledOnceWith('fr')).to.be.true;
    expect(element.lang).to.equal('fr');
    langStub.restore();
  });

  test('Toggles between table and list view', async () => {
    element.listView();
    await element.updateComplete;
    expect(element.viewMode).to.equal('list');

    element.tabeView();
    await element.updateComplete;
    expect(element.viewMode).to.equal('table');
  });
});
