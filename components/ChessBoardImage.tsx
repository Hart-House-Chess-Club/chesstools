"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/legacy/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ChessBoardImageProps {
  initialFen?: string
}

const ChessBoardImage: React.FC<ChessBoardImageProps> = ({ initialFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" }) => {
  const [fen, setFen] = useState<string>(initialFen)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetchImage = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/fen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fen }),
      })

      if (!res.ok) {
        throw new Error('Failed to generate chess board image')
      }

      const data = await res.json()
      if (data && data.imagePath) {
        setImageUrl(`${data.imagePath}`)
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Function to trigger the image download
  const handleDownloadImage = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = imageUrl.split('/').pop() || 'chessboard.png';  // Use the file name from the URL
      link.click();  // Trigger the download
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Chess Board Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fen-input" className="text-sm font-medium">
            FEN String
          </label>
          <Input
            id="fen-input"
            value={fen}
            onChange={(e) => setFen(e.target.value)}
            placeholder="Enter FEN string"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {imageUrl && !loading && (
          <div className="mt-4">
            <Image src={imageUrl} alt="Generated Chess Board" className="w-full h-auto" width={800} height={800} unoptimized/>
            <Button className="mt-5" onClick={handleDownloadImage}>Download Image
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleFetchImage} disabled={loading} className="w-full">
          {loading ? "Generating..." : "Generate Chess Board Image"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ChessBoardImage

