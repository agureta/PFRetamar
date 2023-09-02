class Producto {
    constructor(id, nombre, precio, descripcion, img) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.descripcion = descripcion
        this.cantidad = 1
        this.img = img
    }

aumentarCantidad(){
    this.cantidad++
}

disminuirCantidad(){
    if(this.cantidad > 1){
        this.cantidad--
        return true
    }
    return false
}
}
class Carrito {
    constructor() {
        this.listaCarrito = []
    }

    levantarStorage(){
        let listaCarritoJSON = localStorage.getItem("listaCarrito")
        this.listaCarrito = JSON.parse(listaCarritoJSON)
    }

    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }

    agregar(productoAgregar) {
        const productoExistente = this.listaCarrito.find(producto => producto.id === productoAgregar.id )
        if (productoExistente){
            productoExistente.cantidad++;
        }else {
            this.listaCarrito.push(productoAgregar)
        }
       this.guardarEnStorage()
    }

    eliminar(productoEliminar){
        let producto = this.listaCarrito.find(producto => producto.id == productoEliminar.id);
        let indice = this.listaCarrito.indexOf(producto)
        this.listaCarrito.splice(indice,1)
    }

    mostrarProductos() {
        let contenedor_carrito = document.getElementById('contenedor_carrito')
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${producto.img}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Cantidad: <button class="btn btn-dark" id="minus-${producto.id}"><i class="fa-solid fa-minus fa-1x"></i></button>${producto.cantidad}<button class="btn btn-dark" id="plus-${producto.id}"><i class="fa-solid fa-plus"></i></button> </p>
                            <p class="card-text">Precio: $${producto.precio}</p>
                            <button class="btn btn-danger" id="eliminar-${producto.id}"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>`
        })
        this.listaCarrito.forEach(producto => {
            let btn_eliminar = document.getElementById(`eliminar-${producto.id}`)
            let btn_plus = document.getElementById(`plus-${producto.id}`)
            let btn_minus = document.getElementById(`minus-${producto.id}`)
          

            btn_eliminar.addEventListener("click", () => {
                this.eliminar(producto)
                this.guardarEnStorage()
                this.mostrarProductos()
            })
            btn_plus.addEventListener("click", ()=>{
                this.producto.aumentarCantidad();
                this.guardarEnStorage();
                this.mostrarProductos();
            })
            btn_minus.addEventListener("click", ()=>{
                if (producto.disminuirCantidad()){
                this.guardarEnStorage();
                }
            })
        })
        let total = document.getElementById("total");

        total.innerHTML = "Precio Total: $" + this.calcular_total()
    }

    calcular_total(){
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad ,0)
    }
}
    const btn_end = document.getElementById("btn-end")

    btn_end.addEventListener("click",()=>{
        Swal.fire('Gracias por usar ARTraining, te esperamos pronto!')
    })



class ProductoController {
    constructor() {
        this.listaProductos = []
    }

    agregar(producto) {
        this.listaProductos.push(producto)
    }

    mostrarProductos() {
        let contenedor_productos = document.getElementById("contenedor_productos")
        let total = document.getElementById(`total`)


        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += `<div class="card" style="width: 18rem;">
            <img src="${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text">$${producto.precio}</p>
                <a href="#" class="btn btn-primary" id="ap-${producto.id}">Añadir al carrito</a>
            </div>
        </div>
            `
        })

        this.listaProductos.forEach(producto => {

            const btn = document.getElementById(`ap-${producto.id}`)

            btn.addEventListener("click", () => {
                carrito.agregar(producto)
                carrito.mostrarProductos()
            })
            btn.addEventListener("click",() => {
                Toastify({
                    text: "Producto añadido",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, 09b, blue)",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
            })
        })
    }
}



const p1 = new Producto(1,"Bolso Wilson 40L",35000,"Comodo bolso Wilson","img/bolso-wilson-40L.jpg");
const p2 = new Producto(2,"Nassau",27000,"PELOTA DE FUTBOL NASSAU CHAMPIONSHIP PRO","./img/nassau-championship.jpg");
const p3 = new Producto(3,"Dunlop Padel",5000,"Pelota de padel DUNLOP Pro new x3un Tournamnent","./img/dunlopx3.jpg");
const p4 = new Producto(4,"Molten",20000,"PELOTA DE VOLEY MOLTEN VSM2700","./img/pelota-volley-molten-vsm2700-300x300.jpg");
const p5 = new Producto(5,"SPORTO",7000,"ANTIPARRA SPORTO JAVA","./img/antiparra-sporto.jpg");


const carrito = new Carrito()
carrito.levantarStorage()
carrito.mostrarProductos()

const   controlador_productos= new ProductoController()

controlador_productos.agregar(p1)
controlador_productos.agregar(p2)
controlador_productos.agregar(p3)
controlador_productos.agregar(p4)
controlador_productos.agregar(p5)


controlador_productos.mostrarProductos()





