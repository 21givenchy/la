import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Handle file upload here
    // For example, you could upload to a storage service
    
    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Error uploading file: ' + (err instanceof Error ? err.message : 'Unknown error') }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Upload endpoint ready' }, { status: 200 })
} 