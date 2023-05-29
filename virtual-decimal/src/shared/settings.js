const dotenv = require("dotenv/config");
module.exports = {
  port: parseInt(process.env.APP_PORT, 10) || 5000,
  customer_service_get_port:
    parseInt(process.env.CUSTOMER_SERVICE_PORT, 10) || 5001,
  customer_service_post_port:
    parseInt(process.env.CUSTOMER_SERVICE_PORT, 10) || 5002,
  cibil_service_port: parseInt(process.env.CIBIL_SERVICE_PORT, 10) || 5204,
};
