class CombinedCounterB extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'value'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._title = 'Lorem Ipsum Title';
    this._value = 0;


    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="index.css">
      <div class="wrapper">
        <counter-display-b id="display" title="${this._title}" value="${this._value}"></counter-display-b>
        <counter-controls-b id="controls"></counter-controls-b>
      </div>
    `;
  }


  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    if (name === 'title') {
      this._title = newValue || 'Lorem Ipsum Title';
      const display = this.shadowRoot?.getElementById('display');
      if (display) display.setAttribute('title', this._title);
    }
    if (name === 'value') {
      this._value = parseInt(newValue) || 0;
      const display = this.shadowRoot?.getElementById('display');
      if (display) display.setAttribute('value', this._value);
    }
  }

  connectedCallback() {
    // Set initial values
    const display = this.shadowRoot.getElementById('display');
    const controls = this.shadowRoot.getElementById('controls');
    
    // Set initial attributes
    display.setAttribute('title', this.getAttribute('title') || this._title);
    display.setAttribute('value', this.getAttribute('value') || this._value);
    
    controls.addEventListener('count-change', e => {
      display.count += e.detail.delta;
    });
  }
}


customElements.define('combined-counter-b', CombinedCounterB);