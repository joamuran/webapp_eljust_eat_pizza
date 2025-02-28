// components/PizzaCard.js
import './LlistaAlergens.js';

    class PizzaCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.serverURL="https://pizza-rest-server-production.up.railway.app/";
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
                .card {
                    display: flex;
                    align-items: center;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    padding: 20px;
                    margin: 10px;
                    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                    background-color: #fff;
                    gap: 20px;
                }

                .card img {
                    width: 100px;
                    height: 100px;
                    border-radius: 10px;
                    object-fit: cover;
                    flex-shrink: 0;
                }

                .card .content {
                    flex: 1;
                }

                .card .content h3 {
                    margin: 0 0 10px 0;
                    color: #333;
                }

                .card .content p {
                    margin: 5px 0;
                    color: #555;
                }
            </style>
            <div class="card">
                <img src="${img}" alt="Imatge de la pizza" />
                <div class="content">
                    <h3>${nom}</h3>
                    <p>Ingredients: ${desc}</p>
                    <p>Preu: ${preu} €</p>
                    <llista-alergens pizza-alergens="${alergens}"></llista-alergens>
                </div>
            </div>
        `;

    }
}

customElements.define('pizza-card', PizzaCard);
