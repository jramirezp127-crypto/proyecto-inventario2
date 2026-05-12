# Tarea 2 — Editar productos y filtrar inventario

**Proyecto:** Inventario JS  
**Nivel:** Principiante - Intermedio  
**Objetivo de clase:** profundizar en manipulación del DOM, estado en memoria y persistencia con `localStorage`.

---

## ¿Qué van a construir?

Sobre la Tarea 1, agregar dos mejoras:
- edición de productos existentes,
- filtro/búsqueda por nombre.

---

## Requerimientos funcionales

### RF1 — Editar producto
Cada producto debe poder editar:
- nombre
- precio
- stock

La edición puede hacerse con:
- un formulario reutilizado, o
- `prompt()` (opción básica, menos recomendada).

### RF2 — Buscar por nombre
Agregar un input de búsqueda que:
- filtre en tiempo real,
- no distinga mayúsculas/minúsculas,
- muestre solo productos coincidentes.

### RF3 — Mantener persistencia
Después de editar, los cambios deben guardarse en `localStorage`.

---

## Paso 1 — Preparar HTML

Agregar en `index.html`:
- un campo de búsqueda arriba de la lista:
  - id: `buscar`
- un botón `Editar` por cada producto en el render.

Ejemplo de botón:

```html
<button data-id="..." data-action="editar">Editar</button>
```

---

## Paso 2 — Estado de edición en JS

Crear una variable para saber si se está editando:

```js
let productoEditandoId = null
```

Cuando el usuario pulse `Editar`:
1. cargar los datos del producto en el formulario,
2. cambiar texto del botón principal a `Actualizar`,
3. guardar el `id` en `productoEditandoId`.

---

## Paso 3 — Guardar o actualizar en submit

En el `submit` del formulario:
- si `productoEditandoId` es `null`: crear producto nuevo,
- si tiene valor: actualizar ese producto.

Después de actualizar:
- limpiar formulario,
- volver botón a `Guardar`,
- poner `productoEditandoId = null`,
- renderizar.

---

## Paso 4 — Implementar búsqueda

1. Escuchar `input` del campo `#buscar`.
2. Filtrar productos por nombre:

```js
nombre.toLowerCase().includes(textoBuscado)
```

3. Renderizar solo coincidencias.

Sugerencia: permitir que `renderProductos` reciba una lista opcional.

---

## Validaciones mínimas

Mantener validaciones de Tarea 1:
- nombre no vacío,
- precio y stock válidos,
- valores >= 0.

Agregar validación en edición:
- si el producto ya no existe (caso raro), cancelar edición y mostrar mensaje.

---

## Criterios de evaluación

1. Se puede editar un producto y ver cambios en pantalla.
2. Los cambios editados persisten al recargar.
3. La búsqueda filtra correctamente por texto parcial.
4. No se rompe la lógica de sumar/restar/eliminar.
5. Código organizado (funciones reutilizables).

---

## Pruebas manuales obligatorias

1. Crear 3 productos con nombres distintos.
2. Editar el segundo producto y cambiar precio/stock.
3. Recargar y comprobar que la edición persiste.
4. Buscar por 2 fragmentos de texto distintos (ej: `lap`, `cuad`).
5. Borrar texto de búsqueda y verificar que reaparecen todos.

---

## Entrega

- Código actualizado en `index.html`, `styles.css`, `app.js`.
- Captura con filtro activo.
- Breve explicación (5-8 líneas) de cómo implementaron edición y búsqueda.
