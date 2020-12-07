const fs = require('fs');
const dataPath = './data/data.csv';

module.exports = {
    getRaw,
    getJson,
    getJsonById
}

function readData() {
    return new Promise((resolve, reject) => {
        let options = {
            encoding:'utf8'
        };
        return fs.readFile(dataPath, options, (error, data) => {
            if(error) {
                return reject(error);
            }
            return resolve(data);
        });
    });
}

async function getRaw() {
    return await readData();
}

async function getJson() {
    let data = await readData();
    let entries = data.split('\n');
    let headers = entries.splice(0, 1)[0].split(',');
    return entries.map( entry => {
        let values = entry.split(',');
        let json = {};
        for(let i in values) {
            let value = values[i];
            let header = headers[i];
            json[`${header}`] = value;
        }
        return json;
    });
}

async function getJsonById(id) {
    let data = await readData();
    let entries = data.split('\n');
    let headers = entries.splice(0, 1)[0].split(',');
    for(let i in entries) {
        let entry = entries[i];
        let values = entry.split(',');
        if(values[0] == id) {
            let json = {};
            for(let j in values) {
                let value = values[j];
                let header = headers[j];
                json[`${header}`] = value;
            }
            return json;
        }
    }
    return null;
}
