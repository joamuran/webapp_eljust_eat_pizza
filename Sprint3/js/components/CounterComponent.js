// Importem el component de base
import { BaseComponent } from '../libcomponents/base_component.js'
class CounterComponent extends BaseComponent {
    constructor() {
        super();

        // Valor inicial (si no s'especifica, és 0)
        this.count = parseInt(this.getAttribute('valor-inicial')) || 0;
        this.producte = null;
        this.carret = null;

        // Callbacks per a incrementar i decrementar el producte
        this.incrementCallback = null;
        this.decrementCallback = null;

        this.render();
    }


    // NOU: PER COMENTAR
    setProducte(producte, carret) {
        this.producte = producte;
        this.carret = carret;

        // Escoltem els canvis del carret
        this.carret.addEventListener("carretActualitzat", () => this.update());

        // Actualitzem la quantitat inicial
        this.update();
    }


    setCallbacks(incrementCallback, decrementCallback) {
        // Mètode per proporcionar els callbacks
        this.incrementCallback = incrementCallback;
        this.decrementCallback = decrementCallback;
    }

    // NOU: PER COMENTAR
    update() {
        if (!this.carret || !this.producte) return;

        // Busquem el producte dins del carret
        const elementCarret = this.carret.elements.find(e => e.producte.id === this.producte.id);
        this.count = elementCarret ? elementCarret.quantitat : 0;

        // Actualitzem el comptador
        this.shadowRoot.querySelector(".counter-value").textContent = this.count;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    font-size: 20px;
                    user-select: none;
                }

                .btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: none;
                    background-color:var(--primary-color);
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.3s;
                }

                .btn:hover {
                    background-color: var(--on-primary-color);
                }

                .counter-value {
                    min-width: 50px;
                    text-align: center;
                    font-weight: bold;
                }
            </style>

            <button class="btn" id="decrement">−</button>
            <span class="counter-value">${this.count}</span>
            <button class="btn" id="increment">+</button>
        `;

        // Assignem esdeveniments als botons
        this.shadowRoot.getElementById('increment').addEventListener('click', () => {
            if (this.incrementCallback) this.incrementCallback();

        });
        this.shadowRoot.getElementById('decrement').addEventListener('click', () => {
            if (this.incrementCallback)
                this.decrementCallback();
        });
    };
}

    /*afigProducte() {
        this.count++;
        this.shadowRoot.querySelector('.counter-value').textContent = this.count;
    }

    eliminaProducte() {
        if (this.count>0) this.count--;
        this.shadowRoot.querySelector('.counter-value').textContent = this.count;
    }*/


// Registrar el component
customElements.define('counter-component', CounterComponent);
