#!/bin/bash  

#Wenn das Dump in den bind-mount Order im Container oder im Volume Ordner liegen soll
# docker-compose exec -T mongodatabase sh -c 'mongodump -u admin -p admin --authenticationDatabase admin --db chartissimo --archive=/dump/chartissimo.dump '

#Wenn das Dump NUR auf dem Host System liegen soll.
docker-compose exec -T mongodatabase sh -c 'mongodump -u admin -p admin --authenticationDatabase admin --db chartissimo --archive' > ./dump/chartissimo.dump