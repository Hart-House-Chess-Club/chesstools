"use client"

import { useState } from 'react';

interface ChessBoardImageProps {
  fen: string;  // Explicitly declare the type of the 'fen' prop as string
}

const ChessBoardImage: React.FC<ChessBoardImageProps> = ({ fen }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch image when the button is clicked
  const handleFetchImage = async () => {
    setLoading(true);  // Start loading
    const res = await fetch('/api/fen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fen }),
    });

    const data = await res.json();
    console.log("data is", data);

    if (data && data.imagePath) {
      setImageUrl(`${data.imagePath}`);  
    }

    setLoading(false);  // Stop loading
  };

  return (
    <div>
      <button onClick={handleFetchImage}>Generate Chess Board Image</button>

      {loading && <p>Loading...</p>}

      {imageUrl && !loading ? (
        <img src={imageUrl} alt="Generated Chess Board" />
      ) : null}
    </div>
  );
};

export default ChessBoardImage;
