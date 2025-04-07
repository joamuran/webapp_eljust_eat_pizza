// Classe carret

// Aquesta clase s'encarregarà de gestionat el carret de la compra.
// Guardarà una llista de productes, junt amb la quantitat i s'encarregarà
// de calcular els totals

// La classe ha de derivar d'EventTarget per a que puga emetre esdeveniments 
// Així hereta el mètode dispatchEvent, per poder disparar events
class Carret extends EventTarget{ 

    constructor() {
        super(); // Invoquem el constructor de la classe pare
        if (!this.instance) {
            this.instance = this;
            this.elements = []; // Guarda { producte, quantitat }
      }

      return this.instance;    
    }


    static getInstance(){
        return this.instance;
    }
    
  

    notificaCanvis() {
        // Mètode que emet un event personalitzat amb l'estat del carret
        console.log("[Info] Notificant canvis...");
        //  Emetem l'event carretActualitzat
        this.dispatchEvent(new CustomEvent("carretActualitzat", {
            bubbles: true,  // Indiquem que l'event pot "pujar" com una bombolla cap a elements del DOM que estiguen per damunt
            composed: true  // Permet "eixit"  del Shadow DOM
        }));
    }

    afegirProducte(producte) {
        // flag que indica si l'elementa afegir es troba a la llista
        let trobat = false;

        // Recorrem la llista de productes
        for (let i = 0; i < this.elements.length; i++) {
            // Si l'id del producte que anem a afegir és l'element de la llista
            // incrementem la quantitat
            if (this.elements[i].producte.id === producte.id) {
                this.elements[i].quantitat++;
                trobat = true;    // Actualitzem el flag
                // I eixim del buce
                break;
            }
        }

        // Si no s'ha trobat el producte, l'afegim
        if (!trobat) {
            this.elements.push({ producte, quantitat: 1 });
        }
        this.notificaCanvis()
    }

    eliminarProducte(producte) {
        // Busquem el producte i reduim la quantitat.        
        for (let i = 0; i < this.elements.length; i++) {
            // Si trobem el producte...
            if (this.elements[i].producte.id === producte.id) {
                // Si la quantitat és major que 1, la reduim
                if (this.elements[i].quantitat > 1) {
                    this.elements[i].quantitat--;
                } else {
                    // En cas contrari, eliminem l'element de la llista
                    // Per a això fem ús del mètode splice
                    // que elimina l'element del vector i mou la resta perquè no queden espais en blanc
                    this.elements.splice(i, 1); // Eliminem si arriba a 0
                }
                break;
            }
        }
        this.notificaCanvis()
    }

    calcularQuantitatTotal() {
        let total = 0;
        for (let i = 0; i < this.elements.length; i++) {
            total += this.elements[i].quantitat;
        }
        return total;
    }

    calcularPreuTotal() {
        let total = 0;
        for (let i = 0; i < this.elements.length; i++) {
            total += this.elements[i].producte.preu * this.elements[i].quantitat;
        }
        return total;
    }

    buidaCarret(){
        this.elements=[];
        this.notificaCanvis();
    }

    toString() {
        console.log("Carret actual:");
        this.elements.forEach(({ producte, quantitat }) => {
            console.log(`${producte.nom} x ${quantitat} = ${quantitat * producte.preu}€`);
        });
        console.log(`TOTAL: ${this.calcularPreuTotal()}€`);
    }
}

export default Carret;
