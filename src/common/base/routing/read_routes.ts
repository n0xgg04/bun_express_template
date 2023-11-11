import { readdirSync } from 'fs'
class AppRouting{
    constructor(){

    }

    public static routing(){
        
    }

    public static getRoutes(){
        const allRoutes = readdirSync(__dirname+"/../../../routes").filter((filename) =>  filename.includes('.route.ts'))
        return allRoutes
    }
}

export default AppRouting