import { Request, Response } from 'express';

import pool from '../database';
import { isDeepStrictEqual } from 'util';
class dataController{

    public async conseguir (req: Request,res: Response){
        const data = await pool.query('SELECT nombre FROM configuracion.hospital');
       
        res.json(data);

    }
    public async creararea (req: Request,res: Response){
        const nombre=req.body.nombre;
        const area=req.body.area;
        const camas=req.body.camas;
         // Json 
         const data = {
            nombre: nombre,
            camasasignadas:camas,
            area: area,
            
        }
        await pool.query('INSERT INTO configuracion.areahospital set ?',data);
        res.json("Agregado");
    }

    public async crearcama (req: Request,res: Response){
        const nombre=req.body.nombre;
        const area=req.body.area;
        const idcamas=req.body.idcama;
        const ubicacion=req.body.ubicacion;
        const estado=req.body.estado;
         
        await pool.query("INSERT INTO configuracion.camas (id, areaasociada, identificacioncama, ubicacion,estado) "+
        "SELECT configuracion.hospital.idhospital, '"+area+"', '"+idcamas+"', '"+ubicacion+"','"+estado+"' "+
        "FROM configuracion.hospital "+
        "WHERE configuracion.hospital.nombre = "+"'"+nombre+"'"+"")
        res.json("Agregado");
    }

    public async crearpaciente (req: Request,res: Response){
        const hospital=req.body.hospital.nombre;
        const nombre=req.body.nombre;
        const cedula=req.body.cedula;
        const eps=req.body.ideps;
        const fecha1=req.body.fechai;
        const fecha2=req.body.fechas;
        const idcama=req.body.idcama;
        const alta=req.body.alta;

         // Json 
         const data = {
            hospital:hospital,
            nombre: nombre,
            cedula:cedula,
            eps:eps,
            fechaingreso:fecha1,
            fechasalida:fecha2,
            camaasignada:idcama,
            usuarioalta:alta
        }
        await pool.query('INSERT INTO configuracion.paciente set ?',data);
        await pool.query("UPDATE configuracion.camas set estado='Ocupado' WHERE identificacioncama = ?",idcama);
        res.json("Agregado");
    }

    public async actualizarpaciente (req: Request,res: Response){
        const cedula=req.body.cedula;
        const eps=req.body.ideps;
        const fecha2=req.body.fechas;
        const idcama=req.body.idcama;
        const alta=req.body.alta;

         // Json 
         const data = {
            eps:eps,
            fechasalida:fecha2,
            camaasignada:idcama,
            usuarioalta:alta
        }
        await pool.query('UPDATE configuracion.paciente set ? WHERE cedula = ?',[data,cedula]);
        if (alta==1){
            await pool.query("UPDATE configuracion.camas set estado='Libre' WHERE identificacioncama = ?",idcama);
        }
        res.json("Agregado");
    }

    public async crear (req: Request,res: Response){

        const nombre=req.body.nombre;
        const direccion=req.body.direccion;
        const ciudad=req.body.ciudad;
        const departamento=req.body.departamento;
        const latitud=req.body.latitud;
        const longitud=req.body.longitud;
        const eps=req.body.ideps;
        const nivel=req.body.nivel;
        
        const urgencia=req.body.urgencia;
        const uci=req.body.uci;
        const maternidad=req.body.maternidad;
        const cirugia=req.body.cirugia;
      
        // Json 
        const data = {
            nombre: nombre,
            direccion: direccion,
            ciudad: ciudad,
            departamento: departamento,
            latitud:latitud,
            longitud:longitud,
            ideps:eps,
            nivel:nivel,
            urgencia:urgencia,
            uci:uci,
            maternidad:maternidad,
            cirugia:cirugia
        }
        
        await pool.query('INSERT INTO configuracion.hospital set ?',data);
        res.json("Agregado");
        
    
    }
    public async escriturahospital (req: Request,res: Response){
        const nombre = req.body.nombre;
        const identificacioncama = req.body.identificacioncama;
        const estado = req.body.estado;
        const area = req.body.area;

    // Json " WHERE d.nombre = "+"'"+nombre+"'"+"") " +
    const data1 = {
    }
        const data = await pool.query("SELECT t.idtabla, t.nombrehospital, c.id, a.nombre, c.identificacioncama, c.estado, r.area " +
            "From  configuracion.camas as c " +
             "inner JOIN configuracion.tabla as t ON t.idtabla = c.id " +
             "INNER JOIN configuracion.areahospital as a ON a.nombre = t.nombrehospital " +
             "JOIN configuracion.relacion as r ON r.id = c.areaasociada "+
            "WHERE a.nombre = "+"'"+nombre+"'"+"  " +
            "group by c.identificacioncama ")

      res.json(data);
       
    }
    public async getcama (req: Request,res: Response){
        const nombre = req.body.nombre;
        const identificacioncama = req.body.identificacioncama;
        const estado = req.body.estado;
        
        const data = await pool.query(" SELECT p.nombre, c.identificacioncama, c.estado, p.hospital " +
        " FROM configuracion.paciente as p " +
        " JOIN  configuracion.camas as c ON c.identificacioncama = p.camaasignada " +
        " WHERE p.hospital = "+"'"+nombre+"'"+"")

      res.json(data);
       
    }

