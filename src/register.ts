import * as express from "express";
import { Router } from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { Param, getClassMeta } from './decorator'

/**
 * Extract paramters from request.
 */
function extractParameters(req, res, params: Param[]) {
    let args = [];
    if (!params) return;

    let paramHandlerTpe = {
        'query': (paramName: string) => req.query[paramName],
        'path': (paramName: string) => req.params[paramName],
        'form': (paramName: string) => req.body[paramName],
        'cookie': (paramName: string) => req.cookies && req.cookies[paramName],
        'header': (paramName) => req.get(paramName),
        'request': () => req,
        'response': () => res,
    }

    params.forEach(param => {
        args.push(paramHandlerTpe[param.type](param.name))
    })

    return args;
}

/**
 * Register Service Class.
 * 
 * ```
 * RegisterService(express, [servies])
 * ```
 * 
 */
export function RegisterService(app, services: any[]) {

    let router: Router = Router();

    services.forEach((Service) => {
        let meta = getClassMeta(Service.prototype);

        let serviceInstance = new Service();

        let routes = meta.routes;
        let baseUrl = meta.baseUrl;

        for (const methodName in routes) {
            let httpMethod = routes[methodName].httpMethod;

            // express route callback
            let fn = (req, res, next) => {
                let args = extractParameters(req, res, routes[methodName]['params']);
                let result = Service.prototype[methodName].apply(serviceInstance, args);

                if (result instanceof Promise) {
                    result.then(value => {
                        !res.headersSent && res.send(value);
                    }).catch(err => {
                        next(err);
                    });
                } else if (result !== undefined) {
                    !res.headersSent && res.send(result);
                }
            };

            // register sub route
            router[httpMethod].apply(router, [routes[methodName].subUrl, fn]);
        }

        app.use(baseUrl,
            bodyParser.json(),
            cookieParser(),
            router);
    })
}