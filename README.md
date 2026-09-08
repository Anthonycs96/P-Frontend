# Gestión de restaurante | Frontend

Interfaz web de práctica para gestionar mesas, pedidos y detalle de órdenes de un restaurante. La API y la persistencia están en [P-Backend](https://github.com/Anthonycs96/P-Backend).

**React 18 · Vite 4 · JavaScript · Tailwind CSS 3 · Zustand · React Router**

## Funcionalidades presentes

- Inicio de sesión y estado de autenticación.
- Consulta de mesas y actualización de su estado.
- Carrito de productos y creación de pedidos por mesa.
- Detalle de órdenes y seguimiento de pedidos.
- Componentes de facturación y documentos PDF.
- Navegación para móvil y escritorio.

## Qué muestra este proyecto

Componentes React, hooks para operaciones de negocio, estado compartido con Zustand y comunicación HTTP con una API. Es un proyecto de aprendizaje, pendiente de validación para un uso real.

## Ejecutar en local

Necesitas Node.js, npm y el backend con su base de datos configurada.

```bash
git clone https://github.com/Anthonycs96/P-Frontend.git
cd P-Frontend
npm ci
npm run dev
```

Abre la URL que indique Vite, normalmente [localhost:5173](http://localhost:5173).

Las llamadas actuales apuntan a `http://localhost:3000/api`. Configura `PORT=3000` en el `.env` de P-Backend para conectar ambos repositorios. La URL de la API todavía está definida directamente en varios archivos del frontend.

```bash
npm run build
npm run preview
```

## Organización

```text
src/components/       Interfaz y formularios
src/pages/            Login, mesas, carrito, órdenes y perfil
src/hooks/            Operaciones de mesas, productos y pedidos
src/helper/           Autenticación y validaciones
src/router/           Rutas de la aplicación
src/VariblesStore.jsx Estado compartido de autenticación
```

## Estado y próximos pasos

La experiencia completa requiere el esquema MySQL y datos iniciales del backend, que todavía no se distribuyen con estos repositorios. No hay cuentas de demostración ni una demo pública documentada.

Pendiente: centralizar la URL de la API, documentar los datos iniciales y añadir pruebas de los flujos de pedidos.

[API del proyecto](https://github.com/Anthonycs96/P-Backend) · [Portafolio](https://github.com/Anthonycs96/miPortafolio)
