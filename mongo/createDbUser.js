//get import in init.sh

db.createUser({user: "admin", pwd: "admin", roles: [{role: "readWrite", db: "chartissimo"},{role: "dbAdmin", db: "chartissimo"}]})
