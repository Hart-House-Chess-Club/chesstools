import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">About Our Chess Board Generator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Welcome to our FEN to PNG, a project from students of the University of Toronto. 
            We are passionate about chess and technology, and this project is a testament to our commitment to both.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>This was built by Executives of the Hart House Chess Club of the University of Toronto.</li>
            <li>This website is operated as an open-source project.</li>
            <li>We do not make any profits from this service.</li>
            <li>Our platform is built by chess players, for chess players.</li>
            <li>We are dedicated to advancing chess technology and making it more accessible.</li>
            <li>We welcome contributions and suggestions from the chess community.</li>
          </ul>
          <p>
            Our goal is to provide a useful tool for chess enthusiasts, coaches, and players of all levels. 
            By offering an easy way to generate chess board images from FEN strings, we hope to contribute 
            to chess analysis, teaching, and enjoyment.
          </p>
          <p>
            If you have ideas for improvements or would like to contribute to the project, please visit our 
            GitHub repository or contact us through the Hart House Chess Club.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
