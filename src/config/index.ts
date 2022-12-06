import { config as libConfig } from "./config";

type Config = {
    service: {
        port: number
    },
    database: {
        uri: string
    }
}

const config: Config = libConfig;
export default config;