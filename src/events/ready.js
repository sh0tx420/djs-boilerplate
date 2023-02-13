const { Events } = require("discord.js");
const { config } = require("../utils/misc");
const logging = require("../utils/logging");
const DeploySlashCommands = require("../utils/loadcmds");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(bot) {
        // Deploy slash commands and print useful information
        await DeploySlashCommands(config.discord.devguildid);

        for (const str of [
            "Bot instance is ready!",
            `  · User: ${bot.user.tag}`,
            `  · ID: ${bot.user.id}`,
            `  · Servers: ${bot.guilds.cache.size}\n`,
        ]) {
            await logging.info(str);
        }
    }
};
