class Store {
  constructor() {
    this._listeners = [];
    this._load(); // Veriyi yükle
  }

  // Veriyi localStorage'dan yükler
  _load() {
    const storedData = localStorage.getItem('employees');
    this.employees = storedData ? JSON.parse(storedData) : [];
  }

  // Veriyi ekler ve localStorage'a kaydeder
  addEmployee(employee) {
    const employeeWithId = { ...employee, id: new Date().getTime() }; // Zaman damgası kullanıyoruz
    this.employees = [...this.employees, employeeWithId];
    this._save(); // Veriyi kaydet
    this._notify();
  }

  // Veriyi günceller ve localStorage'a kaydeder
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

  // Bir çalışan kaydını siler
  removeEmployee(id) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    this._save(); // Veriyi kaydet
    this._notify(); // Dinleyicilere bildir
  }

  // localStorage'a veriyi kaydeder
  _save() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  // Dinleyicilere güncellemeleri bildirir
  _notify() {
    this._listeners.forEach((listener) => listener(this.employees));
  }

  // Store'dan veri dinlemek için dinleyici ekler
  subscribe(listener) {
    this._listeners.push(listener);
  }

  // Store'dan veri dinlemeyi durdurur
  unsubscribe(listener) {
    this._listeners = this._listeners.filter((l) => l !== listener);
  }
}

const store = new Store();
export { store };
