import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.accessToken });

    const gmail = google.gmail({ version: 'v1', auth });

    // Fetch list of messages
    const listResponse = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 30,
    });

    const messageIds = listResponse.data.messages.map(message => message.id);
    const messages = [];

    for (const messageId of messageIds) {
      const messageResponse = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
      });

      const messageData = messageResponse.data;
      const headers = messageData.payload.headers;

      // Extract sender, subject, and body
      const fromHeader = headers.find(header => header.name === 'From');
      const subjectHeader = headers.find(header => header.name === 'Subject');
      
      let body = '';
      if (messageData.payload.parts) {
        for (const part of messageData.payload.parts) {
          if (part.mimeType === 'text/plain') {
            body = Buffer.from(part.body.data, 'base64').toString('utf-8');
          } else if (part.mimeType === 'text/html') {
            body = Buffer.from(part.body.data, 'base64').toString('utf-8');
          }
        }
      } else {
        body = Buffer.from(messageData.payload.body.data, 'base64').toString('utf-8');
      }

      messages.push({
        id: messageId,
        threadId: messageData.threadId,
        from: fromHeader ? fromHeader.value : '(No sender)',
        subject: subjectHeader ? subjectHeader.value : '(No subject)',
        body: body,
      });
    }

    return NextResponse.json({ emails: messages });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ error: 'Error fetching emails' }, { status: 500 });
  }
}
