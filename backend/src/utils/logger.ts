import winston from 'winston';
const { combine, timestamp, colorize, align, printf, simple } = winston.format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

export const Logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
  levels,
  defaultMeta: { appName: 'foodCompany' },
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  Logger.add(
    new winston.transports.Console({
      format: combine(colorize({ level: true, message: true })),
    }),
  );
}
