import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './AddProductos.css';

export default function AddProductos() {
    const [productos, setProductos] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);

    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcionProducto, setDescripcionProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [stockProducto, setStockProducto] = useState('');
    const [tipoProducto, setTipoProducto] = useState('');
    const [imagenProducto, setImagenProducto] = useState('');

    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoEnEdicionId, setProductoEnEdicionId] = useState(null);


    const cargarProductos = async () => {
        try {
            const response = await fetch('https://apipry.onrender.com/productos');
            if (response.ok) {
                const data = await response.json();
                setProductos(data);
            } else {
                throw new Error('Error al cargar los productos');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarProductos();
        setNombreProducto('');
        setDescripcionProducto('');
        setPrecioProducto('');
        setStockProducto('');
        setTipoProducto('');
        setImagenProducto('');
    }, []);

    const abrirModal = () => {
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setModoEdicion(false);
        setNombreProducto('');
        setDescripcionProducto('');
        setPrecioProducto('');
        setStockProducto('');
        setTipoProducto('');
        setImagenProducto('');
    };

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        if (modoEdicion) {
            const response = await fetch(`https://apipry.onrender.com/productos/${productoEnEdicionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombreProducto,
                    descripcion: descripcionProducto,
                    precio: parseFloat(precioProducto),
                    stock: parseInt(stockProducto),
                    tipo: tipoProducto,
                    imagen: imagenProducto
                })
            });
            if (response.ok) {
                cargarProductos();
                cerrarModal();
                setModoEdicion(false); // Desactiva el modo de edición
                setProductoEnEdicionId(null); // Resetea el ID del producto en edición
                // Restablecer el estado de los campos del formulario
                setNombreProducto('');
                setDescripcionProducto('');
                setPrecioProducto('');
                setStockProducto('');
                setTipoProducto('');
                setImagenProducto('');
            } else {
                throw new Error('Error al editar el producto');
            }
        } else {
            const response = await fetch('https://apipry.onrender.com/productos/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombreProducto,
                    descripcion: descripcionProducto,
                    precio: parseFloat(precioProducto),
                    stock: parseInt(stockProducto),
                    tipo: tipoProducto,
                    imagen: imagenProducto
                })
            });
            if (response.ok) {
                cargarProductos();
                cerrarModal();
                setNombreProducto('');
                setDescripcionProducto('');
                setPrecioProducto('');
                setStockProducto('');
                setTipoProducto('');
                setImagenProducto('');
            } else {
                throw new Error('Error al agregar el producto');
            }
        }
    } catch (error) {
        console.error(error);
    }
};  

const handleEditar = async (id) => {
    try {
        const response = await fetch(`https://apipry.onrender.com/productos/${id}`);
        if (response.ok) {
            const data = await response.json();
            // Establece el ID del producto en edición en la variable de estado
            setProductoEnEdicionId(id);
            // Aquí puedes establecer el estado de los campos del formulario con los datos del producto a editar
            setNombreProducto(data.nombre);
            setDescripcionProducto(data.descripcion);
            setPrecioProducto(data.precio.toString());
            setStockProducto(data.stock.toString());
            setTipoProducto(data.tipo);
            setImagenProducto(data.imagen);
            // Abre el modal para mostrar el formulario de edición
            abrirModal();
            setModoEdicion(true); // Establece el modo de edición como verdadero
        } else {
            throw new Error('Error al obtener los datos del producto para editar');
        }
    } catch (error) {
        console.error(error);
    }
};

    const handleEliminar = async (id) => {
        // Aquí puedes implementar la lógica para eliminar un producto
        try {
            const response = await fetch(`https://apipry.onrender.com/productos/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                cargarProductos();
            } else {
                throw new Error('Error al eliminar el producto');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">

            <h1 style={{margin:20}}>𝙇𝙞𝙨𝙩𝙖 𝙙𝙚 𝙥𝙧𝙤𝙙𝙪𝙘𝙩𝙤𝙨</h1>

            <Button variant='success' style={{width:'50%', margin:10}} onClick={abrirModal}>Agregar Producto</Button>

            <Modal show={modalAbierto} onHide={cerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modoEdicion ? 'Editar' : 'Agregar'} Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="formulario">
                        <label className="label">
                            Nombre:
                            <input type="text" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} required className="input" />
                        </label>
                        <label className="label">
                            Descripción:
                            <input type="text" value={descripcionProducto} onChange={(e) => setDescripcionProducto(e.target.value)} required className="input" />
                        </label>
                        <label className="label">
                            Precio:
                            <input type="number" value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} required className="input" />
                        </label>
                        <label className="label">
                            Stock:
                            <input type="number" value={stockProducto} onChange={(e) => setStockProducto(e.target.value)} required className="input" />
                        </label>
                        <label className="label">
                            Tipo:
                            <input type="text" value={tipoProducto} onChange={(e) => setTipoProducto(e.target.value)} required className="input" />
                        </label>
                        <label className="label">
                            Imagen (URL):
                            <input type="text" value={imagenProducto} onChange={(e) => setImagenProducto(e.target.value)} className="input" />
                        </label>
                        <Button type="submit" className="boton-agregar">{modoEdicion ? 'Editar' : 'Agregar'}</Button>
                    </form>
                </Modal.Body>
            </Modal>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto._id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>
                                <Button style={{width:'40%'}} variant="primary" onClick={() => handleEditar(producto._id)}>Editar</Button>{' '}
                                <Button style={{width:'40%'}} variant="danger" onClick={() => handleEliminar(producto._id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}