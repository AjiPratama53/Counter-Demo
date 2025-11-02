class CounterControlsB extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="index.css">
            <div class="controls">
                <button id="minus">-</button>
                <button id="plus">+</button>
        `;
    }

    connectedCallback() {
        var ops;
        this.targetId = this.getAttribute('target');

        this.shadowRoot.getElementById('plus').addEventListener('click' , () => {
            this.emitChanges(1)
            console.log('Add'); 
        });
        this.shadowRoot.getElementById('minus').addEventListener('click', () => {
            this.emitChanges(-1)
            console.log('Substract'); 
        });        
    }

    emitChanges(delta) {
        // First try updating a target element if target attribute is set
        if (this.targetId) {
            const target = document.getElementById(this.targetId);
            if (target && typeof target.count !== 'undefined') {
                target.count += delta;
                return;
            }
        }
        
        // If no target or target not found, dispatch event for parent component
        const event = new CustomEvent('count-change', {
            bubbles: true,
            composed: true,
            detail: { delta }
        });
        this.dispatchEvent(event);
    }
}

customElements.define('counter-controls-b', CounterControlsB);