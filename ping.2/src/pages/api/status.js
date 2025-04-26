import { getLatestPingMessage } from '../../lib/pingStore';

export default function handler(req, res) {
  const message = getLatestPingMessage();
  res.status(200).json({ message });
}
