// Importem el component de base
import { CardComponent } from './CardComponent.js'

export class CardComandaItem extends CardComponent {
    constructor({items, preu, hora, num}) {
        super();
        this.items=items;
        this.preu=preu;
        this.hora=hora;
        this.num=num;
    }

    connectedCallback() {

        let itemlist="";
        this.items.forEach(({ producte, quantitat }) => {
            itemlist+=`${producte.nom} x ${quantitat} = ${quantitat * producte.preu}€<br/>`;
        });

        this.shadowRoot.innerHTML = `
            <style>
                ${CardComponent.styles} /* Afegim estils del component Card !! */
            </style>
            <div class="card">
                <div class="content">
                    <h3>Comanda ${this.num}. Hora: ${this.hora}</h3>
                    <p>Preu: ${this.preu} €</p>
                    <div>${itemlist}</div>
                </div>
            </div>
        `;

    }
}

customElements.define('comanda-item', CardComandaItem);
