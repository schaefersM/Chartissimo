#!/bin/bash  

#Wenn ich ein bind-mount in den Ordner /dump/chartissimo oder ein Volume habe
# if [ -z "$(ls -A ./mongodb/dump)" ]; then
# echo "Init folder of the MongoDB ./mongodb/dump is empty"
# else
#     docker-compose exec -T mongodatabase sh -c 'mongorestore -u admin -p admin --authenticationDatabase admin --db chartissimo --drop --archive=/dump/chartissimo.dump'
# fi

# Wenn das Dump auf dem Docker Host liegen und kein bind-mount da ist.
docker-compose exec -T mongodatabase sh -c 'mongorestore -u admin -p admin --authenticationDatabase admin --db chartissimo --drop --archive ' < ./mongodb/dump/chartissimo.dump

exit