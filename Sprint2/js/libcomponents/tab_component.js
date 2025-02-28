import { BaseComponent } from './base_component.js'


export class TabComponent extends BaseComponent {

    constructor() {
        super(); // Cridem al constructor de la classe base, sense generar el shadow dom
    }

    connectedCallback() {
        // pintem el contingut el contingut
        this.render();
        // I associem les pestanyes als tabs
        this.setupTabs();
    }

    setupTabs() {
        // Busquem els elements de classe tab dins el shadowRoot
        const tabs = this.querySelectorAll('.tab');
        // I tots els divs que hi ha al contingut, dins l'slot
        const contents = this.shadowRoot.querySelector('slot[name="contents"]')
            ?.assignedElements()
            .flatMap(slot => Array.from(slot.children)) || [];


        // Amaguem tot inicialment
        contents.forEach((c, index) => {
            c.style.display = index === 0 ? 'block' : 'none';
        });

        // I associem l'event clic en cada tab a que es mostre el contingut corresponent
        tabs.forEach((tab, index) => {

            tab.addEventListener('click', (event) => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.style.display = 'none');

                tab.classList.add('active');

                if (contents[index]) {
                    contents[index].style.display = 'block';
                }
            });
        });

        tabs[0]?.classList.add('active');   // Operador ?. -> Per accedir de manera segura a nuls
        if (contents[0]) {
            contents[0].style.display = 'block';
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${BaseComponent.styles}
                .tabs {
                    display: flex;
                    border-bottom: 2px solid var(--primary-color);
                }

               ::slotted(.tab) {  
                    padding: 10px 20px;
                    cursor: pointer;
                    border: none;
                    background: transparent;
                    color: var(--text-color);
                    font-size: 1.4em;
                }

                ::slotted(.tab.active) {  
                    background: var(--primary-color);
                    color: white;
                }

                ::slotted(.content > div ) {  
                    display: none;
                    padding: 20px;
                    border: 1px solid var(--primary-color);
                }
            </style>
            <div class="tabs">
                <slot name="tabs"></slot>
            </div>
            <div class="content">
                <slot name="contents"></slot>
            </div>
        `;
    }
}

customElements.define('tab-component', TabComponent);
