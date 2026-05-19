const CLAVE = "productos";

const form =
document.getElementById("producto-form");

const nombreInput =
document.getElementById("nombre");

const precioInput =
document.getElementById("precio");

const stockInput =
document.getElementById("stock");

const imagenInput =
document.getElementById("imagen");

const lista =
document.getElementById("lista-productos");

const buscar =
document.getElementById("buscar");

const totalProductos =
document.getElementById("total-productos");

const totalDinero =
document.getElementById("total-dinero");

let editandoId = null;

let filtro = "";


/* Obtener productos */

function obtenerProductos(){

    return JSON.parse(
        localStorage.getItem(CLAVE)
    ) || [];
}


/* Guardar productos */

function guardarProductos(productos){

    localStorage.setItem(
        CLAVE,
        JSON.stringify(productos)
    );
}


/* Renderizar */

function render(){

    let productos =
    obtenerProductos();

    productos =
    productos.filter(producto =>

        producto.nombre
        .toLowerCase()
        .includes(
            filtro.toLowerCase()
        )
    );


    /* TOTAL PRODUCTOS */

    let cantidadTotal = 0;

    let dineroTotal = 0;


    productos.forEach(producto => {

    cantidadTotal++;

    dineroTotal +=
    Number(producto.precio)
    *
    Number(producto.stock);
});


    totalProductos.textContent =
    `Total productos: ${cantidadTotal}`;

    totalDinero.textContent =
    `Total dinero: $${dineroTotal}`;



    /* LIMPIAR LISTA */

    lista.innerHTML = "";


    /* MOSTRAR PRODUCTOS */

    productos.forEach(producto => {

        lista.innerHTML += `

        <li>

            <div class="producto-info">

                ${
                    producto.imagen
                    ?

                    `<img
                        src="${producto.imagen}"
                        class="producto-img"
                    >`

                    :

                    ""
                }

                <div>

                    <strong>
                        ${producto.nombre}
                    </strong>

                    <br>

                    Precio:
                    $${producto.precio}

                    <br>

                    Stock:
                    ${producto.stock}

                </div>

            </div>


            <div>

                <button
                    onclick="editar('${producto.id}')"
                >
                    Editar
                </button>


                <button
                    onclick="sumar('${producto.id}')"
                >
                    +1
                </button>


                <button
                    onclick="restar('${producto.id}')"
                >
                    -1
                </button>


                <button
                    onclick="eliminarProducto('${producto.id}')"
                >
                    Eliminar
                </button>

            </div>

        </li>
        `;
    });
}



/* GUARDAR */

form.addEventListener(
    "submit",

    function(e){

        e.preventDefault();

        const archivo =
        imagenInput.files[0];


        if(archivo){

            const lector =
            new FileReader();

            lector.onload =
            function(){

                guardarProducto(
                    lector.result
                );
            };

            lector.readAsDataURL(
                archivo
            );

        }else{

            guardarProducto(null);
        }
    }
);



/* CREAR O EDITAR */

function guardarProducto(imagen){

    const productos =
    obtenerProductos();


    const imagenAnterior =

        editandoId

        ?

        productos.find(
            p => p.id === editandoId
        )?.imagen

        :

        null;


    const producto = {

        id:
        editandoId
        ||
        crypto.randomUUID(),

        nombre:
        nombreInput.value,

        precio:
        Number(
            precioInput.value
        ),

        stock:
        Number(
            stockInput.value
        ),

        imagen:
        imagen
        ||
        imagenAnterior
    };


    if(editandoId){

        const index =

        productos.findIndex(
            p => p.id === editandoId
        );

        productos[index] =
        producto;

        editandoId = null;

    }else{

        productos.push(producto);
    }


    guardarProductos(productos);

    form.reset();

    render();
}



/* EDITAR */

function editar(id){

    const producto =

    obtenerProductos()
    .find(
        p => p.id === id
    );


    nombreInput.value =
    producto.nombre;

    precioInput.value =
    producto.precio;

    stockInput.value =
    producto.stock;

    editandoId = id;
}



/* SUMAR */

function sumar(id){

    const productos =
    obtenerProductos();

    const producto =

    productos.find(
        p => p.id === id
    );

    producto.stock++;

    guardarProductos(productos);

    render();
}



/* RESTAR */

function restar(id){

    const productos =
    obtenerProductos();

    const producto =

    productos.find(
        p => p.id === id
    );

    if(producto.stock > 0){

        producto.stock--;
    }

    guardarProductos(productos);

    render();
}



/* ELIMINAR */

function eliminarProducto(id){

    const productos =

    obtenerProductos()
    .filter(
        p => p.id !== id
    );

    guardarProductos(productos);

    render();
}



/* BUSCAR */

buscar.addEventListener(
    "input",

    function(){

        filtro =
        buscar.value;

        render();
    }
);


/* INICIAR */

render();

function ponerPrecio(valor){

    precioInput.value = valor;
}
