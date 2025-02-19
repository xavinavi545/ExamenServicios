# Usar una versión reciente de Node.js
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json e instalar dependencias antes de copiar el código fuente
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del backend
EXPOSE 3000

# Comando para iniciar en modo desarrollo con hot-reload
CMD ["npm", "run", "start:dev"]
