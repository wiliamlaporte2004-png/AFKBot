const { 
  Client, 
  GatewayIntentBits, 
  REST, 
  Routes, 
  SlashCommandBuilder 
} = require("discord.js");

require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// commandes
const commands = [
  new SlashCommandBuilder()
    .setName("startserver")
    .setDescription("Demande de démarrage serveur")
].map(cmd => cmd.toJSON());

// ready
client.once("ready", async () => {
  console.log("Bot connecté !");

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: commands }
  );

  console.log("Commande enregistrée !");
});

// interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "startserver") {

    await interaction.reply("📨 Demande envoyée au staff.");

    const user = await client.users.fetch("1148281238935834645");
    user.send(`⚠️ ${interaction.user.tag} veut démarrer le serveur`);
  }
});

// login
client.login(process.env.DISCORD_TOKEN);