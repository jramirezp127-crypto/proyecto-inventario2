# Tarea 1 — Inventario básico con JavaScript

**Proyecto:** Inventario JS  
**Nivel:** Principiante  
**Objetivo de clase:** practicar DOM, eventos, arrays, objetos y `localStorage`.

---

## ¿Qué van a construir?

Una aplicación web simple para gestionar productos:
- agregar producto (nombre, precio, stock),
- listar productos,
- aumentar/disminuir stock,
- eliminar producto.

---

## Archivos de trabajo

- `index.html`
- `styles.css`
- `app.js`

---

## Paso 1 — Estructura HTML

Crear un formulario con estos campos:
- nombre (`input text`)
- precio (`input number`)
- stock (`input number`)
- botón guardar

Y una sección para mostrar la lista de productos (`ul`).

IDs mínimos requeridos:
- `producto-form`
- `nombre`
- `precio`
- `stock`
- `lista-productos`
- `mensaje`

---

## Paso 2 — Estilos base

Aplicar estilos para:
- contenedor centrado,
- tarjetas para formulario y lista,
- inputs y botones legibles,
- botón de eliminar diferenciado.

No se califica diseño avanzado, sí claridad visual.

---

## Paso 3 — Lógica inicial en JS

En `app.js`:
1. Seleccionar elementos del DOM con `querySelector`.
2. Crear una constante de almacenamiento:

```js
const CLAVE_PRODUCTOS = 'inventario_productos'
```

3. Crear funciones:
- `obtenerProductos()`
- `guardarProductos(productos)`
- `renderProductos()`

Usar `JSON.parse` y `JSON.stringify` con `localStorage`.

---

## Paso 4 — Registrar producto

Escuchar el `submit` del formulario:
- prevenir recarga con `event.preventDefault()`
- leer y validar datos
- crear objeto producto con:
  - `id`
  - `nombre`
  - `precio`
  - `stock`
- guardar en `localStorage`
- limpiar formulario
- renderizar lista

Validaciones mínimas:
- nombre no vacío
- precio y stock numéricos
- precio y stock mayores o iguales a 0

---

## Paso 5 — Acciones sobre productos

Usar delegación de eventos en la lista (`click`) para:
- `+1` stock
- `-1` stock (sin bajar de 0)
- eliminar producto

Después de cada acción:
- guardar en `localStorage`
- volver a renderizar

---

## Criterios de evaluación

1. El producto se guarda correctamente.
2. La lista se mantiene al recargar la página.
3. Se puede aumentar/disminuir stock.
4. Se puede eliminar producto.
5. No hay errores en consola durante uso normal.

---

## Pruebas manuales obligatorias

1. Agregar 3 productos distintos.
2. Recargar página y verificar persistencia.
3. Restar stock hasta 0 y confirmar que no baja a negativo.
4. Eliminar un producto y confirmar que desaparece.
5. Intentar guardar con campos vacíos o inválidos y validar mensaje.

---

## Entrega

- Código funcionando en `index.html`, `styles.css`, `app.js`.
- Captura de pantalla de la app con al menos 2 productos.
- Breve explicación (5-8 líneas) de cómo usaron `localStorage`.
