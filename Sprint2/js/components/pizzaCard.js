// components/PizzaCard.js
import './LlistaAlergens.js';
import './CounterComponent.js';

// Importem el component de base
import { CardComponent } from './CardComponent.js'


    class PizzaCard extends CardComponent {
    constructor() {
        super();
    }

    connectedCallback() {

        // Funció del cicle de vida que s'invoca quan el component s'afig al DOM
        // Aci agafem els atributs

        const nom = this.getAttribute('pizza-nom') || 'Pizza desconeguda';
        const preu = this.getAttribute('pizza-preu') || '0.00';
        const img = this.serverURL+this.getAttribute('pizza-img') || '';
        const desc = this.getAttribute('pizza-desc') || '';
        const id = this.getAttribute('pizza-id') || '';
        const vegetariana = this.getAttribute('pizza-vegetariana') || '';
        const alergens = this.getAttribute('pizza-alergens') || '';

        this.shadowRoot.innerHTML = `
            <style>
                ${CardComponent.styles} /* Afegim estils del component Card !! */
            </style>
            <div class="card">
                <img src="${img}" alt="Imatge de la pizza" />
                <div class="content">
                    <h3>${nom}</h3>
                    <p>Ingredients: ${desc}</p>
                    <p>Preu: ${preu} €</p>
                    <llista-alergens pizza-alergens="${alergens}"></llista-alergens>
                </div>
                <counter-component></counter-component>
            </div>
        `;

    }
}

customElements.define('pizza-card', PizzaCard);
