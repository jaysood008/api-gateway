const logger = require("./src/shared/logger")

const args = process.argv;
var response = JSON.parse(process.env.MB_RESPONSE)
if(JSON.stringify(Object.values(response.body)).includes("${row}["+args[2]+"]")) {
    response.body = {"status": "Record Not Found"};
    response.statusCode = 200
}
console.log(JSON.stringify(response));