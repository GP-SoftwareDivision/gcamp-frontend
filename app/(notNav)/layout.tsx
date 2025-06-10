export default function NotNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex'>
      <div className='lg:ml-72 w-full'>{children}</div>
    </div>
  )
}
