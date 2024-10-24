'use client'
import { Event } from '@/types'
import { format } from 'date-fns'

interface EventListProps {
  events: Event[]
  onEventDeleted: () => void
  onEventEdit: (event: Event) => void
}

export default function EventList({ events, onEventDeleted, onEventEdit }: EventListProps) {
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await fetch(`/api/events/${id}`, { method: 'DELETE' })
        onEventDeleted()
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event._id} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold"> 🍁 {event.title}</h3>
          <p className="text-gray-600 mt-2">
            {format(new Date(event.date), 'MMMM dd, yyyy')} at {event.time}
          </p>
          <p className="mt-2">{event.description}</p>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => onEventEdit(event)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(event._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}