    public async olatlon (req: Request, res: Response){
        const nombre = req.body.nombre;

        const data = await pool.query("SELECT c.latitud,c.longitud "+
        "FROM configuracion.hospital as c "+
        "WHERE c.nombre = "+"'"+nombre+"' "+
        "LIMIT 1")

        res.json(data);
        
    }

    public async multi (req: Request, res: Response){
        const nombre = req.body.nombre;

        const data = await pool.query("SELECT c.latitud,c.longitud "+
        "FROM configuracion.hospital as c ")

        res.json(data);
        
    }
    public async reserva (req: Request,res: Response){
        const nombre=req.body.nombre;
        const cedula=req.body.cedula;
        const eps=req.body.ideps;
        const idcama=req.body.idcama;
        const area=req.body.area;
        
         // Json 
         const data = {
            nombre: nombre,
            cedula:cedula,
            eps:eps,
            camaasignada:idcama,
        }

        const data2 = {
            //area de hospital
            areaasociada:area,
            estado:"ocupado",
            identificacioncama:idcama,
        }

        //arreglar
        //await pool.query('INSERT INTO configuracion.paciente set ?',data);
        //await pool.query('INSERT INTO configuracion.camas set ?',data2);
        //este resultado se inserta en las otras tablas 
        res.json("Agregado");
    }

    public async reservados (req: Request,res: Response){
        const nombre=req.body.nombre;
        const identificacioncama = req.body.identificacioncama;
        const latitud = req.body.latitud;
        const longitud  = req.body.longitud;

        //falta la coordenada ingresada "+"'"+latitud+"' "+
        //"+"'"+longitud+"' "+
        const data = await pool.query("SELECT c.estado, c.identificacioncama, c.id, h.nombre, h.latitud, h.longitud, ( 6371 * acos(cos(radians("+"'"+latitud+"'"+")) * cos(radians(h.latitud)) * cos(radians(h.longitud) - radians("+"'"+longitud+"'"+")) + sin(radians("+"'"+latitud+"'"+")) * sin(radians(h.latitud)))) AS distance "+
        "from configuracion.camas as c "+
        "JOIN configuracion.tabla as t ON t.idtabla = c.id "+
        "JOIN configuracion.hospital as h ON h.nombre = t.nombrehospital "+
        "WHERE c.estado = 'Libre' "+
        "ORDER BY distance ASC");
        res.json(data);
    }

    public async validar (req: Request, res: Response){
        const nombre = req.body.nombre;
        const eps = req.body.eps;
        const cedula = req.body.cedula;
        const camaasignada = req.body.camaasignada;

         // Json 
         const data2 = {
            nombre: nombre,
            cedula:cedula,
            eps:eps,
            camaasignada:camaasignada,
        }

        const data = await pool.query("INSERT INTO configuracion.paciente  set ? ',"+"'"+data2+"'"+""+
        " DELETE FROM configuracion.paciente "+
        " WHERE EXISTS ( SELECT * FROM moduloEPS.usuarios as u WHERE u.cedula="+"'"+cedula+"'"+"  AND u.estado='inactivo') AND cedula="+"'"+cedula+"'"+" "
        );
        res.json(data);
        
    }
    
}

export const datacontroller = new dataController();
