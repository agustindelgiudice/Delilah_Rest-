const { Productos } = require('../database/models');

//FUNCION PARA VER TODOS LOS PRODUCTOS DENTRO DE LA TABLA Productos
const verProductos = async function verProductos(req, res) {
    await Productos.findAll()
        .then(data => {
            return res.status(200).json({ msg: 'Lista de productos traídos exitosamente.', productos: data });
        })
        .catch(err => {
            console.log(err);
            return res.status(404).send('Error 404. Lista de productos no encontrada.');
        })
};

//FUNCION PARA VER UN PRODUCTO DETERMINADO DENTRO DE LA TABLA Productos,  acomodandolo por su ID
const verProductoId = async function verProductoId(req, res) {
    const productoId = req.params.productoId;

    //validacion: busco el producto id
    await Productos.findByPk(productoId)
        .then(data => {
            if (data === null) {
                //si no se encuentra, devuelvo producto no encontrado
                return res.status(404).send('Error 404. Producto no encontrado.');
            } else {
                //si se encuentra, lo traigo
                return res.status(200).json({ msg: 'Producto traído exitosamente.', producto: data });
            };
        })
        .catch(err => {
            console.log(err);
            return res.status(400).send('Error 400. Intente nuevamente.');
        })
};

//FUNCION PARA VER AGREGAR UN PRODUCTO NUEVO A LA TABLA DE Productos
const agregarProducto = async function agregarProducto(req, res) {
    //validar si el producto ya existe
    var nuevoProducto = req.body.nombre;

    await Productos.findAll({
        where: {
            nombre: nuevoProducto
        }
    })
        .then(data => {
            if (data.length < 1) {
                //si no existe, creo el producto
                Productos.create({
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    descripcion: req.body.descripcion,
                    imagen: req.body.imagen
                })
                    .then(data => {
                        return res.status(200).json({ msg: 'Producto agregado exitosamente.', producto: data });
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(400).send('Error 400. Intente nuevamente.');
                    })
            } else {
                //si ya existe el producto devuelvo error
                return res.status(400).send('El producto ingresado ya existe, intentá con otro.');
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(400).send('Error 400. Intente nuevamente.');
        })
};

//FUNCION PARA VER MODIFICAR UN PRODUCTO DENTRO DE LA TABLA Prodocutos, acomodandolo por su ID

const modificarProducto = async function modificarProducto(req, res) {
    //obtengo el producto a modificar con su param id
    //valido que exista el producto
    const productoId = req.params.productoId;

    await Productos.findByPk(productoId)
        .then(data => {
            if (data === null) {
                //si no existe el producto, devuelvo error
                return res.status(404).send('Error 404. El producto ingresado no existe. No se actualizó ningun producto.');
            } else {
                //si existe, reemplazo todos los datos del producto
                Productos.update({
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    descripcion: req.body.descripcion,
                    imagen: req.body.imagen
                }, {
                    where: {
                        id_producto: productoId
                    }
                })
                    .then(data => {
                        return res.status(200).json({ msg: 'Producto actualizado exitosamente.', producto: productoId });
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(400).send('Error 400. Intente nuevamente.');
                    })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(400).send('Error 400. Intente nuevamente.');
        })
};

//FUNCION PARA VER ELIMINAR UN PRODUCTO DENTRO DE LA TABLA Productos, UBICANDOLO POR SU ID
const eliminarProducto = async function eliminarProducto(req, res) {
    //obtengo el producto a eliminar con su param id
    //valido que exista el producto
    const productoId = req.params.productoId;

    await Productos.findByPk(productoId)
        .then(data => {
            if (data === null) {
                //si no existe el id del producto, devuelvo error
                res.status(404).send('Error 404. El producto ingresado no existe. No se eliminó ningun producto.');
            } else {
                //si existe, elimino el producto
                Productos.destroy({
                    where: {
                        id_producto: productoId
                    }
                })
                    .then(data => {
                        return res.status(200).json({ msg: 'Producto eliminado exitosamente.', producto: productoId });
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(400).send('Error 400. Intente nuevamente.');
                    })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(404).send('Error 404. Intente nuevamente.');
        })
};


module.exports = {
    verProductos,
    verProductoId,
    agregarProducto,
    modificarProducto,
    eliminarProducto
}