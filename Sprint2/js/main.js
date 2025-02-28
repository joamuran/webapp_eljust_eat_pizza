// main.js

// Importem els components
import './libcomponents/scaffold_component.js';
import './libcomponents/tab_component.js';
import './components/pizzaCard.js';
import './components/entrantCard.js';

// Importem el servei
import { PizzeriaService } from './services/pizzeriaService.js';

document.addEventListener('DOMContentLoaded', async () => {
    
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

            llista.appendChild(pizzaElement);
        });


        entrants.forEach(p => {
            console.log("Entrant "+p.nom);
            const entrantElement = document.createElement('entrant-card');
            entrantElement.setAttribute('entrant-id', p.id);
            entrantElement.setAttribute('entrant-nom', p.nom);
            entrantElement.setAttribute('entrant-preu', p.preu);
            entrantElement.setAttribute('entrant-img', p.img);

            llista_entrants.appendChild(entrantElement);
            
        });

    } catch (error) {
        console.error('Error carregant productes:', error);
    }
});
