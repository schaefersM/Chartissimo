#!/bin/bash

docker-compose exec -T mongodatabase sh -c 'mongorestore -u admin -p admin --authenticationDatabase admin --host mongodatabase --db chartissimo --drop --archive < ./dump/chartissimo.dump'

exit


#When you saved your dump as .bson files
# RET=1
# restoreCollection() {
#     file=$( echo "$1" | cut -d "." -f1 )
#     RET=1
#     until [ ${RET} -eq 0 ]; do
#         mongorestore -u admin -p admin --authenticationDatabase admin --host mongodatabase --db chartissimo --drop $1
#         RET=$?
#         if [ "$RET" != 0 ]; then
#             echo "Restoring collection FAILED. Trying it again..."
#         else 
#             echo "Restoring successful"
#         fi
#     done
# }

# for entry in /dumps/*.bson
# do 
#     restoreCollection $entry
# done

# exit