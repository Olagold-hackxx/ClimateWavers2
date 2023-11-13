const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
  
    new transports.Console({
      level: 'info', 
    }),
  
    new transports.File({
      filename: 'error.log',
      level: 'error', 
      format: format.combine(format.uncolorize()), 
    }),
    new transports.File({
      filename: 'combined.log',
      format: format.combine(format.uncolorize()), 
    }),
    
  ],
  level: 'info', 
});

module.exports = logger;
