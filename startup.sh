#!/bin/bash

if [ -z "$(ls -A ./mariadb/initdb)" ] && [ -z "$(ls -A ./mongo/dump)"]; then
echo "Init folder of MariaDB ./mariadb/initdb or MongoDB ./mongo/dump is empty"
else
    docker-compose up -d mariadatabase
    docker-compose up -d mongodatabase 

    RET=1
    until [ ${RET} -eq 0 ]; do
        docker-compose exec -T mongodatabase sh -c 'mongo chartissimo -u admin -p admin --authenticationDatabase admin --host mongodatabase' < ./mongo/createDbUser.js
        RET=$?
        if [ "$RET" != 0 ]; then
            echo "Creating user FAILED. Trying it again..."
        else 
            echo "Creation successfull"
        fi
    done

    docker-compose exec -T mongodatabase sh -c 'mongorestore -u admin -p admin --authenticationDatabase admin --db chartissimo --drop --archive ' < ./mongo/dump/chartissimo.dump
    echo "INITIALIZING DB! THIS COULD TAKE UP TO 20 SECONDS"
    sleep 20s
    exec docker-compose up 
fi