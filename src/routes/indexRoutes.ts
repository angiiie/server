/* Socket configuration */ 
import { Router } from 'express';
import { datacontroller } from '../controllers/dataController';

class indexRoutes {

    public router: Router = Router(); 
    

    constructor() {

        this.config();
        
    }
    
    config(): void{
        this.router.get('/api/hospital',datacontroller.conseguir); 
        this.router.post('/api/hospital',datacontroller.crear);
        this.router.post('/api/hospital/area',datacontroller.creararea); 
        this.router.post('/api/hospital/camas',datacontroller.crearcama);
        this.router.post('/api/hospital/paciente',datacontroller.crearpaciente);  
        this.router.put('/api/hospital/paciente',datacontroller.actualizarpaciente);
        this.router.post('/api/hospital/visualizacion',datacontroller.escriturahospital);
        this.router.post('/api/hospital/visualizacion/cama',datacontroller.getcama);
        this.router.post('/api/hospital/visualizacion/coord',datacontroller.olatlon);
        this.router.post('/api/hospital/visualizacion/coord/multi',datacontroller.multi);
        this.router.post('/api/hospital/visualizacion/reserva',datacontroller.reserva);
        this.router.post('/api/hospital/visualizacion/reservados',datacontroller.reservados);
        this.router.post('/api/hospital/visualizacion/validar',datacontroller.validar);
      
    }
    


}

const indexroutes = new indexRoutes();
export default indexroutes.router;