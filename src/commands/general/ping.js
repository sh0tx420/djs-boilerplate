const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows the ping of the bot"),
    async execute(interaction) {
        await interaction.reply(`:signal_strength: Ping: \`${interaction.client.ws.ping}\`ms`);
    }
};
