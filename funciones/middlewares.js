const { jwt, firma } = require('../token');

//MIDDLEWARE QUE TE DA EL ACCESO AL SISTEMA SOLO A LOS USUARIOS QUE ESTÉN REGISTRADOS, PASADOS MEDIANTE EL JWT PUESTO EN EL HEADER.
function usersOk(req, res, next) {
    console.log("only users");
    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenVerify = jwt.verify(token, firma);

        if (tokenVerify) {
            req.user = tokenVerify;
            return next();
        } else {
            res.status(401).send('Hubo un error al validar al usuario');
        }
    } catch (err) {
        console.log(err);
        res.status(400).send('No se encontró usuario registrado.');
    }
}

//MIDDLEWARE QUE LE PERMITE EL ACCESO AL SISTEMA SOLO A LOS ADMINISTRADORES, PASADOS MEDIANTE EL JWT PUESTO EN EL HEADER
function adminOk(req, res, next) {
    console.log("only admin");
    try {
        const token = req.headers.authorization.split(' ')[1]
        const tokenVerify = jwt.verify(token, firma);
        if (tokenVerify) {
            if (tokenVerify.datosUsuario.admin == 1) {
                return next()
            } else {
                res.status(401).send('No se puede realizar la acción, sólo puede realizarla un usuario con rol de administrador')
            } 
        }
    } catch (err) {
        res.status(400).send('No se encontró usuario Administrador registrado.');
    }
}


module.exports = {
    usersOk,
    adminOk
}