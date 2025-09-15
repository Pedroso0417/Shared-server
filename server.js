import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Example endpoint to share some data
app.get("/data", (req, res) => {
  res.json({ message: "Hello from your local Wi-Fi server!", time: new Date() });
});

// Get your local IP address (for mobile access)
function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Access from other devices: http://${getLocalIP()}:${PORT}`);
});

