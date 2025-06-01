"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import {
  MicIcon,
  MicOffIcon,
  VolumeIcon,
  VolumeXIcon,
  PhoneIcon,
  PhoneOffIcon,
  SettingsIcon,
  UsersIcon,
  WifiIcon,
  WifiOffIcon,
} from "lucide-react"

interface VoiceUser {
  id: number
  name: string
  avatar: string
  isMuted: boolean
  isDeafened: boolean
  isSpeaking: boolean
  volume: number
  ping: number
}

export default function VoiceChat() {
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)
  const [masterVolume, setMasterVolume] = useState([80])
  const [micVolume, setMicVolume] = useState([75])
  const [connectionQuality, setConnectionQuality] = useState<"excellent" | "good" | "poor">("good")

  const [voiceUsers, setVoiceUsers] = useState<VoiceUser[]>([
    {
      id: 1,
      name: "ProGamer2024",
      avatar: "/placeholder.svg?height=32&width=32",
      isMuted: false,
      isDeafened: false,
      isSpeaking: false,
      volume: 80,
      ping: 23,
    },
    {
      id: 2,
      name: "ShadowStrike",
      avatar: "/placeholder.svg?height=32&width=32",
      isMuted: false,
      isDeafened: false,
      isSpeaking: true,
      volume: 85,
      ping: 45,
    },
    {
      id: 3,
      name: "MysticHealer",
      avatar: "/placeholder.svg?height=32&width=32",
      isMuted: true,
      isDeafened: false,
      isSpeaking: false,
      volume: 70,
      ping: 67,
    },
  ])

  const audioContextRef = useRef<AudioContext | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    // Simulate speaking animation
    const interval = setInterval(() => {
      setVoiceUsers((prev) =>
        prev.map((user) => ({
          ...user,
          isSpeaking: Math.random() > 0.8 && !user.isMuted,
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const connectToVoice = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Create audio context for processing
      audioContextRef.current = new AudioContext()

      setIsConnected(true)
    } catch (error) {
      console.error("Failed to access microphone:", error)
    }
  }

  const disconnectFromVoice = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    setIsConnected(false)
    setIsMuted(false)
    setIsDeafened(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = isMuted
      })
    }
  }

  const toggleDeafen = () => {
    setIsDeafened(!isDeafened)
    if (isDeafened) {
      setIsMuted(false)
    } else {
      setIsMuted(true)
    }
  }

  const getConnectionIcon = () => {
    switch (connectionQuality) {
      case "excellent":
        return <WifiIcon className="h-4 w-4 text-green-500" />
      case "good":
        return <WifiIcon className="h-4 w-4 text-yellow-500" />
      case "poor":
        return <WifiOffIcon className="h-4 w-4 text-red-500" />
    }
  }

  const getPingColor = (ping: number) => {
    if (ping < 50) return "text-green-500"
    if (ping < 100) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <UsersIcon className="h-5 w-5 mr-2 text-primary" />
              Voice Chat
            </CardTitle>
            <CardDescription>
              {isConnected ? "Connected to voice channel" : "Connect to start voice chat"}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {getConnectionIcon()}
            <Badge variant={isConnected ? "default" : "outline"}>{isConnected ? "Connected" : "Disconnected"}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Controls */}
        <div className="flex items-center justify-center space-x-2">
          {!isConnected ? (
            <Button onClick={connectToVoice} className="flex-1">
              <PhoneIcon className="h-4 w-4 mr-2" />
              Connect to Voice
            </Button>
          ) : (
            <>
              <Button variant={isMuted ? "destructive" : "outline"} onClick={toggleMute} className="flex-1">
                {isMuted ? <MicOffIcon className="h-4 w-4 mr-2" /> : <MicIcon className="h-4 w-4 mr-2" />}
                {isMuted ? "Unmute" : "Mute"}
              </Button>
              <Button variant={isDeafened ? "destructive" : "outline"} onClick={toggleDeafen} className="flex-1">
                {isDeafened ? <VolumeXIcon className="h-4 w-4 mr-2" /> : <VolumeIcon className="h-4 w-4 mr-2" />}
                {isDeafened ? "Undeafen" : "Deafen"}
              </Button>
              <Button variant="destructive" onClick={disconnectFromVoice}>
                <PhoneOffIcon className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* Voice Users */}
        {isConnected && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Voice Channel ({voiceUsers.length})</h4>
            {voiceUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center space-x-3 p-2 rounded-lg border transition-all duration-200 ${
                  user.isSpeaking ? "border-green-500 bg-green-500/10 animate-pulse" : "border-border bg-card"
                }`}
              >
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {user.isSpeaking && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium truncate">{user.name}</span>
                    <span className={`text-xs ${getPingColor(user.ping)}`}>{user.ping}ms</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {user.isMuted && <MicOffIcon className="h-3 w-3 text-red-500" />}
                    {user.isDeafened && <VolumeXIcon className="h-3 w-3 text-red-500" />}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <VolumeIcon className="h-3 w-3 text-muted-foreground" />
                  <div className="w-12 text-xs text-muted-foreground">{user.volume}%</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Audio Settings */}
        {isConnected && (
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <SettingsIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Audio Settings</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Master Volume</span>
                  <span className="text-muted-foreground">{masterVolume[0]}%</span>
                </div>
                <Slider value={masterVolume} onValueChange={setMasterVolume} max={100} step={1} className="w-full" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Microphone Volume</span>
                  <span className="text-muted-foreground">{micVolume[0]}%</span>
                </div>
                <Slider value={micVolume} onValueChange={setMicVolume} max={100} step={1} className="w-full" />
              </div>
            </div>
          </div>
        )}

        {/* Connection Quality */}
        {isConnected && (
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <span>Connection Quality: {connectionQuality}</span>
            <span>Bitrate: 64kbps</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
