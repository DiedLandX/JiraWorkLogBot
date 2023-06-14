import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import { worklogInteraction } from "./commands/worklogInteraction";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const TOKEN =
  "MTA0ODM0NTA5MjYzODkwODQ4OQ.GfU_pf.iMFG6uBDUI_67hZGHU9BZSfhawiFxlFCFxR9fk";

const commands = [
  {
    name: "logwork",
    description: "Start Work log process",
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1048345092638908489"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Chat interactions
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "logwork") {
    await worklogInteraction(interaction);
  }
});

client.on("messageCreate", async (msg) => {
  console.log(msg);
});

client.login(TOKEN);
