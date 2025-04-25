import dotenv from 'dotenv';
dotenv.config();
import axios from "axios";

//console.log("Environment Variables Loaded:", process.env.RENDER_LINK, process.env.RENDER_API_KEY);

export async function pingBackend(tries = 0) {
  try {
    let link_ping = `https://${process.env.RENDER_LINK}/dashboard/test`;
    //console.log(link_ping);
    const response = await axios.get(link_ping, {
      headers: {
        'Authorization': `Bearer ${process.env.RENDER_API_KEY}`
      },
      timeout: 6000 // 6-seconds timeout
    });
    const ping_message = response.data.message; // new variable storing message
    console.log("Ping successful:", ping_message);
  } catch (error) {
    console.log("Ping failed:");
    //console.error("Ping failed:", error);
    if (tries < 3) {
      await pingBackend(tries + 1);
    } else {
      console.log("Max retries reached, skipping further attempts.");
    }
  }
}

(async () => {
  for (let i = 0; i < 10; i++) {
    await pingBackend();
    await new Promise(resolve => setTimeout(resolve, 10 * 60 * 1000));
  }
})();
