const CLAVE_PRODUCTOS = 'inventario_productos'

const form = document.querySelector('#producto-form')
const inputNombre = document.querySelector('#nombre')
const inputPrecio = document.querySelector('#precio')
const inputStock = document.querySelector('#stock')
const lista = document.querySelector('#lista-productos')
const mensaje = document.querySelector('#mensaje')
const inputBuscar = document.querySelector('#buscar')
const tituloForm = document.querySelector('#form-title')
const btnGuardar = document.querySelector('#btn-guardar')

let productoEditandoId = null
let textoBusqueda = ''

function obtenerProductos() {
  return JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS)) || []
}

function guardarProductos(productos) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos))
}

function actualizarModoFormulario() {
  const enEdicion = productoEditandoId !== null
  tituloForm.textContent = enEdicion ? 'Editar producto' : 'Agregar producto'
  btnGuardar.textContent = enEdicion ? 'Actualizar' : 'Guardar'
}

function salirModoEdicion() {
  productoEditandoId = null
  actualizarModoFormulario()
}

function renderProductos() {
  const productos = obtenerProductos()
  const filtro = textoBusqueda.trim().toLowerCase()

  const productosFiltrados = productos.filter((p) => {
    if (!filtro) return true
    return p.nombre.toLowerCase().includes(filtro)
  })

  lista.innerHTML = ''

  if (productosFiltrados.length === 0) {
    lista.innerHTML = '<li>No hay productos para mostrar.</li>'
    return
  }

  productosFiltrados.forEach((p) => {
    const li = document.createElement('li')
    li.innerHTML = `
      <div>
        <strong>${p.nombre}</strong><br>
        Precio: $${p.precio.toFixed(2)} | Stock: ${p.stock}
      </div>
      <div class="actions">
        <button data-id="${p.id}" data-action="editar">Editar</button>
        <button data-id="${p.id}" data-action="sumar">+1</button>
        <button data-id="${p.id}" data-action="restar">-1</button>
        <button class="btn-delete" data-id="${p.id}" data-action="eliminar">Eliminar</button>
      </div>
    `
    lista.appendChild(li)
  })
}

form.addEventListener('submit', function (e) {
  e.preventDefault()

  const nombre = inputNombre.value.trim()
  const precio = Number(inputPrecio.value)
  const stock = Number(inputStock.value)

  if (!nombre || !Number.isFinite(precio) || !Number.isFinite(stock) || precio < 0 || stock < 0) {
    mensaje.textContent = 'Ingresa datos válidos.'
    return
  }

  const productos = obtenerProductos()

  if (productoEditandoId === null) {
    productos.push({ id: crypto.randomUUID(), nombre, precio, stock })
    mensaje.textContent = 'Producto guardado.'
  } else {
    const index = productos.findIndex((p) => p.id === productoEditandoId)
    if (index === -1) {
      mensaje.textContent = 'El producto ya no existe. Intenta de nuevo.'
      salirModoEdicion()
      renderProductos()
      return
    }

    productos[index] = { ...productos[index], nombre, precio, stock }
    mensaje.textContent = 'Producto actualizado.'
    salirModoEdicion()
  }

  guardarProductos(productos)
  form.reset()
  renderProductos()
})

lista.addEventListener('click', function (e) {
  const target = e.target
  if (!(target instanceof HTMLButtonElement)) return

  const id = target.dataset.id
  const action = target.dataset.action
  const productos = obtenerProductos()
  const index = productos.findIndex((p) => p.id === id)
  if (index === -1) {
    mensaje.textContent = 'No se encontró el producto.'
    return
  }

  if (action === 'editar') {
    const producto = productos[index]
    inputNombre.value = producto.nombre
    inputPrecio.value = String(producto.precio)
    inputStock.value = String(producto.stock)
    productoEditandoId = producto.id
    actualizarModoFormulario()
    mensaje.textContent = `Editando: ${producto.nombre}`
    return
  }

  if (action === 'sumar') productos[index].stock += 1
  if (action === 'restar' && productos[index].stock > 0) productos[index].stock -= 1
  if (action === 'eliminar') {
    if (productoEditandoId === id) {
      form.reset()
      salirModoEdicion()
    }
    productos.splice(index, 1)
  }

  guardarProductos(productos)
  renderProductos()
})

inputBuscar.addEventListener('input', function () {
  textoBusqueda = inputBuscar.value
  renderProductos()
})

actualizarModoFormulario()
renderProductos()
