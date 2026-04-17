import express, { Request, Response } from 'express';
import morgan from 'morgan';
import type { ClientCall } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(express.json());

/**
 * POST /send-notification
 * Receives a sales call record and sends a notification.
 *
 * @body {ClientCall} - companyName, contactName, callOutcome, shortSummary
 * @returns 200 { success: true, message: string }
 * @returns 400 { success: false, message: string } if any field is missing
 */
app.post('/send-notification', async (req: Request<{}, {}, ClientCall>, res: Response) => {
  const { companyName, contactName, callOutcome, shortSummary } = req.body;

  if (!companyName || !contactName || !callOutcome || !shortSummary) {
    res.status(400).json({ success: false, message: 'All fields are required' });
    return;
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  res.status(200).json({ success: true, message: 'Notification sent successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error('Failed to start server:', err.message);
  }
  process.exit(1);
});
