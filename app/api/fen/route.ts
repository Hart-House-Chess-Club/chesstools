import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

// Constants
const MAX_FEN_LENGTH = 100;

// FEN validation function
function validateFEN(fen: string): { isValid: boolean; error?: string } {
    // Check FEN length
    if (fen.length > MAX_FEN_LENGTH) {
        return { 
            isValid: false, 
            error: `FEN string too long (${fen.length} characters). Maximum allowed is ${MAX_FEN_LENGTH} characters.` 
        };
    }
    
    // Check if the FEN looks like a description instead of actual FEN
    if (fen.includes(':') || fen.includes('.') || fen.includes('Black') || fen.includes('White')) {
        return { 
            isValid: false, 
            error: 'Invalid FEN format. Please provide a valid FEN string, not a description.' 
        };
    }
    
    // Check for empty or whitespace-only input
    if (fen.trim().length === 0) {
        return { 
            isValid: false, 
            error: 'FEN string cannot be empty.' 
        };
    }
    
    // Basic FEN validation - should have 6 parts separated by spaces
    const fenParts = fen.trim().split(' ');
    if (fenParts.length !== 6) {
        return { 
            isValid: false, 
            error: 'Invalid FEN format. FEN should have 6 parts separated by spaces.' 
        };
    }
    
    // First part should contain board position with 8 ranks separated by '/'
    const boardPart = fenParts[0];
    if (!boardPart.includes('/') || boardPart.split('/').length !== 8) {
        return { 
            isValid: false, 
            error: 'Invalid FEN board format. Board should have 8 ranks separated by "/".' 
        };
    }
    
    // Validate active color (second part)
    const activeColor = fenParts[1];
    if (activeColor !== 'w' && activeColor !== 'b') {
        return { 
            isValid: false, 
            error: 'Invalid FEN format. Active color must be "w" (white) or "b" (black).' 
        };
    }
    
    // Validate castling rights (third part) - should only contain K, Q, k, q, or -
    const castlingRights = fenParts[2];
    if (!/^[KQkq\-]+$/.test(castlingRights)) {
        return { 
            isValid: false, 
            error: 'Invalid FEN format. Castling rights should only contain "K", "Q", "k", "q", or "-".' 
        };
    }
    
    // Validate en passant target (fourth part) - should be a square or -
    const enPassant = fenParts[3];
    if (enPassant !== '-' && !/^[a-h][36]$/.test(enPassant)) {
        return { 
            isValid: false, 
            error: 'Invalid FEN format. En passant target must be "-" or a valid square (e.g., "e3").' 
        };
    }
    
    // Validate halfmove clock (fifth part) - should be a non-negative integer
    const halfmoveClock = fenParts[4];
    if (!/^\d+$/.test(halfmoveClock) || parseInt(halfmoveClock) < 0) {
        return { 
            isValid: false, 
            error: 'Invalid FEN format. Halfmove clock must be a non-negative integer.' 
        };
    }
    
    // Validate fullmove number (sixth part) - should be a positive integer
    const fullmoveNumber = fenParts[5];
    if (!/^\d+$/.test(fullmoveNumber) || parseInt(fullmoveNumber) < 1) {
        return { 
            isValid: false, 
            error: 'Invalid FEN format. Fullmove number must be a positive integer.' 
        };
    }
    
    return { isValid: true };
}

export async function POST(req: NextRequest) {
    try {
        // Check request content type
        const contentType = req.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            return NextResponse.json({ error: 'Invalid Content-Type. Expected application/json.' }, { status: 400 });
        }

        const body = await req.json();
        let { fen } = body;

        console.log("FEN is: ", fen);

        // Validate the FEN input
        if (!fen || typeof fen !== 'string') {
            fen = "1r4k1/5p1p/2B1pn2/6p1/8/6P1/4PP1P/3R2K1 w - - 0 29";
        } else {
            const validation = validateFEN(fen);
            if (!validation.isValid) {
                console.log("FEN validation failed:", validation.error);
                return NextResponse.json({ 
                    error: validation.error 
                }, { status: 400 });
            }
        }

        // Run the Dockerized Python script
        const { stdout, stderr } = await execPromise(
            `docker run --rm  -v $(pwd)/public/gen:/public/gen fen-generator python /python_env/scripts/process_fen.py "${fen}"`
        );

        if (stderr) {
            console.error("Error in Docker execution:", stderr);
            // Check for specific FEN validation errors
            if (stderr.includes("Invalid FEN string") || stderr.includes("expected 'w' or 'b' for turn")) {
                return NextResponse.json({ 
                    error: 'Invalid FEN format. Please check your FEN string and try again.' 
                }, { status: 400 });
            }
            return NextResponse.json({ error: 'Failed to generate chess board image' }, { status: 500 });
        }

        // Parse the output to get the generated image path
        const imagePath = stdout.trim();
        console.log("Generated image path:", imagePath);

        return NextResponse.json({ imagePath });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
