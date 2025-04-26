import { setLatestPingMessage } from '../../lib/pingStore';

let started = false;

export default function handler(req, res) {
  if (!started) {
    console.log('Starting background ping...');
    started = true;

    setInterval(async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL);
        const data = await response.json();
        console.log('Background ping successful:', data.message);
        setLatestPingMessage(data.message);
      } catch (error) {
        console.error('Background ping failed:', error);
        setLatestPingMessage('Ping failed');
      }
    }, 20000); // every 10 minutes
  }

  res.status(200).json({ message: 'Background ping started' });
}
