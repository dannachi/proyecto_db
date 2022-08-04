# Contenedor de la base de datos

## Definimos el USER_NAME

Poner un nombre de usuario en una variable de entorno. 

`USER_NAME=drodriguez`

## Crear la imagen de docker con el esquema y los datos pre-guardados

```
cd database_postgres
docker build -t ${USER_NAME}/laika_db .
```

## Poner a correr el servidor de bases de datos

```
docker run --name laika_db -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d ${USER_NAME}/laika_db
```
# Contenedor para el backend

## Instalar las dependencias

Debes estar en la carpeta raìz del proyecto. 

```
cd backend_express
```

## Crear el contenedor para el backend

`docker build -t ${USER_NAME}/laika_backend .`

## Instalar las dependencias con npm

`docker run -it --rm -v $(pwd):/usr/src/app ${USER_NAME}/laika_backend /bin/bash`

En la terminal del contenerdor ejecutar

```
npm install
   exit
```

## Crear un contenedor con la imagen y conectarla con el servidor de bases de datos

`docker run -it --rm -p 3000:3000 -v $(pwd):/usr/src/app --link laika_db:postgres --name laika_app ${USER_NAME}/laika_backend`

# Probar la aplicación

Visite las direcciones

`localhost:3000/ptype/`
`localhost:3000/ptype/crear`
`localhost:3000/ptype/actualizar`
`localhost:3000/ptype/eliminar`

`localhost:3000/pet/`
`localhost:3000/pet/crear`
`localhost:3000/pet/actualizar`
`localhost:3000/pet/eliminar`

`localhost:3000/toy/`
`localhost:3000/toy/crear`
`localhost:3000/toy/actualizar`
`localhost:3000/toy/eliminar`
