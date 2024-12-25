import ChessBoardRandom from '@/components/ChessBoard';
// import BasicBoard from '@/components/BasicBoard';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChessBoard() {
  return (
    <Card className="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle>Play with a random chess board</CardTitle>
    </CardHeader>
  <CardContent className="space-y-4">
    <div className="max-w-3xl mx-auto mt-8">
      <div className='max-w-2xl'>
        <ChessBoardRandom/>
      </div>
    </div>
    </CardContent>

    <CardFooter>
        {/* <Button onClick={handleFetchImage} disabled={loading} className="w-full">
          {loading ? "Generating..." : "Generate Chess Board Image"}
        </Button> */}
      </CardFooter>
    </Card>
  );
}