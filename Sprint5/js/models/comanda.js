import { Entrant } from "./entrant.js";
import { Beguda } from "./beguda.js";
import { Pizza } from "./pizza.js";

export class Comanda {    
    // Constructor amb desestructuració
    constructor(items, preu, hora, num){
        // Propietats de Producte
        this.items=items;
        this.preu=preu;
        this.hora=hora;
        this.num=num;

    }

    toString() {
        return `
        ${this.items}\n
        ${this.preu}\n;
        ${this.hora}\m;
        ${this.num};
        `
    }
}


