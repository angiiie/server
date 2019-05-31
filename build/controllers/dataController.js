"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class dataController {
    conseguir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query('SELECT nombre FROM configuracion.hospital');
            res.json(data);
        });
    }
    creararea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            const area = req.body.area;
            const camas = req.body.camas;
            // Json 
            const data = {
                nombre: nombre,
                camasasignadas: camas,
                area: area,
            };
            yield database_1.default.query('INSERT INTO configuracion.areahospital set ?', data);
            res.json("Agregado");
        });
    }
    crearcama(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            const area = req.body.area;
            const idcamas = req.body.idcama;
            const ubicacion = req.body.ubicacion;
            const estado = req.body.estado;
            yield database_1.default.query("INSERT INTO configuracion.camas (id, areaasociada, identificacioncama, ubicacion,estado) " +
                "SELECT configuracion.hospital.idhospital, '" + area + "', '" + idcamas + "', '" + ubicacion + "','" + estado + "' " +
                "FROM configuracion.hospital " +
                "WHERE configuracion.hospital.nombre = " + "'" + nombre + "'" + "");
            res.json("Agregado");
        });
    }
    crearpaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const hospital = req.body.hospital.nombre;
            const nombre = req.body.nombre;
            const cedula = req.body.cedula;
            const eps = req.body.ideps;
            const fecha1 = req.body.fechai;
            const fecha2 = req.body.fechas;
            const idcama = req.body.idcama;
            const alta = req.body.alta;
            // Json 
            const data = {
                hospital: hospital,
                nombre: nombre,
                cedula: cedula,
                eps: eps,
                fechaingreso: fecha1,
                fechasalida: fecha2,
                camaasignada: idcama,
                usuarioalta: alta
            };
            yield database_1.default.query('INSERT INTO configuracion.paciente set ?', data);
            yield database_1.default.query("UPDATE configuracion.camas set estado='Ocupado' WHERE identificacioncama = ?", idcama);
            res.json("Agregado");
        });
    }
    actualizarpaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cedula = req.body.cedula;
            const eps = req.body.ideps;
            const fecha2 = req.body.fechas;
            const idcama = req.body.idcama;
            const alta = req.body.alta;
            // Json 
            const data = {
                eps: eps,
                fechasalida: fecha2,
                camaasignada: idcama,
                usuarioalta: alta
            };
            yield database_1.default.query('UPDATE configuracion.paciente set ? WHERE cedula = ?', [data, cedula]);
            if (alta == 1) {
                yield database_1.default.query("UPDATE configuracion.camas set estado='Libre' WHERE identificacioncama = ?", idcama);
            }
            res.json("Agregado");
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            const direccion = req.body.direccion;
            const ciudad = req.body.ciudad;
            const departamento = req.body.departamento;
            const latitud = req.body.latitud;
            const longitud = req.body.longitud;
            const eps = req.body.ideps;
            const nivel = req.body.nivel;
            const urgencia = req.body.urgencia;
            const uci = req.body.uci;
            const maternidad = req.body.maternidad;
            const cirugia = req.body.cirugia;
            // Json 
            const data = {
                nombre: nombre,
                direccion: direccion,
                ciudad: ciudad,
                departamento: departamento,
                latitud: latitud,
                longitud: longitud,
                ideps: eps,
                nivel: nivel,
                urgencia: urgencia,
                uci: uci,
                maternidad: maternidad,
                cirugia: cirugia
            };
            yield database_1.default.query('INSERT INTO configuracion.hospital set ?', data);
            res.json("Agregado");
        });
    }
    escriturahospital(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            const identificacioncama = req.body.identificacioncama;
            const estado = req.body.estado;
            const area = req.body.area;
            // Json " WHERE d.nombre = "+"'"+nombre+"'"+"") " +
            const data1 = {};
            const data = yield database_1.default.query("SELECT t.idtabla, t.nombrehospital, c.id, a.nombre, c.identificacioncama, c.estado, r.area " +
                "From  configuracion.camas as c " +
                "inner JOIN configuracion.tabla as t ON t.idtabla = c.id " +
                "INNER JOIN configuracion.areahospital as a ON a.nombre = t.nombrehospital " +
                "JOIN configuracion.relacion as r ON r.id = c.areaasociada " +
                "WHERE a.nombre = " + "'" + nombre + "'" + "  " +
                "group by c.identificacioncama ");
            res.json(data);
        });
    }
    getcama(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            const identificacioncama = req.body.identificacioncama;
            const estado = req.body.estado;
            const data = yield database_1.default.query(" SELECT p.nombre, c.identificacioncama, c.estado, p.hospital " +
                " FROM configuracion.paciente as p " +
                " JOIN  configuracion.camas as c ON c.identificacioncama = p.camaasignada " +
                " WHERE p.hospital = " + "'" + nombre + "'" + "");
            res.json(data);
        });
    }
    olatlon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            const data = yield database_1.default.query("SELECT c.latitud,c.longitud " +
                "FROM configuracion.hospital as c " +
                "WHERE c.nombre = " + "'" + nombre + "' " +
                "LIMIT 1");
            res.json(data);
        });
    }
    multi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            const data = yield database_1.default.query("SELECT c.latitud,c.longitud " +
                "FROM configuracion.hospital as c ");
            res.json(data);
        });
    }
    reserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            const cedula = req.body.cedula;
            const eps = req.body.ideps;
            const idcama = req.body.idcama;
            const area = req.body.area;
            // Json 
            const data = {
                nombre: nombre,
                cedula: cedula,
                eps: eps,
                camaasignada: idcama,
            };
            const data2 = {
                //area de hospital
                areaasociada: area,
                estado: "ocupado",
                identificacioncama: idcama,
            };
            //arreglar
            //await pool.query('INSERT INTO configuracion.paciente set ?',data);
            //await pool.query('INSERT INTO configuracion.camas set ?',data2);
            //este resultado se inserta en las otras tablas 
            res.json("Agregado");
        });
    }
    reservados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            const identificacioncama = req.body.identificacioncama;
            const latitud = req.body.latitud;
            const longitud = req.body.longitud;
            //falta la coordenada ingresada "+"'"+latitud+"' "+
            //"+"'"+longitud+"' "+
            const data = yield database_1.default.query("SELECT c.estado, c.identificacioncama, c.id, h.nombre, h.latitud, h.longitud, ( 6371 * acos(cos(radians(" + "'" + latitud + "'" + ")) * cos(radians(h.latitud)) * cos(radians(h.longitud) - radians(" + "'" + longitud + "'" + ")) + sin(radians(" + "'" + latitud + "'" + ")) * sin(radians(h.latitud)))) AS distance " +
                "from configuracion.camas as c " +
                "JOIN configuracion.tabla as t ON t.idtabla = c.id " +
                "JOIN configuracion.hospital as h ON h.nombre = t.nombrehospital " +
                "WHERE c.estado = 'Libre' " +
                "ORDER BY distance ASC");
            res.json(data);
        });
    }
    validar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            const eps = req.body.eps;
            const cedula = req.body.cedula;
            const camaasignada = req.body.camaasignada;
            // Json 
            const data2 = {
                nombre: nombre,
                cedula: cedula,
                eps: eps,
                camaasignada: camaasignada,
            };
            //const data = await pool.query("INSERT INTO configuracion.paciente  set ? ',"+"'"+data2+"'"+""+
            //" DELETE FROM configuracion.paciente "+
            //" WHERE EXISTS ( SELECT * FROM moduloEPS.usuarios as u WHERE u.nombre="+"'"+nombre+"'"+"  AND u.estado='inactivo') AND nombre="+"'"+nombre+"'"+" AND cedula="+"'"+cedula+"'"+" "
            //);
            //res.json(data);
        });
    }
}
exports.datacontroller = new dataController();
