import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SQL Course',
  description: 'SQL Course',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div id="modal-root"></div>
        {children}
      <script async src="/preline.js"></script>
      </body>
    </html>
  )
}
