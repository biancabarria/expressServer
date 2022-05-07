const express = require('express')
const app = express()
const Contenedor = require('./container')


app.get('/productos', (req, res) => {
    const obtenerProductos = async () => {
        const productos = new Contenedor('products.txt')
        const contenido = await productos.getAll()
        res.send(contenido)
    }
    obtenerProductos()
})

app.listen(8080, () => {
    console.log('Servidor levantado!')
})