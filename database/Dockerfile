# Usamos la imagen oficial de MySQL 8.0
FROM mysql:8.0

# Configurar variables de entorno para la base de datos
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=user_management
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin

# Copiar el archivo de configuración y el script de inicialización
COPY my.cnf /etc/mysql/my.cnf
COPY init.sql /docker-entrypoint-initdb.d/

# Exponer el puerto de MySQL
EXPOSE 3306
