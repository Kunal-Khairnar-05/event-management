'use client'
import { useState, useEffect } from 'react'
import EventForm from '../components/EventForm'
import EventList from '../components/EventList'
import { Event } from '@/types'

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const response = await fetch('/api/events')
    const data = await response.json()
    setEvents(data)
  }

  return (
    <div className="space-y-8 p-5">
      <h1 className="text-3xl font-bold text-center text-blue-400">Event Management 🧑🏻‍💼</h1>
      <EventForm 
        onEventAdded={fetchEvents} 
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
      />
      <EventList 
        events={events} 
        onEventDeleted={fetchEvents}
        onEventEdit={setEditingEvent}
      />
    </div>
  )
}
