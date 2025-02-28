// Importem el component de base
import { BaseComponent } from '../libcomponents/base_component.js'
class CarretStatusComponent extends BaseComponent {
    constructor() {
        super();

        this.decrementCallback = null;

        this.render();
    }


    render() {    
        this.shadowRoot.innerHTML = `
            <style>
                ${BaseComponent.styles} /* Afegim estils del component base !! */
                :host {
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    font-weight: bold;
                    padding: 10px;
                }
                .status {
                    background: var(--primary-color, #6200ea);
                    color: white;
                    padding: 5px 15px;
                    border-radius: 20px;
                }
            </style>
            <span class="status">0 productes - 0.00€</span>
        `;

        this.carret = null;
    }

    setCarret(carret) {
        this.carret = carret;
        this.update();
        // Escoltem l'event carretActualitzat en el carret
        this.carret.addEventListener("carretActualitzat", () => this.update());
    }

    update() {
        if (!this.carret) return;
        const quantitat = this.carret.calcularQuantitatTotal();
        const total = this.carret.calcularPreuTotal().toFixed(2);
        this.shadowRoot.querySelector(".status").textContent = `${quantitat} productes - ${total}€`;
    }
}

customElements.define("carret-status-component", CarretStatusComponent);
