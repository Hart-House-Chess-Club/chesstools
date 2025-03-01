import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/legacy/image"

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">About chesstools.org</h1>
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Welcome to <a href="https://chesstools.org">chesstools.org</a> project made for chess players by chess players.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>This was built by Executives of the Hart House Chess Club of the University of Toronto.</li>
            <li>This application is operated as an open-source project.</li>
            <li>We do not make any profits from this service.</li>
            <li>Our platform is built by chess players, for chess players.</li>
            <li>We are dedicated to advancing chess technology and making it more accessible.</li>
            <li>We welcome contributions and suggestions from the chess community.</li>
          </ul>
          <p>
            Our goal is to provide a useful tool for chess enthusiasts, coaches, and players of all levels. 
            By offering accessible, easy to use tools, we hope to contribute 
            to chess analysis, teaching, and enjoyment.
          </p>
          <p>
            The application is hosted on a Linux 22.0 server running Docker. Our main costs are infrastructure costs and would appreciate any support. 
          </p>
          <p>
            If you have ideas for improvements or would like to contribute to the project, please let us know through our <a href="https://github.com/Hart-House-Chess-Club/chesstools">GitHub project</a>.
          </p>
          <Image src="/fullboard.png" alt="Default chess board image generated" className="w-full h-auto m-2 p-5" width={800} height={500} unoptimized/>
          </CardContent>
      </Card>
    </div>
  )
}
