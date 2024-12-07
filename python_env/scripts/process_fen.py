import sys
import os
import uuid
from PIL import Image
import chess
from fentoimage.board import BoardImage

# Check if a FEN string is passed as a command-line argument
if len(sys.argv) > 1:
    fen = sys.argv[1]
else:
    # Default FEN if not provided
    fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    
print("Began gen")

# Generate the board image based on the FEN string
renderer = BoardImage(fen)
image = renderer.render(highlighted_squares=(chess.F8, chess.B4))

# Create a unique filename using UUID
unique_filename = str(uuid.uuid4()) + '.png'

# Create the 'gen' directory if it doesn't exist
gen_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gen')
if not os.path.exists(gen_dir):
    os.makedirs(gen_dir)

# Create a unique filename using UUID
unique_filename = str(uuid.uuid4()) + '.png'

# Construct the path to save the image in the 'gen' folder
image_path = os.path.join(gen_dir, unique_filename)


# Save the image
image.save(image_path)

# Print the image path (for use in the Next.js API route)
print(image_path)
