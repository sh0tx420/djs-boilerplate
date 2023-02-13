const { REST, Routes } = require("discord.js");
const { config } = require("../utils/misc");
const logging = require("../utils/logging");
const path = require("node:path");
const fs = require("node:fs");

const CmdPath = path.resolve(__dirname, "../commands");

const cmddata = [];

const rest = new REST({ version: "10" }).setToken(config.discord.token);

async function DeploySlashCommands(guildid) {
    // Load slash commands from category directories
    for (const cat of fs.readdirSync(CmdPath)) {
        const commands = fs.readdirSync(`${CmdPath}/${cat}`).filter(file => file.endsWith(".js"));

        for (const file of commands) {
            const command = require(`../commands/${cat}/${file}`);
            await logging.info(`Loaded command ${file}`);

            cmddata.push(command.data.toJSON());
        }
    }

    try {
        const data = await rest.put(
            Routes.applicationGuildCommands(config.discord.clientid, guildid),
            { body: cmddata }
        );
        await logging.info(`Successfully refreshed ${data.length} slash commands to guild ${guildid}`);
    }
    catch (error) {
        await logging.error(error);
    }
}

module.exports = DeploySlashCommands;
