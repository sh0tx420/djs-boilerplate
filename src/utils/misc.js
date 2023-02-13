const fs = require("node:fs");
const toml = require("toml");

module.exports = {
    config: toml.parse(fs.readFileSync("config.toml"))
};
