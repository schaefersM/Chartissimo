#!/bin/bash

ls /dumps

RET=1
until [ ${RET} -eq 0 ]; do
    mongo chartissimo -u admin -p admin --authenticationDatabase admin --host mongodatabase < createDbUser.js
    RET=$?
    if [ "$RET" != 0 ]; then
        echo "Creating user FAILED. Trying it again..."
    else 
        echo "Creation successfull"
    fi
done

mongorestore -u admin -p admin --authenticationDatabase admin --host mongodatabase --db chartissimo --drop --archive < /dumps/chartissimo.dump

exit


# restoreCollection() {
#     file=$( echo "$1" | cut -d "." -f1 )
#     RET=1
#     until [ ${RET} -eq 0 ]; do
#         mongorestore -u admin -p admin --authenticationDatabase admin --host mongodatabase --db chartissimo --drop $1
#         RET=$?
#         if [ "$RET" != 0 ]; then
#             echo "Restoring collection FAILED. Trying it again..."
#         else 
#             echo "Restoring successfull"
#         fi
#     done
# }

# for entry in /dumps/*.bson
# do 
#     restoreCollection $entry
# done
# exit