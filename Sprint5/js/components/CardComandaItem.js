// Importem el component de base
import { CardComponent } from './CardComponent.js'
import {TiquetService} from '../services/ticketService.js'

export class CardComandaItem extends CardComponent {
    constructor({ items, preu, hora, num }) {
        super();
        this.items = items;
        this.preu = preu;
        this.hora = hora;
        this.num = num;
    }

    connectedCallback() {

        let itemlist = "";
        this.items.forEach(({ producte, quantitat }) => {
            itemlist += `${producte.nom} x ${quantitat} = ${quantitat * producte.preu}€<br/>`;
        });

        this.shadowRoot.innerHTML = `
            <style>
                ${CardComponent.styles} /* Afegim estils del component Card !! */
                .content{
                    display: flex;              /* Configurar Flexbox */
                    justify-content: space-between; /* Alinea els elements: espai entre l'esquerra i la dreta */
                    align-items: center;        /* Centra verticalment els elements */
                }

                .left-content {
                    flex-grow: 1;               /* Permet que la part esquerra ocupi l'espai disponible */
                }

                .right-button {
                    margin-left: 10px; /* Afegir una mica de marge entre el botó i el contingut */
                    padding: 8px 16px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .right-button:hover {
                    background-color: #45a049;
                }
            </style>
                <div class="content">
                    <div class="left-content">
                        <h3>Comanda ${this.num}. Hora: ${this.hora}</h3>
                        <p>Preu: ${this.preu} €</p>
                        <div>${itemlist}</div>
                    </div>
                    <button class="right-button" id="print_ticket">Imprimir tiquet</button>
                </div>
        `;

        // Assignem l'esdeveniment al botó
        this.shadowRoot.getElementById('print_ticket').addEventListener('click', () => {
            if (this.printTicket) this.printTicket();

        });

    }

    printTicket(){


        let productes=[];
        this.items.forEach(({ producte, quantitat }) => {
            productes.push({nom: producte.nom, quantitat: quantitat, preu: quantitat * producte.preu});
        });

        let data={
            items: productes, 
            preu: this.preu,
            hora: this.hora,
            num: this.num

        }
        TiquetService.generateTiquet(data);
        
    }
}

customElements.define('comanda-item', CardComandaItem);
