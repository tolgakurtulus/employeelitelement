// import { Router } from '@vaadin/router';
// import '../components/employee-list.js';
// import '../components/employee-form.js';

// const outlet = document.getElementById('outlet'); // Ana HTML'de outlet olarak kullanacağımız eleman

// const router = new Router(outlet);

// router.setRoutes([
//   {
//     path: '/',
//     component: 'employee-list', // Ana sayfa: Çalışanlar Listesi
//   },
//   // {
//   //   path: '/add-employee',
//   //   component: 'employee-form', // Yeni çalışan ekleme formu
//   // },
//   {
//     path: '/add-employee/:id',
//     component: 'employee-form', // Yeni çalışan ekleme formu
//   },
// ]);

// export { router };

import page from 'page'; // page.js'i import ediyoruz
import '../components/employee-list.js';
import '../components/employee-form.js';

// Ana outlet elementini alıyoruz
const outlet = document.getElementById('outlet');

// / (ana sayfa) için yönlendirme
page('/', () => {
  outlet.innerHTML = '<employee-list></employee-list>';
});

// /add-employee için yönlendirme
page('/add-employee', () => {
  outlet.innerHTML = '<employee-form></employee-form>';
});
// /add-employee için yönlendirme
page('/add-employee', () => {
  outlet.innerHTML = '<employee-form></employee-form>';
});

// Router'ı başlatıyoruz
page.start();
