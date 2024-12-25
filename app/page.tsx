import Image from 'next/image'

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to chesstools.org</h1>
      <p className="mb-4">
        This tool hosts useful tools for chess players and organizers of chess tools.
      </p>
      <Image src="/gh.jpg" alt="Chess Tournament in Toronto" className="w-full h-auto m-2 p-5" width={800} height={500}/>
      </div>
  )
}

