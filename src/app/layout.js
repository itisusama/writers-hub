import './globals.css'

export const metadata = {
  title: 'Writer hub',
  description: 'write your favorite stories'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  )
}
