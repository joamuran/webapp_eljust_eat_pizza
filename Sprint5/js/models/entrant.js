
// amb export "exportem" la classe, per a que es puga vore des de l'exterior

import { Producte } from "./producte.js";

export class Entrant extends Producte{    
    // Constructor amb desestructuració
    constructor({id, nom, img, preu}){
        // Propietats de Producte
        super({id, nom, img, preu})

        // Nota: Entrant no té propietats a banda, pel que podría ser
        // directament un producte. No obstant això, ho mantenim com 
        // a una altra classe per la seua relació amb la resta d'aplicació.
    }

    toString() {
        return `${this.nom} - ${this.preu} €`;
    }
}


