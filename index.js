const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is alive");
});

app.listen(PORT, () => {
  console.log("Keep alive actif sur port", PORT);
});

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

// Slash command
const commands = [
  new SlashCommandBuilder()
    .setName("startserver")
    .setDescription("Demande de démarrage serveur")
].map(cmd => cmd.toJSON());

// Ready
client.once("ready", async () => {
  console.log("Bot connecté !");

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: commands }
  );

  console.log("Commande /startserver enregistrée !");
});

// Interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "startserver") {
    await interaction.reply("📨 Demande envoyée au staff.");

    try {
      const user = await client.users.fetch("1148281238935834645"); // ID staff
      await user.send(`⚠️ ${interaction.user.tag} veut démarrer le serveur`);
    } catch (error) {
      console.error("❌ Impossible d'envoyer le DM :", error);
    }
  }
});

// Login
client.login(process.env.DISCORD_TOKEN);