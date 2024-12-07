import chess

from fentoimage.board import BoardImage

fen = "rnbqk1nr/pppp1ppp/8/4p3/1bP5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3"
renderer = BoardImage(fen)
image = renderer.render(highlighted_squares=(chess.F8, chess.B4))
image.show()