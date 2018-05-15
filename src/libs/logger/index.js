export default __SERVER__ ? require("./logger.server").default : require("./logger.client").default

