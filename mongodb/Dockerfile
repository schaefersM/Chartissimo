FROM mongo:4.4.4
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=admin
COPY ./dump /dumps
COPY ./init.sh /docker-entrypoint-initdb.d
COPY ./createDbUser.js /docker-entrypoint-initdb.d
