"use client"
import { PORT } from "@/config/app"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export default function SocketClient() {
  const [state, setState] = useState<any>({})
  useEffect(() => {

  
  const socket = io(`:${PORT + 1}`, { path: "/api/socket", addTrailingSlash: false })

  socket.on("connect", () => {
    console.log("Connected")
    setState((state: any) => ({...state, [socket.id || '']: 'connected'}))
  })

  socket.on("welcome", s => {
    setState(s)
  })

  socket.on("disconnect", () => {
    console.log("Disconnected")
    
  })

  socket.on("connect_error", async err => {
    console.log(`connect_error due to ${err.message}`)
    await fetch("/api/socket")
  })

  return () => {
    socket.disconnect()
  }
}, [])
return <div>{JSON.stringify(state ,null, 2)}</div>
}