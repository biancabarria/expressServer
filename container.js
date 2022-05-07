const fs = require('fs')  

class Contenedor {

    id = 1

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
    }

    async save(objeto) {
        try {
            const array = await this.getAll()
            if (array.length == 0) {
                objeto['id'] = this.id
                objeto = Array(objeto)
            } else {
                const array = await this.getAll();
                const index = array[array.length - 1].id + 1;
                objeto['id'] = index
                array.push(objeto)
                objeto = array
            }
        } catch (error) {
            throw error
        }
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objeto))
    }

    async getAll() {
        try {
            const contenidoCrudo = await fs.promises.readFile(this.nombreArchivo)
            const contenido = JSON.parse(contenidoCrudo)
            return contenido
        } catch (error) {
            return []
        }
    }

    async getById(id) {
        try {
            const contenidoCrudo = await fs.promises.readFile(this.nombreArchivo)
            const contenido = JSON.parse(contenidoCrudo)
            return contenido.find(product => product.id ===id)
        } catch (error) {
            return null
        }
    }

    async deleteById(id) {
        try {
            const contenidoCrudo = await fs.promises.readFile(this.nombreArchivo)
            const contenido = JSON.parse(contenidoCrudo)
            const contenidoSinId = contenido.filter(producto => producto.id !== id)
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenidoSinId))
            return "SUCCESS"
        } catch (error) {
            return null
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombreArchivo, '[]')
            return "SUCCESS"
        } catch (error) {
            return null
        }
    }
}

const obtenerProductos = async () => {
    const productos = new Contenedor('products.txt')
    const contenido = await productos.getAll()
    console.log('Total de Productos:', contenido)
}

obtenerProductos()

