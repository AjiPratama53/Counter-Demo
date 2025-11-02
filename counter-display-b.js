class CounterDisplayB extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'value'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._title = this.getAttribute('title') || 'Lorem Ipsum Title';
    this._value = parseInt(this.getAttribute('value')) || 0;


    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="index.css">
      <div class="display">
        <div class="title">${this._title}</div>
        <div class="value">Value: <span class="number">${this._value}</span></div>
      </div>
    `;
  }


  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    if (name === 'title') {
      this._title = newValue || 'Lorem Ipsum Title';
      this.shadowRoot.querySelector('.title').textContent = this._title;
    }
    if (name === 'value') {
      this._value = parseInt(newValue) || 0;
      this.shadowRoot.querySelector('.number').textContent = this._value;
    }
  }

  set count(val) {
    this._value = val;
    this.shadowRoot.querySelector('.number').textContent = val;
  }

  get count() {
    return this._value;
  }
}

customElements.define('counter-display-b', CounterDisplayB);
