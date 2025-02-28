// main.js

// Imoportem els components
import './components/pizzaCard.js';

// Importem el servei
import { PizzaService } from './services/pizzaService.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    try {
        const pizzes = await PizzaService.getAllPizzes();
        const llista = document.getElementById('llista-pizzes');

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
    } catch (error) {
        console.error('Error carregant les pizzes:', error);
    }
});