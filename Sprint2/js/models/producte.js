
// amb export "exportem" la classe, per a que es puga vore des de l'exterior

export class Producte{
    // Constructor amb desestructuració
    constructor({id, nom, img, preu}){
        this.id=id;
        this.nom=nom;        
        this.img=img;
        this.preu=preu;
    }

    toString() {
        return `${this.nom} - ${this.preu} €`;
    }
}


