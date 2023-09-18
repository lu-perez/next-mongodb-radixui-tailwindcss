import { connect, connection } from 'mongoose'

const conn = {
  isConnected: false
}

export async function connectDB() {
  if (conn.isConnected) {
    return
  }

  const { PRODUCTION } = process.env
  let mongoURI: string | undefined

  if (PRODUCTION === 'true') {
    mongoURI = process.env.MONGODB_LOCAL_URI
  } else {
    mongoURI = process.env.MONGODB_ATLAS_URI
  }

  if (!mongoURI) {
    throw new Error('MongoDB URI must be defined')
  }

  const db = await connect(mongoURI)
  conn.isConnected = db.connections[0].readyState === 1 ? true : false
  console.log(`Database name: ${db.connection.db.databaseName}`)
}

connection.on('connected', () => {
  console.log('MongoDB connected')
})

connection.on('error', (err) => {
  console.error('MongoDB connection error', err)
})
