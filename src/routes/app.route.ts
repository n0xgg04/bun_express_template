import RouteObject from "@/@types/routing"

export default [
    {
        method: "get",
        path: "/",
        handler: (req, res) => {
            res.send("Hellossss Worssld")
        }
    }
] as RouteObject[]
