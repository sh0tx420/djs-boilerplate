# Discord.JS Boilerplate bot code
This repository contains boilerplate code for a basic Discord.JS bot.

## Features
- 🌠 Thorougly configured ESLint for good code style
- ⚙️ TOML-based configuration
- 🌈 Colorful custom logging that doesn't use `console.log()`
- 📁 Organized folder structure for adding commands inside categories

## Configuration
```toml
[discord]
token = "S9as98Nkis1MDY2.G4UZHP.UcYR5l4HIo_WoT2L"
clientid = "999263814300205066"
devguildid = "1020299336275472394"
devids = ["790199140860428328", "432184099906519041"]
```
`token` - The token of the Discord bot.
<br>
`clientid` - Client ID of bot user.
<br>
`devguildid` - Developer guild id to deploy the slash commands before global commands.
<br>
`devids` - Array of IDs that are allowed to access restricted functions of the bot.
