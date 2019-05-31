"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Socket configuration */
const express_1 = require("express");
const dataController_1 = require("../controllers/dataController");
class indexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/api/hospital', dataController_1.datacontroller.conseguir);
        this.router.post('/api/hospital', dataController_1.datacontroller.crear);
        this.router.post('/api/hospital/area', dataController_1.datacontroller.creararea);
        this.router.post('/api/hospital/camas', dataController_1.datacontroller.crearcama);
        this.router.post('/api/hospital/paciente', dataController_1.datacontroller.crearpaciente);
        this.router.put('/api/hospital/paciente', dataController_1.datacontroller.actualizarpaciente);
        this.router.post('/api/hospital/visualizacion', dataController_1.datacontroller.escriturahospital);
        this.router.post('/api/hospital/visualizacion/cama', dataController_1.datacontroller.getcama);
        this.router.post('/api/hospital/visualizacion/coord', dataController_1.datacontroller.olatlon);
        this.router.post('/api/hospital/visualizacion/coord/multi', dataController_1.datacontroller.multi);
        this.router.post('/api/hospital/visualizacion/reserva', dataController_1.datacontroller.reserva);
        this.router.post('/api/hospital/visualizacion/reservados', dataController_1.datacontroller.reservados);
        this.router.post('/api/hospital/visualizacion/validar', dataController_1.datacontroller.validar);
    }
}
const indexroutes = new indexRoutes();
exports.default = indexroutes.router;
