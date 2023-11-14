import path from 'path'
import * as winston from 'winston'
import WinstonDaily from 'winston-daily-rotate-file'
import {isProduction} from "@base/helper/System.ts";
class WinstonLogger {
    private _prodTransports: WinstonDaily
    private _localTransports: winston.transports.ConsoleTransportInstance
    private _loggerWinston: winston.Logger
    private _logFormat: winston.Logform.Format

    constructor() {
        this._logFormat = winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.splat(),
            winston.format.printf(
                ({ timestamp, level, message }) =>
                    `[${timestamp}] [${level}]: ${this._stringify(message)}`
            )
        )
        this._prodTransports = new WinstonDaily({
            datePattern: 'YYYY-MM-DD',
            dirname: path.join(__dirname, '..', '..', '..', 'logs'),
            filename: `%DATE%.log`,
            maxFiles: 30,
            handleExceptions: true,
            json: false,
            zippedArchive: true,
            utc: true,
        })

        this._localTransports = new winston.transports.Console({})

        this._loggerWinston = winston.createLogger({
            format: this._logFormat,
            transports: [
                isProduction() ? this._prodTransports : this._localTransports,
            ],
        })
    }

    trace(msg: string) {
        this._loggerWinston.log('trace', msg)
    }

    debug(msg: string) {
        this._loggerWinston.debug(msg)
    }

    info(msg: string) {
        this._loggerWinston.info(msg)
    }

    warn(msg: string) {
        this._loggerWinston.warn(msg)
    }

    error(msg: string) {
        this._loggerWinston.error(msg)
    }

    fatal(msg: string) {
        this._loggerWinston.log('fatal', msg)
    }

    _stringify(value: string): string {
        switch (typeof value) {
            case 'object': {
                return JSON.stringify(value)
            }
            default: {
                return String(value)
            }
        }
    }
}

export const logger = new WinstonLogger()
