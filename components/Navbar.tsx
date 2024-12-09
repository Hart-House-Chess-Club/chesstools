import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          <Image 
            src="/chesstools.svg" 
            alt="Chess Tools"
            width={100} // Set appropriate width
            height={50} // Set appropriate height
          />
        </Link>
        <div className="space-x-4">
          <Link href="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link href="/board" className="text-white hover:text-gray-300">
            Board
          </Link>
          <Link href="/play" className="text-white hover:text-gray-300">
            Play
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
