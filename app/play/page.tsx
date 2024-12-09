import ChessBoardRandom from '@/components/ChessBoard';
// import BasicBoard from '@/components/BasicBoard';

export default function ChessBoard() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Play with a random chess board</h1>
      <div className='max-w-2xl'>
        <ChessBoardRandom/>
      </div>
    </div>
  );
}