import { connect, connection } from 'mongoose'

const conn = {
  isConnected: false
}

export async function connectDB() {
  if (conn.isConnected) {
    return
  }

  const { MONGODB_URI } = process.env
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI must be defined')
  }

  const db = await connect(MONGODB_URI)
  conn.isConnected = db.connections[0].readyState === 1 ? true : false
  console.log(`Database name: ${db.connection.db.databaseName}`)
}

connection.on('connected', () => {
  console.log('MongoDB connected')
})

connection.on('error', (err) => {
  console.error('MongoDB connection error', err)
})
