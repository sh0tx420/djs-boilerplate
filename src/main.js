const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits, Events } = require("discord.js");
const logging = require("./utils/logging");
const { config } = require("./utils/misc");

const bot = new Client({ intents: [GatewayIntentBits.Guilds]});
bot.commands = new Collection();


const paths = {
    CmdPath: path.join(__dirname, "commands"),
    EventPath: path.join(__dirname, "events")
};

// Load slash commands from category directories
for (const cat of fs.readdirSync(paths.CmdPath)) {
    const commands = fs.readdirSync(`${paths.CmdPath}/${cat}`).filter(file => file.endsWith(".js"));

    for (const file of commands) {
        const command = require(`${path.join(paths.CmdPath, cat, file)}`);

        bot.commands.set(command.data.name, command);
    }
}

// Load event files
for (const evfile of fs.readdirSync(`${paths.EventPath}`).filter(file => file.endsWith(".js"))) {
    const event = require(`${path.join(paths.EventPath, evfile)}`);

    if (event.once) {
        bot.once(event.name, (...args) => event.execute(...args));
    }
    else {
        bot.on(event.name, (...args) => event.execute(...args));
    }
}

bot.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    }
    catch (error) {
        await logging.error(`Failed executing command ${interaction.commandName}\n${error}`);
    }
});

/*************/

bot.login(config.discord.token);
