import { Entrant } from '../models/entrant.js';
import  { Pizza } from '../models/pizza.js';


export class PizzeriaService {
    static API_URL = 'https://pizza-rest-server-production.up.railway.app/api/pizzeria';

    
    static async getAllPizzes() {
        const resposta = await fetch(`${this.API_URL}/pizzes`);
        
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


    static async getAllEntrants() {
        const resposta = await fetch(`${this.API_URL}/entrants`);
        
        if (!resposta.ok) throw new Error('No s\'han pogut carregar els entrants');
        const dadesPG = await resposta.json();
        const dades=dadesPG.records;

        // Llista de pizzes
        const entrants = [];

        // Recorrem les dades i generem la llista de pizzes
        for (let i = 0; i < dades.length; i++) {
            const entrant = new Entrant(dades[i]);
            entrants.push(entrant);
        }

        return entrants;

        // Nota: Aquest últin bucle es podria haver simplificat amb 
        //       una funció de mapat: return dades.map(d => new Pizza(d));
        
    }
}