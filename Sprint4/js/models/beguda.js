
// amb export "exportem" la classe, per a que es puga vore des de l'exterior

import { Producte } from "./producte.js";

export class Beguda extends Producte {
    // Arguments al constructor amb desestructuració d'objectes: {}
    // D'aquesta manera veiem més clar quins són els components dels objectes que proporcionem
    // Això admet també proporcionar un JSON, tal i com estava!

    constructor({ id, nom, preu, sucre, cafeina, alcohol, img = "/img/genericdrink.png" }) {
        // Propietats de Producte
        super({ id, nom, img, preu })

        // Propietats addicionals de Beguda
        this.sucre = sucre;
        this.cafeina = cafeina;
        this.alcohol = alcohol;
    }


    toString() {
        return `${this.nom} - ${this.preu} €`;
    }
}


