import { html, css, LitElement } from 'lit';
import './components/employee-list.js'; // Employee list bileşenini import ediyoruz

class AppRoot extends LitElement {
  static styles = css`
    /* Global Styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    h1 {
      text-align: center;
      padding: 20px;
    }
  `;

  render() {
    return html`
      <h1>Employee Management App</h1>
      <employee-list></employee-list>
      -
    `;
  }
}

customElements.define('app-root', AppRoot);
