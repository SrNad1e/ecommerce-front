# Ecommerce Frontend (React + Vite + MUI)

Frontend inspirado en Steam, con carruseles, ofertas y modal de detalle. Conecta con el backend NestJS.

## Requisitos
- Node.js 18+

## Instalacion
```
npm install
```

## Desarrollo
```
npm run dev
```

## Variables importantes
El frontend consume productos desde:
- GET http://localhost:3000/products

## Funcionalidades
- Ofertas y destacados en carrusel
- Modal con detalle del producto
- Login y registro reales (JWT)
- Carrito basico en UI

## Notas
- El token se guarda en localStorage.
- Para login/register se usan:
  - POST /auth/register
  - POST /auth/login
