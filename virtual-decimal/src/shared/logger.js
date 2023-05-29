const { createLogger, format, transports } = require('winston');

const logConfiguration = {
    transports: [
        new transports.Console()
    ],
    format: format.combine(
        format.label({
            label: `Label🏷️`
        }),
        format.timestamp({
           format: 'DD-MMM-YYYY HH:mm:ss'
       }),
        format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
        format.prettyPrint(),
        format.colorize()
    )
};

module.exports = createLogger(logConfiguration);