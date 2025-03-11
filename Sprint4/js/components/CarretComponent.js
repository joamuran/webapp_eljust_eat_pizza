// Importem el component de base
import { BaseComponent } from '../libcomponents/base_component.js';
import { PizzeriaService } from '../services/pizzeriaService.js';
import { ShowMyAlert } from '../libcomponents/my_alert.js';
import { Comanda } from '../models/comanda.js';
import { CardComandaItem } from '../components/CardComandaItem.js';

class CarretComponent extends BaseComponent {
    constructor() {
        super();
        this.shadowRoot.innerHTML = `
            <style>
                ${BaseComponent.styles} /* Afegim estils del component base !! */
                :host {
                    display: block;
                    padding: 10px;
                }
                .carret {
                    border: 1px solid #ddd;
                    padding: 10px;
                    border-radius: 5px;
                    background: white;
                }
                .carret h3 {
                    margin: 0 0 10px 0;
                }
                .producte {
                    display: flex;
                    justify-content: space-between;
                    padding: 5px 0;
                    border-bottom: 1px solid #eee;
                }
                .producte:last-child {
                    border-bottom: none;
                }
                /*.borrar {
                    color: red;
                    border: none;
                    padding: 5px;
                    cursor: pointer;
                    border-radius: 5px;
                }*/

                .borrar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: none;
                    background-color:red;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.3s;
                }

                .btn {
                    border: none;
                    background-color:var(--primary-color);
                    color: white;
                    padding:1em;
                    font-size: 24px;
                    cursor: pointer;
                    
                }

                .btn:hover {
                    background-color: var(--on-primary-color);
                }
            </style>
            <div class="carret">
                <h3>Carret de la compra</h3>
                <div id="llista-productes"></div>
                <p><strong>Total: <span id="total-preu">0.00</span>€</strong></p>
                <button class="btn" id="sendOrder">Envia la comanda</button>
            </div>
        `;

        this.carret = null;
    }

    setCarret(carret) {
        if (!carret) return;
        this.carret = carret;
        this.update();
        // Escoltem l'event carretActualitzat en el carret
        this.carret.addEventListener("carretActualitzat", () => this.update());

        this.shadowRoot.querySelector("#sendOrder").addEventListener("click", async () => {
            console.log(this.carret.elements);
            let resposta = await PizzeriaService.sendOrder(this.carret.elements);
            if (resposta.confirmed) {
                let msg="Ordre confirmada<br/>Comanda nº: "+resposta.order+"<br/>Hora prevista: "+resposta.time;
                ShowMyAlert("success", msg)

                // Creem una nova comanda pe a l'històric
                let com=new Comanda(this.carret.elements, this.carret.calcularPreuTotal(), resposta.time, resposta.order)

                // Generem la targeta corresponent            
                let comandaItem=new CardComandaItem(com);
                document.getElementById("llista-comandes").append(comandaItem);

                // Una vegada afegit, buidem el carret
                this.carret.buidaCarret();
                
            }
            else ShowMyAlert("error", resposta.message)
        });

    }


    update() {
        console.log("Event capturat, actualitzant");
        if (!this.carret) return;
        const llista = this.shadowRoot.querySelector("#llista-productes");
        llista.innerHTML = "";

        this.carret.elements.forEach(({ producte, quantitat }) => {
            const div = document.createElement("div");
            div.classList.add("producte");
            div.innerHTML = `
                <span>${producte.nom} x ${quantitat} - ${(producte.preu * quantitat).toFixed(2)}€</span>
                <button class="borrar">-</button>
            `;

            div.querySelector(".borrar").addEventListener("click", () => {
                this.carret.eliminarProducte(producte);
                this.update();
            });

            llista.appendChild(div);
        });

        this.shadowRoot.querySelector("#total-preu").textContent = this.carret.calcularPreuTotal().toFixed(2);
    }
}

customElements.define("carret-component", CarretComponent);
