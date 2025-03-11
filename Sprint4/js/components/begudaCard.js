import './CounterComponent.js';

// Importem el component de base
import { CardComponent } from './CardComponent.js'
import '../state/Carret.js';

class BegudaCard extends CardComponent {
    constructor() {
        super();
    }

    connectedCallback() {

        // Funció del cicle de vida que s'invoca quan el component s'afig al DOM
        // Aci agafem els atributs


        const id = this.getAttribute('beguda-id') || 'Beguda desconeguda';
        const nom = this.getAttribute('beguda-nom') || 'Beguda desconeguda';
        const preu = this.getAttribute('beguda-preu') || '0.00';
        const sucre = this.getAttribute('beguda-sucre') || 'false';
        const cafeina = this.getAttribute('beguda-cafeina') || 'false';
        const alcohol = this.getAttribute('beguda-alcohol') || 'false';
        const img = this.serverURL + this.getAttribute('beguda-img') || '/img/genericdrink.png';

        let extres=[];
        if (sucre==='true') extres.push("Sucre"); else extres.push("Sense sucre");
        if (cafeina==='true') extres.push("Cafeïna"); else extres.push("Sense cafeïna");
        if (alcohol==='true') extres.push("Alcohol"); else extres.push("Sense alcohol");
        let extresText=extres.join(" | ");
        

        this.shadowRoot.innerHTML = `
            <style>
                ${CardComponent.styles} /* Afegim estils del component base !! */
            </style>

            <div class="card">
                <img src="${img}" alt="Imatge de la beguda" />
                <div class="content">
                    <h3>${nom}</h3>
                    <p>Preu: ${preu} €</p>
                    <p>${extresText}</p>
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
            () => { this.carret.afegirProducte(this.producte);  },
            () => { this.carret.eliminarProducte(this.producte);  }
        );

    }
}

customElements.define('beguda-card', BegudaCard);
