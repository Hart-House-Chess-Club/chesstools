import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST(req: NextRequest) {
    try {

        // check request content type
        const contentType = req.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            return NextResponse.json({ error: 'Invalid Content-Type. Expected application/json.' }, { status: 400 });
        }

        const body = await req.json();
        
        let { fen } = body;

        console.log("fen is " + fen)

        // Validate the FEN input
        if (!fen || typeof fen !== 'string') {
            fen = "1r4k1/5p1p/2B1pn2/6p1/8/6P1/4PP1P/3R2K1 w - - 0 29"
            //  return NextResponse.json({ error: 'Invalid or missing FEN string.' }, { status: 400 });
        }

        // Run the Python script
        const { stdout, stderr } = await execPromise(`python3 ./python_env/scripts/process_fen.py "${fen}"`);

        if (stderr) {
            return NextResponse.json({ error: stderr }, { status: 500 });
        }

        console.log(stdout.trim())

        return NextResponse.json({ imagePath: stdout.trim() });
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
