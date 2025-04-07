// Classe d'Infraestructura/Servei per imprimir els tiquets

export class TiquetService {
    static async generateTiquet(tiquetData) {
        try {
            // console.log(tiquetData); // per a depuració
            const response = await fetch('http://127.0.0.1:8000/print', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: tiquetData })
            });

            if (!response.ok) {
                throw new Error('Error generant el tiquet');
            }

            // Retorna el PDF com a blob
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            // Creem un enllaç i el descarreguem
            const a = document.createElement('a');
            a.href = url;
            a.download = "tiquet.pdf"; 
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            

            return;




        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}