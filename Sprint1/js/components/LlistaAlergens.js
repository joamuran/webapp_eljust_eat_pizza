// components/LlistaAlergens.js

class LlistaAlergens extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const alergens = this.getAttribute('pizza-alergens') || '';
        let llista="";

        for (let i of alergens.split(",")){
            console.log(i);
            llista+=`<img src="../img/${i}.png"></img>`
        }

        this.shadowRoot.innerHTML = `
            <style>
                .alergen {
                    display: flex;
                    align-items: left;
                }

                .alergen img {
                    width: 50px;
                    height: 50px;
                    margin: 3px;
                }
            </style>
            <div class="alergen">
                ${llista}
            </div>
        `;

    }
}

customElements.define('llista-alergens', LlistaAlergens);
