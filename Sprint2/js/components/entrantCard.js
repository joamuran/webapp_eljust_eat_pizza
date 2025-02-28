import './CounterComponent.js';

// Importem el component de base
import { CardComponent } from './CardComponent.js'

    class EntrantCard extends CardComponent {
    constructor() {
        super();
    }

    connectedCallback() {

        // Funció del cicle de vida que s'invoca quan el component s'afig al DOM
        // Aci agafem els atributs

        const id = this.getAttribute('entrant-id') || 'Entrant desconegut';
        const nom = this.getAttribute('entrant-nom') || 'Entrant desconegt';
        const preu = this.getAttribute('entrant-preu') || '0.00';
        const img = this.serverURL+this.getAttribute('entrant-img') || '';

        this.shadowRoot.innerHTML = `
            <style>
                ${CardComponent.styles} /* Afegim estils del component base !! */
            </style>

            <div class="card">
                <img src="${img}" alt="Imatge de l'entrant" />
                <div class="content">
                    <h3>${nom}</h3>
                    <p>Preu: ${preu} €</p>
                </div>
                <counter-component></counter-component>
            </div>
        `;

    }
}

customElements.define('entrant-card', EntrantCard);
