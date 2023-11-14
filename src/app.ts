import ExpressApp from "@common/base/server/app";
import {logger} from "@base/logger/Logger.ts";

try {
    ExpressApp.getInstance()
}catch(error: unknown){
    logger.error(error as string)
}
