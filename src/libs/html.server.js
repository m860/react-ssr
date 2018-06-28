import fs from "fs";
import logger from "./logger"

class Html {
    constructor() {
        this.html = null;
    }

    getHtml() {
        if (this.html) {
            return this.html;
        }
        const htmlPath = `${process.cwd()}/public/index.html`;
        logger.info(`index.html的所在路径为:${htmlPath}`);
        this.html = fs.readFileSync(htmlPath, "utf8");
        return this.html;
    }
}

export default new Html();
