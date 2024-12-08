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

        // Validate the FEN input
        if (!fen || typeof fen !== 'string') {
            fen = "1r4k1/5p1p/2B1pn2/6p1/8/6P1/4PP1P/3R2K1 w - - 0 29";
        }

        // Run the Dockerized Python script
        const { stdout, stderr } = await execPromise(
            `docker run -v $(pwd)/public/gen:/public/gen fen-generator python /python_env/scripts/process_fen.py "${fen}"`
        );

        if (stderr) {
            console.error("Error in Docker execution:", stderr);
            return NextResponse.json({ error: stderr }, { status: 500 });
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
