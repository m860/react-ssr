import fs from "fs";

class Html {
    constructor() {
        this.html = null;
    }

    getHtml() {
        if (process.env.NODE_ENV === "production") {
            if (this.html) {
                return this.html;
            }
        }
        const htmlPath = `${process.cwd()}/public/index.html`;
        console.info(`index.html的所在路径为:${htmlPath}`);
        this.html = fs.readFileSync(htmlPath, "utf8");
        return this.html;
    }
}

export default new Html();
