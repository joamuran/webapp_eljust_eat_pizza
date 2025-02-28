import './CounterComponent.js';

// Importem el component de base
import { CardComponent } from './CardComponent.js'
import '../state/Carret.js';

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
        const img = this.serverURL + this.getAttribute('entrant-img') || '';

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

        // Una vegada afegit el component, establim els callbacks
        if (!this.carret || !this.producte) {
            // Comprovem primer si el carret i el producte s'han proporcionat
            console.error("Error: No s'ha passat el carret o producte correctament!");
            return;
        }

        const counter = this.shadowRoot.querySelector("counter-component");
        // NOU: PER COMENTAR
        counter.setProducte(this.producte, this.carret);

        counter.setCallbacks(
            () => { this.carret.afegirProducte(this.producte); this.carret.toString(); },
            () => { this.carret.eliminarProducte(this.producte); this.carret.toString(); }
        );

    }
}

customElements.define('entrant-card', EntrantCard);
