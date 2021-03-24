const mysql = require("mysql");
const connection = mysql.createConnection({
    multipleStatements: true,
    host: "localhost",
    user: "chart",
    password: "chart",
    database: "chartissimo",
});

connection.connect((err) => {
    if (err) {
        console.log(new Date(), err);
        throw err;
    } else {
        console.log(new Date(), "connected to MySQL");
    }
});

const queryBuilder = (host, startMonth, endMonth, randomRatio) => {
    let dates = [];
    for (let month = startMonth; month <= endMonth; month++) {
        for (let day = 1; day <= 30; day++) {
            dates.push(`2021-${month}-${(day = day < 10 ? `${day}` : day)}`);
        }
        if (month % 2) {
            dates.push(`2021-${month}-31`);
        }
    }
    const getValues = (partial, host, hour, minute, date) => {
        const getRandomValue = (type) => {
            const getRandomRange = () => Math.floor(Math.random() * 40);
            const randomRange = getRandomRange();
            let value;
            const randomValue =
                type === "hum" ? 90 - randomRange : 40 - randomRange;
                value = randomValue;
            return value;
        };

        const isPartialData = () => Math.random() >= randomRatio;
        const isEmptyData = partial ? isPartialData() : false
        const values = [
            isEmptyData ? {} : {
                insertHost: host ,
                host: `${host}_hum`,
                value: getRandomValue("hum"),
                hour,
                minute,
                date,
            },
            isEmptyData ? {} :
            {
                insertHost: host,
                host: `${host}_temp`,
                value: getRandomValue(partial, "temp"),
                hour,
                minute,
                date,
            },
        ];

        
        values.forEach(({insertHost, host, value, hour, minute, date}) => {
            if (insertHost) {
                queries.push([host, value, hour, minute, date]);
            }
        })
    }

    const minutes = Array.from(new Array(60), (_, minute) => minute
    );

    const hours = Array.from(new Array(24), (_, hour) => hour
    );

    const queries = []
        dates.forEach((date) => {
            hours.forEach((hour) => {
                minutes.forEach((minute) => {
                    const dateCase = date.split("-")[2] % 3;
                    switch (dateCase) {
                        case 0:
                            break;
                        case 1:
                            getValues(false, host, hour, minute, date);
                            break;
                        case 2:
                            getValues(true, host, hour, minute, date);
                            break;
                        default:
                            break;
                    }
                })
            })
        })
    return queries
}




const hosts = ["kostbar", "architektur", "wirtschaft", "informatik"]


hosts.forEach(host => {
    const test = queryBuilder(host, 3, 5, 0.7);
    connection.query(`TRUNCATE TABLE ${host}`, function (err, result) {
        if (err) throw err;
        console.log(
            `${host} truncated`
        );
    });
    console.log(test.length);
    const section = (test, start) => {
        const part = test.slice(start, start + 15000);
        const sql = `INSERT INTO ${host} (host, value, hour, minute, datum) VALUES ?`;

        connection.query(sql, [part], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
        const newStart = start + 15000;
        if (part.length === 15000) {
            section(test, newStart);
        }
    }
    section(test, 0);
})




