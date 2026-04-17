import { Fraunces, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const dmMono = DM_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const metadata = {
  title: 'advAIsor - AI Agents Trained on Your Knowledge',
  description:
    'Train an AI on your documents, website, or internal data. Deploy it on your website, WhatsApp, or any channel. In 10 minutes.',
  keywords: ['AI', 'chatbot', 'knowledge base', 'RAG', 'customer support'],
  authors: [{ name: 'advAIsor' }],
  openGraph: {
    title: 'advAIsor - AI Agents Trained on Your Knowledge',
    description: 'Deploy intelligent AI agents in 10 minutes',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
