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
        
        const { fen } = body;

        console.log("fen is " + fen)

        // Validate the FEN input
        if (!fen || typeof fen !== 'string') {
            return NextResponse.json({ error: 'Invalid or missing FEN string.' }, { status: 400 });
        }

        // Run the Python script
        const { stdout, stderr } = await execPromise(`python3 ./python_env/scripts/process_fen.py "${fen}"`);

        if (stderr) {
            return NextResponse.json({ error: stderr }, { status: 500 });
        }

        return NextResponse.json({ url: stdout.trim() });
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
