// src/i18n.js
import i18next from 'i18next';

// LocalStorage'dan mevcut dil tercihini alıyoruz; yoksa 'en' (İngilizce) varsayalım.
const savedLang = localStorage.getItem('lang') || 'en';

i18next.init({
  lng: savedLang,
  debug: false, // geliştirme sırasında true yapabilirsiniz
  resources: {
    en: {
      translation: {
        employeeList: 'Employee List',
        employee: 'Employee',
        addNewEmployee: 'Add New',
        editEmployee: 'Edit Employee',
        firstName: 'First Name',
        lastName: 'Last Name',
        dateOfEmployment: 'Date of Employment',
        dateOfBirth: 'Date of Birth',
        phone: 'Phone',
        email: 'Email',
        department: 'Department',
        position: 'Position',
        saveChanges: 'Save Changes',
        addEmployee: 'Add Employee',
        confirmUpdate: 'Confirm Update',
        areYouSure: 'Are you sure you want to save changes?',
        proceed: 'Proceed',
        cancel: 'Cancel',
      },
    },
    tr: {
      translation: {
        employeeList: 'Çalışan Listesi',
        employee: 'Çalışan',
        addNewEmployee: 'Yeni Çalışan',
        editEmployee: 'Çalışanı Düzenle',
        firstName: 'Ad',
        lastName: 'Soyad',
        dateOfEmployment: 'İşe Başlama Tarihi',
        dateOfBirth: 'Doğum Tarihi',
        phone: 'Telefon',
        email: 'E-posta',
        department: 'Departman',
        position: 'Pozisyon',
        saveChanges: 'Değişiklikleri Kaydet',
        addEmployee: 'Çalışan Ekle',
        confirmUpdate: 'Güncellemeyi Onayla',
        areYouSure: 'Değişiklikleri kaydetmek istediğinize emin misiniz?',
        proceed: 'İlerle',
        cancel: 'İptal',
      },
    },
  },
});

// Dil değiştiğinde localStorage'a kaydedelim
export function changeLanguage(lang) {
  i18next.changeLanguage(lang);
  localStorage.setItem('lang', lang);
}

export default i18next;
