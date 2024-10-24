'use client'
import { useState, useEffect } from 'react'
import { Event } from '@/types'

interface EventFormProps {
  onEventAdded: () => void
  editingEvent: Event | null
  setEditingEvent: (event: Event | null) => void
}

export default function EventForm({ 
  onEventAdded, 
  editingEvent, 
  setEditingEvent 
}: EventFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  })

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        date: new Date(editingEvent.date).toISOString().split('T')[0],
        time: editingEvent.time,
        description: editingEvent.description
      })
    }
  }, [editingEvent])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingEvent) {
        await fetch(`/api/events/${editingEvent._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      } else {
        await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }
      
      setFormData({ title: '', date: '', time: '', description: '' })
      setEditingEvent(null)
      onEventAdded()
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-700 p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-300">Title 📃</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="mt-1 p-2 block w-full rounded-md shadow-sm border-2 border-sky-200 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Date 🗓️</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          className="mt-1 p-2 block w-full rounded-md shadow-smborder-2 border-sky-200 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Time 🕐</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({...formData, time: e.target.value})}
          className="mt-1 p-2 block w-full rounded-md shadow-smborder-2 border-sky-200 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Description 🖋️</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="mt-1 p-2 block w-full rounded-md shadow-sm border-2 border-sky-200 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>
      
      <button
        type="submit"
        className="ms:w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        {editingEvent ? 'Update Event' : 'Add Event'}
      </button>
    </form>
  )
}
