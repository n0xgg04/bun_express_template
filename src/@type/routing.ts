import {Request, RequestHandler, Response} from "express"

export default interface RouteObject {
    method?: "post" | "get" | "put" | "delete" | "patch" | "options" | "head"
    path: string
    handler: (req: Request, res: Response) => void,
    middlewares?: RequestHandler[]
}