// main.js

// Importem els components
import './libcomponents/scaffold_component.js';
import './libcomponents/tab_component.js';
import './components/pizzaCard.js';
import './components/entrantCard.js';

// Importem el servei
import { PizzeriaService } from './services/pizzeriaService.js';
import Carret from './state/Carret.js';
import './components/CarretStatusComponent.js';
import './components/CarretComponent.js';


document.addEventListener('DOMContentLoaded', async () => {

    // Creem el carret
    let carret=new Carret();
    
    try {
        const pizzes = await PizzeriaService.getAllPizzes();
        const entrants = await PizzeriaService.getAllEntrants();
        
        const llista = document.getElementById('llista-pizzes');
        const llista_entrants = document.getElementById('llista-entrants');


        pizzes.forEach(p => {
            const pizzaElement = document.createElement('pizza-card');
            pizzaElement.setAttribute('pizza-id', p.id);
            pizzaElement.setAttribute('pizza-desc', p.desc);
            pizzaElement.setAttribute('pizza-nom', p.nom);
            pizzaElement.setAttribute('pizza-vegetariana', p.vegetariana);
            pizzaElement.setAttribute('pizza-alergens', p.alergens);
            pizzaElement.setAttribute('pizza-preu', p.preu);
            pizzaElement.setAttribute('pizza-img', p.img);

            // Passem la propietat carret i producte a la targeta de la pizza
            pizzaElement.carret=carret;
            pizzaElement.producte=p;

            llista.appendChild(pizzaElement);
        });


        entrants.forEach(p => {
            // console.log("Entrant "+p.nom);
            const entrantElement = document.createElement('entrant-card');
            entrantElement.setAttribute('entrant-id', p.id);
            entrantElement.setAttribute('entrant-nom', p.nom);
            entrantElement.setAttribute('entrant-preu', p.preu);
            entrantElement.setAttribute('entrant-img', p.img);

            // Passem la propietat carret i producte a la targeta de l'entrant
            entrantElement.carret=carret;
            entrantElement.producte=p;
            
        
            llista_entrants.appendChild(entrantElement);
            
        });

        // Localitem el component del carret
        const carretComponent = document.querySelector("carret-component");        
        // I li passem el carret al component perquè puga escoltar events
        carretComponent.setCarret(carret);

        // Fem el mateix amb la pestanya (component CarretStatusComponent)
        const carretStatusComponent = document.querySelector("carret-status-component");        
        // I li passem el carret al component perquè puga escoltar events
        carretStatusComponent.setCarret(carret);
    

    } catch (error) {
        console.error('Error carregant productes:', error);
    }
});
