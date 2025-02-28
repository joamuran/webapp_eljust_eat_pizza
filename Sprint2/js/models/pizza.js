
// amb export "exportem" la classe, per a que es puga vore des de l'exterior

import { Producte } from "./producte.js";

export class Pizza extends Producte{
    // Arguments al constructor amb desestructuració d'objectes: {}
    // D'aquesta manera veiem més clar quins són els components dels objectes que proporcionem
    // Això admet també proporcionar un JSON, tal i com estava!
    constructor({id, nom, desc, vegetariana, alergens, img, preu}){
        // Propietats de Producte
        super({id, nom, img, preu})

        // Propietats addicionals de Pizza
        this.desc=desc;
        this.vegetariana=vegetariana;
        this.alergens=alergens;
    }

    toString() {
        return `${this.nom} - ${this.preu} €`;
    }
}


