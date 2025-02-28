
// amb export "exportem" la classe, per a que es puga vore des de l'exterior

export class Pizza{
    constructor(jsonPizza){
        this.id=jsonPizza.id;
        this.nom=jsonPizza.nom;
        this.desc=jsonPizza.desc;
        this.vegetariana=jsonPizza.vegetariana;
        this.alergens=jsonPizza.alergens;
        this.img=jsonPizza.img;
        this.preu=jsonPizza.preu;
    }

    toString() {
        return `${this.nom} - ${this.preu} €`;
    }
}


