const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { config } = require("../../utils/misc");


async function clean_code(text) {
    if (text && text.constructor.name == "Promise")
        text = await text;
    
    if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 1 });
    
    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replaceAll(config.discord.token, "<>");
    
    return text;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Runs code inside the bot's environment.")
        .addStringOption(option => 
            option
                .setName("code")
                .setDescription("Code to run")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const evalcode = interaction.options.getString("code");

        if (config.discord.devids.includes(interaction.user.id)) {
            let result;

            try {
                result = await eval(evalcode);
            }
            catch (error) {
                await interaction.reply({ content: `${error}`, ephemeral: true });
            }

            const cleanresult = clean_code(result);

            await interaction.reply({ embeds: [{
                color: 0x0099ff,
                title: "Result",
                fields: [
                    {
                        name: "Input",
                        value: `\`\`\`js\n${evalcode}\n\`\`\``
                    },
                    {
                        name: "Output",
                        value: `\`\`\`js\n${cleanresult}\n\`\`\``
                    }
                ]
            }]});
        }
        else {
            await interaction.reply({ content: "You don't have access to this command.", ephemeral: true });
        }
    }
};
