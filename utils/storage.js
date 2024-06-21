const fs = require('fs');

function appendData(filename, data, callback) {
    fs.appendFile(filename, JSON.stringify(data, null, 2) + ',\n', callback);
}

module.exports = { appendData };
