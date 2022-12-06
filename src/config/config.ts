import _ from "lodash";
import fs from "fs";
import path from "path";

const defaultConfigPath = path.join(process.cwd(), "/config");

function loadConfigFile(filename: string) {
    if (fs.existsSync(filename)) {
        const content = fs.readFileSync(filename, { encoding: "utf-8" });
        return JSON.parse(content);
    }
    return null;
}

function loadConfig(configPath: string = defaultConfigPath) {
    const defaultConfig = loadConfigFile(path.join(configPath, "config.json"));
    let config = defaultConfig;
    const envConfig = loadConfigFile(path.join(configPath, (process.env.NODE_ENV || "development") + ".json"));

    if (envConfig) {
        config = _.assignIn(config, envConfig);
    }

    if (process.env.NODE_ENV !== "test") {
        console.log("==> Configuration <== \n%s\n=====================", JSON.stringify(config, null, 2));
    }
    return config;
}

const config: any = fs.existsSync(defaultConfigPath) ? loadConfig() : {};

export { config, loadConfig };
