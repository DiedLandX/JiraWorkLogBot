import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import { worklogInteraction } from "./commands/worklogInteraction";
import { config } from "dotenv";
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

config({ path: "../.env" });
console.log(process.env.DISCORD_TOKEN);

const TOKEN = process.env.DISCORD_TOKEN;

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
