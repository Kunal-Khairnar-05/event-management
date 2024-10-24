import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Event from '@/models/Event'

export async function GET() {
  try {
    await connectDB()
    const events = await Event.find().sort({ date: 1 })
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const event = await Event.create(body)
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}