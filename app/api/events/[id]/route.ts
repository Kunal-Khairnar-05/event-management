import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Event from '@/models/Event'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const body = await request.json()
    const event = await Event.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const event = await Event.findByIdAndDelete(params.id)
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}