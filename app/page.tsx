"use client"

import { useState, useEffect } from 'react';

interface ChessBoardImageProps {
  fen: string;  // Explicitly declare the type of the 'fen' prop as string
}

const ChessBoardImage: React.FC<ChessBoardImageProps> = ({ fen }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch('/api/fen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fen }),
      });
      const data = await res.json();

      console.log("data is " + data)

      if (data && data.imagePath) {
        setImageUrl(`${data.imagePath}`);
      }
    };

    fetchImage();
  }, [fen]);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Generated Chess Board" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChessBoardImage;
