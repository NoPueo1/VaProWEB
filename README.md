# Tienda VaPro - React

Proyecto de tienda digital de videojuegos desarrollado para la asignatura de Desarrollo Web / Fullstack en Duoc UC.

## Integrantes
- Vicente Provoste
- Agustín Vásquez

---

## Descripción del Proyecto
Migración integral de la plataforma web **VaPro** desde Vanilla JavaScript a una arquitectura de componentes moderna con **React 19**, **TypeScript** y **Vite**, conservando toda la funcionalidad de negocio, persistencia en `LocalStorage` / `SessionStorage`, validaciones de negocio y panel de administración.

### Módulos y Funcionalidades
- **Página Principal (Inicio):** Vitrina interactiva con carrusel de títulos destacados y catálogo con acceso rápido a compra y vista en detalle.
- **Catálogo de Productos:** Listado completo de videojuegos con filtrado y tarjetas interactivas.
- **Detalle de Videojuegos:** Ficha técnica con selector dinámico de miniaturas (portada / captura de gameplay), selector de copias (1 a 10) y adición al carrito.
- **Carrito de Compras:** Gestión de cantidades por producto (`+` / `-`), subtotales en tiempo real, total general, vaciado de carrito y simulación de compra con recibo personalizado.
- **Autenticación (Login):** Validación de correos institucionales (@duoc.cl, @profesor.duoc.cl, @gmail.com), contraseñas de 4 a 10 caracteres y redirección condicionada por rol.
- **Registro de Usuarios (Sign-up):** Validación de RUN chileno con algoritmo de dígito verificador (módulo 11), selectores dinámicos en cascada de regiones y comunas de Chile, términos y condiciones.
- **Panel de Administración (Admin):**
  - **Mantenedor de Juegos:** CRUD completo de títulos con búsqueda en tiempo real, alerta visual de stock crítico, carga y vista previa de carátula.
  - **Mantenedor de Usuarios:** CRUD de cuentas con asignación de roles (Administrador, Vendedor, Cliente), validación de RUN y comuna.
  - **Control de Acceso:** Restricción por rol (el rol Vendedor solo tiene acceso a la gestión de productos).
- **Blog de Noticias:** Publicaciones y artículos detallados de novedades del gaming.
- **Sobre Nosotros:** Historia institucional, misión, visión y equipo de desarrollo.
- **Contacto y Soporte:** Información de atención y formulario con confirmación.

---

## Ramas del Repositorio
- `main`: Versión principal del proyecto con la aplicación React compilada y lista para entrega.
- `React`: Rama con los componentes y la lógica en React + TypeScript.
- `Javascript`: Rama con la versión original desarrollada en HTML5, CSS3 y Vanilla JavaScript.

---

## Tecnologías Utilizadas
- **React 19**
- **TypeScript**
- **Vite**
- **Bootstrap 5**
- **LocalStorage & SessionStorage API**

---

## Ejecución del Proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

4. **Validar código (Linter):**
   ```bash
   npm run lint
   ```

---

## Credenciales de Prueba
- **Administrador:** `admin@duoc.cl` | Contraseña: `1234`
- **Vendedor:** `carlos.vargas@profesor.duoc.cl` | Contraseña: `1234`
- **Cliente:** `matias.perez@gmail.com` | Contraseña: `1234`
- **RUN chileno de prueba:** `19011022K`
