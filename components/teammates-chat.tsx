"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UsersIcon,
  SendIcon,
  MicIcon,
  MicOffIcon,
  UserPlusIcon,
  GamepadIcon,
  MessageCircleIcon,
  SearchIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
} from "lucide-react"

interface ChatMessage {
  id: number
  user: string
  message: string
  timestamp: Date
  type: "message" | "join" | "leave" | "lfg"
}

interface Player {
  id: number
  username: string
  avatar: string
  rank: string
  game: string
  region: string
  isOnline: boolean
  lookingForGroup: boolean
  preferredRole?: string
  micEnabled: boolean
}

export default function TeammatesChat() {
  const [activeRoom, setActiveRoom] = useState("general")
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [micEnabled, setMicEnabled] = useState(false)

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      user: "ShadowStrike",
      message: "LF2M for ranked Valorant, Diamond+ only",
      timestamp: new Date(Date.now() - 300000),
      type: "lfg",
    },
    {
      id: 2,
      user: "ProGamer2024",
      message: "Hey everyone! Just hit Diamond III 🎉",
      timestamp: new Date(Date.now() - 240000),
      type: "message",
    },
    {
      id: 3,
      user: "MysticHealer",
      message: "Anyone want to practice some aim training together?",
      timestamp: new Date(Date.now() - 180000),
      type: "message",
    },
    {
      id: 4,
      user: "IronWill",
      message: "GG everyone, great matches today!",
      timestamp: new Date(Date.now() - 120000),
      type: "message",
    },
  ])

  const [players] = useState<Player[]>([
    {
      id: 1,
      username: "ShadowStrike",
      avatar: "/placeholder.svg?height=32&width=32",
      rank: "Immortal II",
      game: "Valorant",
      region: "NA",
      isOnline: true,
      lookingForGroup: true,
      preferredRole: "Duelist",
      micEnabled: true,
    },
    {
      id: 2,
      username: "ProGamer2024",
      avatar: "/placeholder.svg?height=32&width=32",
      rank: "Diamond III",
      game: "Valorant",
      region: "NA",
      isOnline: true,
      lookingForGroup: false,
      preferredRole: "Controller",
      micEnabled: true,
    },
    {
      id: 3,
      username: "MysticHealer",
      avatar: "/placeholder.svg?height=32&width=32",
      rank: "Diamond II",
      game: "Overwatch 2",
      region: "EU",
      isOnline: true,
      lookingForGroup: true,
      preferredRole: "Support",
      micEnabled: false,
    },
    {
      id: 4,
      username: "IronWill",
      avatar: "/placeholder.svg?height=32&width=32",
      rank: "Diamond I",
      game: "CS2",
      region: "NA",
      isOnline: false,
      lookingForGroup: false,
      preferredRole: "Entry",
      micEnabled: true,
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      user: "ProGamer2024",
      message: message,
      timestamp: new Date(),
      type: "message",
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const filteredPlayers = players.filter(
    (player) =>
      player.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.rank.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const onlinePlayers = filteredPlayers.filter((player) => player.isOnline)
  const lfgPlayers = filteredPlayers.filter((player) => player.lookingForGroup)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Find Teammates</h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="border-green-500/30 text-green-400">
            <UsersIcon className="h-3 w-3 mr-1" />
            {onlinePlayers.length} Online
          </Badge>
          <Badge variant="outline" className="border-blue-500/30 text-blue-400">
            {lfgPlayers.length} LFG
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <MessageCircleIcon className="h-5 w-5 mr-2 text-primary" />
                Team Chat
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={activeRoom === "general" ? "default" : "ghost"}
                  onClick={() => setActiveRoom("general")}
                >
                  General
                </Button>
                <Button
                  size="sm"
                  variant={activeRoom === "lfg" ? "default" : "ghost"}
                  onClick={() => setActiveRoom("lfg")}
                >
                  LFG
                </Button>
                <Button
                  size="sm"
                  variant={activeRoom === "coaching" ? "default" : "ghost"}
                  onClick={() => setActiveRoom("coaching")}
                >
                  Coaching
                </Button>
              </div>
            </div>
            <CardDescription>Connect with other players and find your perfect team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-80 w-full rounded-md border p-4">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>{msg.user.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp.toLocaleTimeString()}</span>
                        {msg.type === "lfg" && (
                          <Badge variant="secondary" className="text-xs">
                            LFG
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                size="icon"
                variant={micEnabled ? "default" : "outline"}
                onClick={() => setMicEnabled(!micEnabled)}
              >
                {micEnabled ? <MicIcon className="h-4 w-4" /> : <MicOffIcon className="h-4 w-4" />}
              </Button>
              <Button onClick={handleSendMessage}>
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Players List */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UsersIcon className="h-5 w-5 mr-2 text-primary" />
                Players
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs defaultValue="online" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="online">Online</TabsTrigger>
                  <TabsTrigger value="lfg">Looking for Group</TabsTrigger>
                </TabsList>

                <TabsContent value="online" className="space-y-3 mt-4">
                  {onlinePlayers.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={player.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{player.username.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          {player.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{player.username}</span>
                            {player.micEnabled && <MicIcon className="h-3 w-3 text-green-500" />}
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{player.rank}</span>
                            <span>•</span>
                            <span>{player.game}</span>
                            <span>•</span>
                            <span>{player.region}</span>
                          </div>
                          {player.preferredRole && (
                            <Badge variant="outline" className="text-xs mt-1">
                              {player.preferredRole}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <UserPlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="lfg" className="space-y-3 mt-4">
                  {lfgPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-primary/20"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={player.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{player.username.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{player.username}</span>
                            <Badge variant="secondary" className="text-xs">
                              LFG
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {player.rank} • {player.game} • {player.preferredRole}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-primary/20 hover:bg-primary/30">
                        Invite
                      </Button>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="ghost">
                <GamepadIcon className="h-4 w-4 mr-2" />
                Create LFG Post
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <StarIcon className="h-4 w-4 mr-2" />
                Find Coaches
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <MapPinIcon className="h-4 w-4 mr-2" />
                Local Events
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <ClockIcon className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
