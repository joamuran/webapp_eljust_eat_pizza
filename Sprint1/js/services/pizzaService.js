import  { Pizza } from '../models/pizza.js';


export class PizzaService {
    static API_URL = 'https://pizza-rest-server-production.up.railway.app/api/pizzeria/pizzes';

    
    static async getAllPizzes() {
        const resposta = await fetch(this.API_URL);
        
        if (!resposta.ok) throw new Error('No s\'han pogut carregar les pizzes');
        const dadesPG = await resposta.json();
        const dades=dadesPG.records;

        // Llista de pizzes
        const pizzes = [];

        // Recorrem les dades i generem la llista de pizzes
        for (let i = 0; i < dades.length; i++) {
            const pizza = new Pizza(dades[i]);
            pizzes.push(pizza);
        }

        return pizzes;

        // Nota: Aquest últin bucle es podria haver simplificat amb 
        //       una funció de mapat: return dades.map(d => new Pizza(d));
        
    }
}