import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

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

        // Validate the FEN input more strictly
        if (!fen || typeof fen !== 'string') {
            fen = "1r4k1/5p1p/2B1pn2/6p1/8/6P1/4PP1P/3R2K1 w - - 0 29";
        } else {
            // Check if the FEN looks like a description instead of actual FEN
            if (fen.includes(':') || fen.includes('.') || fen.length > 100) {
                console.log("Invalid FEN detected (appears to be description):", fen);
                return NextResponse.json({ 
                    error: 'Invalid FEN format. Please provide a valid FEN string, not a description.' 
                }, { status: 400 });
            }
            
            // Basic FEN validation - should have 6 parts separated by spaces
            const fenParts = fen.trim().split(' ');
            if (fenParts.length !== 6) {
                console.log("Invalid FEN format - wrong number of parts:", fenParts.length);
                return NextResponse.json({ 
                    error: 'Invalid FEN format. FEN should have 6 parts separated by spaces.' 
                }, { status: 400 });
            }
            
            // First part should contain board position with 8 ranks separated by '/'
            const boardPart = fenParts[0];
            if (!boardPart.includes('/') || boardPart.split('/').length !== 8) {
                console.log("Invalid FEN board part:", boardPart);
                return NextResponse.json({ 
                    error: 'Invalid FEN board format. Board should have 8 ranks separated by "/".' 
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
