import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true,
    maxlength: [100, 'Title cannot be longer than 100 characters']
  },
  date: {
    type: Date,
    required: [true, 'Please provide an event date']
  },
  time: {
    type: String,
    required: [true, 'Please provide an event time']
  },
  description: {
    type: String,
    required: [true, 'Please provide an event description'],
    trim: true
  }
}, {
  timestamps: true
})

export default mongoose.models.Event || mongoose.model('Event', EventSchema)
