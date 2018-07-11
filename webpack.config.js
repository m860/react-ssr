module.exports = function () {
    return [
        require("./webpack.browser.config"),
        require("./webpack.server.config")
    ];
};
