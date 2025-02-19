```markdown
# User Management Application

Este proyecto es una aplicación para la gestión de usuarios, que incluye el frontend, backend y base de datos. La aplicación está contenida en Docker y se despliega en Kubernetes.

## Requisitos Previos

- Docker instalado y funcionando.
- Kubernetes instalado (puedes usar Minikube si estás trabajando localmente).
- `kubectl` configurado para interactuar con tu clúster de Kubernetes.
- Node.js (versión 20) y npm instalados.

## Pasos para configurar y ejecutar el proyecto

### 1. Clonar el repositorio

Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/xavinavi545/ExamenServicios.git
cd ExamenServicios
```

### 2. Configurar los servicios con Docker

#### Backend, Frontend y Base de Datos

- Navega al directorio del proyecto y asegúrate de que tienes el archivo `docker-compose.yml` configurado correctamente.

#### Construir las imágenes y levantar los contenedores

Desde el directorio raíz del proyecto, ejecuta el siguiente comando para construir y levantar los contenedores de Docker:

```bash
docker-compose up --build
```

Este comando hará lo siguiente:
- Construirá las imágenes de Docker para el frontend, backend y base de datos (MySQL).
- Levantará los contenedores y expondrá los puertos necesarios.

- El frontend estará disponible en [http://localhost:5173](http://localhost:5173).
- El backend estará disponible en [http://localhost:3000](http://localhost:3000).
  
#### Acceder a la aplicación

Una vez que Docker haya levantado los contenedores, puedes acceder a las siguientes URL:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)
- Swagger para la API del backend: [http://localhost:3000/api](http://localhost:3000/api)

### 3. Despliegue en Kubernetes

#### Crear los recursos de Kubernetes

Aplica los archivos de configuración de Kubernetes:

```bash
kubectl apply -f database-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f services.yaml
```

#### Acceder a la aplicación desplegada en Kubernetes

Si estás utilizando Minikube, puedes usar el siguiente comando para exponer el servicio de frontend en un puerto local:

```bash
minikube service frontend --url
```

### 4. Dependencias del Proyecto

#### Backend

1. Navega al directorio del `backend/`.
2. Instala las dependencias:

```bash
cd backend
npm install
```

#### Frontend

1. Navega al directorio del `frontend/`.
2. Instala las dependencias:

```bash
cd frontend
npm install
```

### 5. Variables de Entorno

Este proyecto usa algunas variables de entorno que deben ser configuradas:

- **DB_HOST**: Dirección del contenedor de la base de datos (en Docker será `database`).
- **DB_PORT**: El puerto donde MySQL está corriendo (3306).
- **DB_USER**: El nombre de usuario para la base de datos.
- **DB_PASSWORD**: La contraseña para la base de datos.
- **DB_NAME**: El nombre de la base de datos que se utiliza.
- **JWT_SECRET**: La clave secreta utilizada para la autenticación JWT.
  
Puedes encontrar estas configuraciones dentro de los archivos `.env` correspondientes al frontend y backend.

### 6. Configuración de DockerHub

Si deseas subir tus imágenes a DockerHub, sigue estos pasos:

1. **Inicia sesión en DockerHub**:

```bash
docker login
```

2. **Etiqueta las imágenes**:

```bash
docker tag user-management-backend <your-dockerhub-username>/user-management-backend
docker tag user-management-frontend <your-dockerhub-username>/user-management-frontend
docker tag mysql:8 <your-dockerhub-username>/mysql:8
```

3. **Sube las imágenes**:

```bash
docker push <your-dockerhub-username>/user-management-backend
docker push <your-dockerhub-username>/user-management-frontend
docker push <your-dockerhub-username>/mysql:8
```

### 7. Notas

- Asegúrate de que Docker y Kubernetes estén corriendo antes de ejecutar los comandos.
- Los archivos de configuración de Kubernetes, como `database-deployment.yaml`, `backend-deployment.yaml`, `frontend-deployment.yaml` y `services.yaml`, deben estar correctamente configurados con los detalles de la base de datos y los servicios.

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:
1. Haz un fork de este repositorio.
2. Crea una nueva rama (`git checkout -b feature-xyz`).
3. Realiza tus cambios.
4. Haz commit de los cambios (`git commit -am 'Añadir feature xyz'`).
5. Haz push a tu rama (`git push origin feature-xyz`).
6. Crea un pull request.

---

¡Gracias por usar este proyecto!

```
