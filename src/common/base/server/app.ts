import express from 'express'
import AppRouting from "@base/routing/read_routes"
import env from '@/common/env';
import RouteObject from '@/@types/routing';
import morgan from 'morgan';
import {logger} from "@base/logger/Logger.ts";

class ExpressApp{
    private _app = express()
    private static instance: ExpressApp;
    public static getInstance(): ExpressApp {
		if(this.instance == null) {
			this.instance = new ExpressApp();
		}
		return this.instance;
	}

    private constructor(){
        this.loadMiddlewares()
        this.loadRoutes()
        this.run()
    }

    private loadRoutes(){
        logger.info("Loading routes...")
        const allRoutes = AppRouting.getRoutes()
        allRoutes.forEach((route) => {
            const express_route = express.Router();
            const routePath: RouteObject[] = require(`../../../routes/${route}`).default
            routePath.forEach((routeInstance) => {
                express_route[routeInstance.method || 'get'](routeInstance.path, routeInstance.handler)
            })
            this._app.use(express_route)
        })
        logger.info(`${allRoutes.length} routes loaded!`)
    }

    private loadMiddlewares(){
        this._app.use(express.json())
        this._app.use(express.urlencoded({ extended: true }))
        this._app.use(express.static('public'))
        if(env.MORGAN == "dev"){
            logger.info("Morgan is enabled!")
            this._app.use(morgan('dev'))
        }
    }

    private run(){
        const _PORT = env.PORT
        this._app.listen(_PORT, () => {
            logger.info(`=> App is running on port ${_PORT}!`)
        })
    }
}

export default ExpressApp
