const fs = require("fs");
const express = require("express");
const app = express();

// Check if the file exists
let fileExists = fs.existsSync("listaProductos.txt");
console.log("listaProductos.txt exists:", fileExists);

// If the file does not exist
// create it
if (!fileExists) {
  console.log("Creating the file");
  fs.writeFileSync("listaProductos.txt", "[]");
  console.log("Done!");
}

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  /**
   *
   * @param {json} producto
   * Metodo para guardar un producto. Al terminar de grabar, muestra por pantalla el ID del producto agregado.
   */
  async metodoSave(producto) {
    try {
      const contenido = JSON.parse(
        await fs.promises.readFile(this.nombreArchivo)
      );

      producto.id = contenido.length + 1;
      contenido.push(producto);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido)
      );
      console.log("El Id del Producto es " + producto.id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Metodo para obtener todos los productos 
   */
  async getAll() {
    try {
      const contenido = JSON.parse(
        await fs.promises.readFile(this.nombreArchivo)
      );
      console.log(contenido);
      return contenido;
    } catch (error) {
      console.log("Error en getAll", error);

      return [];
    }
  }
/**
 * Metodo para obtener un producto con su ID random
 * @param {*} id 
 * @returns 
 */
  async getById(id) {
    try {
      const contenidoCrudo = JSON.parse(
        await fs.promises.readFile(this.nombreArchivo)
      );
      const contenido = contenidoCrudo.find((p) => p.id === id);
      return contenido;
    } catch (error) {
      console.log(error);
    }
  }
}

const ejecutarProductos = async () => {
  const productos = new Contenedor("listaProductos.txt");

  //Ejecuto Metodo Save
  await productos.metodoSave({
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  });
  await productos.metodoSave({
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  });
  await productos.metodoSave({
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  });
};

ejecutarProductos();

// -------------------------------------------------------------------------------------------------------
// Codigo del server

app.get("/productos", (req, res, next) => {
  const mostrarProductos = async () => {
    const productos = new Contenedor("listaProductos.txt");
    const showProductos = await productos.getAll();
    res.send(showProductos);
  };
  mostrarProductos();
});

app.get("/random", (req, res, next) => {
  let id = Math.floor(Math.random() * 100) + 1;

  const mostrarProdID = async () => {
    const productos = new Contenedor("listaProductos.txt");
    const mostrarID = await productos.getById(id);
    res.send(mostrarID);
  };
  mostrarProdID();
});

app.listen(8080, () => {
  console.log("Servidor levantado con Expresss");
});

