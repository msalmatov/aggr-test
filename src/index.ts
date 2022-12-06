import app from "./app";
import { initDb } from "./db";

async function init() {
    await initDb();
}

init().then(() => {
    app.listen(app.get("port"), () => {
        console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
    });
}).catch(err => {
    console.log(err);
});