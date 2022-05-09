# Next Frontend Challenge

## _Cometa Test_

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Cometa Test es una aplicación web donde un padre de familia puede ver el status de las mensualidades/colegiaturas de su hijo/hija.

## Features

- Revise las cuotas pagadas, pendientes y futuras
- seleccione la cuota o cuotas pagar
- Revise el total a pagar

## Tech

Cometa Test utiliza una serie de tecnologías de código abierto para funcionar correctamente:

- [NextJs](https://nextjs.org)
- [MUI](https://mui.com)
- [Docker Compose](https://docs.docker.com/compose/)
- [SASS](https://sass-lang.com)
- [Dayjs](https://day.js.org)
- [Currency.js](https://currency.js.org)

## Instalación

Cometa Test requiere [Node.js](https://nodejs.org/) v10+ para funcionar.

## Empezando

Instala las dependencias y arranca el servidor.
Con [yarn](https://yarnpkg.com):

```sh
cd cometa-test
yarn install
yarn dev
```

Crea las variables de entorno a partir del env.example

```sh
cp env.example .env.local
```

Ejecuta el modo desarrollo

```sh
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador

## Docker

Cometa Test es muy fácil de instalar y desplegar en un contenedor Docker usando docker-compose.

Por defecto, el Docker expondrá el puerto 3000, así que cambia esto dentro del Dockerfile si es necesario. Cuando esté listo, simplemente use el script para construir y desplegar el contendor.

#### desarrollo

```sh
yarn dev:up
```

#### producción

```sh
yarn prod:up
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador

# Demo en vivo

Puede usar el sistema en [cometa-test.herokuapp](https://cometa-test.herokuapp.com)

# Repositorio

[github.com/jblnco-ing/cometa-test](https://github.com/jblnco-ing/cometa-test)
