export function GET() {
  return new Response('Hello GET worker!', { status: 200 })
}

export function POST() {
  return new Response('Hello POST worker!', { status: 200 })
}
