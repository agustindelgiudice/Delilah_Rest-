const { Usuarios } = require('../database/models');
const { Op } = require('../database/db');
const { jwt, firma } = require('../token');


//FUNCION PARA VER A TODOS LOS USUARIOS DENTRO DE LA TABLA Usuarios

const verUsuarios = async function verUsuarios(req, res) {
    await Usuarios.findAll()
        .then(data => {
            //console.log("Endpoint ver usuarios");
            return res.status(200).json({ msg: 'Usuarios traídos exitosamente', usuarios: data });
        })
        .catch(err => {
            console.log(err);
            return res.status(404).send('Error 404. Lista de usuarios no encontrada.');
        })
};
//FUNCION QUE AGREGA A UN USUARIO DENTRO DE LA TABALA Usuarios

const nuevoUsuario = async function nuevoUsuario(req, res) {
    //validar si el email y usuario ya existen
    var nuevoUsuario = req.body.usuario;
    var nuevoEmail = req.body.email;

    var usuarioValido = await Usuarios.findAll({
        where: {
            usuario: nuevoUsuario
        }
    })
        .catch(err => {
            console.log(err);
            return res.status(400).send('Error 400. Intente nuevamente.');
        });

    var mailValido = await Usuarios.findAll({
        where: {
            email: nuevoEmail
        }
    })
        .catch(err => {
            console.log(err);
            return res.status(400).send('Error 400. Intente nuevamente.');
        });
    
        //si no existe ninguno, crear el usuario
    if (usuarioValido.length < 1 && mailValido.length < 1) {
        await Usuarios.create({
            usuario: nuevoUsuario,
            nombre_apellido: req.body.nombre_apellido,
            email: nuevoEmail,
            telefono: req.body.telefono,
            direccion_envio: req.body.direccion_envio,
            pw: req.body.pw
        })
            .then(data => {
                return res.status(200).json({ msg: 'Usuario creado exitosamente.', usuario: data });
            })
            .catch(err => {
                console.log(err);
                return res.status(400).send('Error 400. Intente nuevamente.');
            })
    } else if (usuarioValido.length >= 1) { //si el nombre de usuario ya existe devuelvo error
        return res.status(400).send('El usuario ingresado ya existe, intentá con otro.');

    } else {//si el email ya existe devuelvo error
        return res.status(400).send('El email ingresado ya existe, intentá con otro.');
    }



};


//FUNCION PARA LOGUEAR EL USUARIO AL SISTEMA
const logInUsuario = async function logInUsuario(req, res) {
    //obtengo los datos ingresados
    const usuarioIngresado = req.body.usuario; //este dato puede ser tanto el EMAIL como el USUARIO en la tabla Usuarios
    const pwIngresado = req.body.pw;
    

    
    //apruebo que existan dentro de la tabla
    var usuarioExiste = await Usuarios.findAll({
        attributes: ['id_usuario', 'usuario', 'pw', 'admin'],
        where: {
            [Op.or]: [
                { usuario: usuarioIngresado },
                { email: usuarioIngresado }
            ]
        }
    })
        .catch(err => {
            console.log(err);
            return res.status(400).send('Error 400. Intente nuevamente.');
        });

    //si no existe, devuelvo mensaje de error
    if (usuarioExiste.length < 1) {
        return res.status(404).send('Error 404. El usuario ingresado no existe, intentá con otro o registrate para acceder.');

    } else if (usuarioExiste[0].dataValues.pw !== pwIngresado) { //si existe, valido su contraseña
        return res.status(400).send('La contraseña ingresada es incorrecta. Intentá otra vez.');

    } else { //si existe y su contraseña es correcta, le doy acceso al sistema
        var datosUsuario = usuarioExiste[0].dataValues;
        //agrego el JWT
        const token = jwt.sign({ datosUsuario }, firma);
        return res.status(200).json({ msg: 'Usuario logueado exitosamente. Bienvenido al sistema.', usuario: usuarioExiste[0].dataValues.usuario, token: token });
    }
};

module.exports = {
    verUsuarios,
    nuevoUsuario,
    logInUsuario
}