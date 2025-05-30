// main.js

// Importem els components
import './libcomponents/scaffold_component.js';
import './libcomponents/tab_component.js';
import './components/pizzaCard.js';
import './components/entrantCard.js';
import './components/begudaCard.js';

// Importem el servei
import { PizzeriaService } from './services/pizzeriaService.js';
import Carret from './state/Carret.js';
import './components/CarretStatusComponent.js';
import './components/CarretComponent.js';
import { PizzeriaRepository } from './repository/pizzeriaRepository.js';


document.addEventListener('DOMContentLoaded', async () => {

    // Iniciaitzem el repositori amb la classe de servei que volem
    let pizzeriaRepository=new PizzeriaRepository(PizzeriaService);
    
    // Creem el carret
    let carret=new Carret();
    
    try {
        // Fem ús del repository per obtenir les dades
        const pizzes = await pizzeriaRepository.getAllPizzes();
        const entrants = await pizzeriaRepository.getAllEntrants();
        const beguda = await pizzeriaRepository.getAllDrinks();
        
        const llista = document.getElementById('llista-pizzes');
        const llista_entrants = document.getElementById('llista-entrants');
        const llista_beguda=document.getElementById('llista-begudes');


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


        
        beguda.forEach(p => {
            console.log("Beguda "+p.nom);
            const begudaElement = document.createElement('beguda-card');
            begudaElement.setAttribute('beguda-id', p.id);
            begudaElement.setAttribute('beguda-nom', p.nom);
            begudaElement.setAttribute('beguda-preu', p.preu);
            begudaElement.setAttribute('beguda-sucre', p.sucre);
            begudaElement.setAttribute('beguda-cafeina', p.cafeina);
            begudaElement.setAttribute('beguda-alcohol', p.alcohol);
            begudaElement.setAttribute('beguda-img', p.img);
            
            // Passem la propietat carret i producte a la targeta de la beguda
            begudaElement.carret=carret;
            begudaElement.producte=p;
            
        
            llista_beguda.appendChild(begudaElement);
            
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
