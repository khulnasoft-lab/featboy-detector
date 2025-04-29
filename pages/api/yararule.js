export default async function handler(req, res) {
    if (req.method === "POST") {
      const { indicators } = req.body;
  
      const yaraRule = `
  rule FeatBoy_Infection_Detected
  {
      meta:
          description = "Auto-generated YARA rule for Feat Boy Panel"
      strings:
          ${indicators.map((indicator, idx) => `$ind${idx} = "${indicator}"`).join("\n        ")}
      condition:
          any of them
  }
      `.trim();
  
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", "attachment; filename=\"featboy_detected.yar\"");
      res.send(yaraRule);
    } else {
      res.status(405).end();
    }
  }
  