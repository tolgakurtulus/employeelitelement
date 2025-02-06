class Store {
  constructor() {
    this._listeners = [];
    this._load();
  }

  _load() {
    const storedData = localStorage.getItem('employees');
    this.employees = storedData ? JSON.parse(storedData) : [];
  }

  addEmployee(employee) {
    const employeeWithId = { ...employee, id: new Date().getTime() };
    this.employees = [...this.employees, employeeWithId];
    this._save();
    this._notify();
  }

  updateEmployee(updatedEmployee) {
    const index = this.employees.findIndex((employee) => {
      return employee.id === updatedEmployee.id;
    });
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      this._save();
      this._notify();
    }
  }

  removeEmployee(id) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    this._save();
    this._notify();
  }

  _save() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  _notify() {
    this._listeners.forEach((listener) => listener(this.employees));
  }

  subscribe(listener) {
    this._listeners.push(listener);
  }

  unsubscribe(listener) {
    this._listeners = this._listeners.filter((l) => l !== listener);
  }
}

const store = new Store();
export { store };
