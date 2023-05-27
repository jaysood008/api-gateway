const logger = require("../../../shared/logger");
const responseTemplate = require("../../../virtual-services/bureau/cibil/response-template");

const args = process.argv;
var response = JSON.parse(process.env.MB_RESPONSE);
if (
  JSON.stringify(Object.values(response.body)).includes(
    "${row}[" + args[2] + "]"
  )
) {
  response.body = responseTemplate.notFoundTemplate;
  response.statusCode = 200;
}
console.log(JSON.stringify(response));
