const mb = require('mountebank');
const settings = require('./src/shared/settings');
const customerService = require('./src/virtual-services/customer/customer-service');
const panService = require('./src/virtual-services/pan/pan-service');

const mbServerInstance = mb.create({
    port: settings.port,
    pidfile: '../mb.pid',
    logfile: '../mb.log',
    protofile: '../protofile.json',
    ipWhitelist: ['*'],
    allowInjection: true
});

mbServerInstance.then(function () {
    panService.panDetails();
    customerService.addService();
    customerService.postService();
});