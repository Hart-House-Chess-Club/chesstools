import Image from "next/legacy/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChessPieces } from "@/components/chess-pieces"
import { ChessBoard } from "@/components/chess-board"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="absolute -top-24 -left-24 opacity-10">
          <ChessBoard size={300} />
        </div>
        <div className="absolute -bottom-24 -right-24 opacity-10">
          <ChessBoard size={300} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                Welcome to <span className="text-primary">ChessTools.org</span>
              </h1>
              <p className="text-xl mb-8 text-muted-foreground max-w-2xl">
                Powerful tools for chess players, coaches, and tournament organizers to analyze, visualize, and improve
                your chess experience.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/board">Interactive Board</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/generator">FEN to PNG</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <ChessPieces className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Chess Tools at Your Fingertips</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 mb-4 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M12 2L8 6H16L12 2Z" fill="currentColor" />
                    <path d="M12 6V10M8 10H16M7 14H17M5 18H19M7 22H17" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <CardTitle>FEN to PNG Converter</CardTitle>
                <CardDescription>Convert Forsyth-Edwards Notation to high-quality chess board images</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Generate beautiful chess diagrams from FEN strings for your articles, books, or teaching materials.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/generator">Try Converter</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 mb-4 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M2 8H22M2 14H22M8 2V22M14 2V22" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <CardTitle>Interactive Board</CardTitle>
                <CardDescription>Analyze positions and play against the computer</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Set up positions, analyze variations, and test your skills against different difficulty levels.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/board">Open Board</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 mb-4 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path
                      d="M12 2V6M12 22V18M4.93 4.93L7.76 7.76M19.07 19.07L16.24 16.24M2 12H6M22 12H18M4.93 19.07L7.76 16.24M19.07 4.93L16.24 7.76"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <CardTitle>Play</CardTitle>
                <CardDescription>Play against various levels of difficulty</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Currently a developing feature with ability to play against randomly generated opponent.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="play-random">Play</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Chess Community</h2>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/gh.jpg"
                alt="Chess Tournament in Toronto"
                width={800}
                height={500}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">From Toronto, ON</h3>
                  <p className="text-white/80">Bringing together chess enthusiasts from all skill levels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Chess?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our collection of chess tools designed to help you analyze, learn, and grow as a chess player.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/play-random">Start Playing Now</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

