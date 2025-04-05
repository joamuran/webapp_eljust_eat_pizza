export class PizzeriaRepository {

    // Com que js no suporta "private", hem de definir
    // el patró singleton en el propi constructor.
    constructor(service){
        if (!this.instance) {
            this.instance = this;
            this.service=service;
      }
      return this.instance;

    }
    
    async getAllPizzes() {
        return await this.service.getAllPizzes();
    }


    async getAllEntrants() {
        return await this.service.getAllEntrants();
    }


    async getAllDrinks() {
        return await this.service.getAllDrinks();
    }

    async sendOrder(comanda) {
        return await this.service.sendOrder(comanda); 
    }
}