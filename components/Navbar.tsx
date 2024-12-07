import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Chess Tools
        </Link>
        <div className="space-x-4">
          <Link href="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link href="/generator" className="text-white hover:text-gray-300">
            Board Generator
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
