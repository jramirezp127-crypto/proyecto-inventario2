let productos =
JSON.parse(localStorage.getItem("productos")) || [];

mostrar();

function agregarProducto(){

    let nombre =
    document.getElementById("nombre").value;

    let cantidad =
    document.getElementById("cantidad").value;

    let precio =
    document.getElementById("precio").value;

    productos.push({
        nombre,
        cantidad,
        precio
    });

    guardar();
    mostrar();
}

function mostrar(){

    let tabla =
    document.getElementById("tabla");

    tabla.innerHTML = "";

    productos.forEach((p,i)=>{

        tabla.innerHTML += `
        <tr>
            <td>${p.nombre}</td>
            <td>${p.cantidad}</td>
            <td>$${p.precio}</td>

            <td>
                <button onclick="eliminar(${i})">
                    Eliminar
                </button>
            </td>
        </tr>`;
    });
}

function eliminar(i){

    productos.splice(i,1);

    guardar();
    mostrar();
}

function guardar(){

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );
}