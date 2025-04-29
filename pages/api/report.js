export default async function handler(req, res) {
    if (req.method === "POST") {
      const { indicators, userAgent, url } = req.body;
  
      const webhookUrl = "YOUR_DISCORD_WEBHOOK_URL"; // <-- Change this
  
      const content = {
        username: "FeatBoy Detector",
        embeds: [
          {
            title: "🚨 Feat Boy Malware Detected!",
            color: 16711680,
            fields: [
              { name: "User-Agent", value: userAgent },
              { name: "URL", value: url },
              { name: "Indicators", value: indicators.join("\n") }
            ],
            footer: {
              text: "Automated detection system",
            },
          }
        ]
      };
  
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
  
      res.status(200).json({ status: "Reported to Discord" });
    } else {
      res.status(405).end();
    }
  }
  