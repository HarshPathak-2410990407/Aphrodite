"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  UsersIcon,
  TrophyIcon,
  TargetIcon,
  MessageCircleIcon,
  CalendarIcon,
  UserPlusIcon,
  SettingsIcon,
  CrownIcon,
  ShieldIcon,
  SwordIcon,
} from "lucide-react"

interface TeamMember {
  id: number
  name: string
  avatar: string
  role: "Leader" | "Co-Leader" | "Member"
  rank: string
  winRate: number
  gamesPlayed: number
  isOnline: boolean
  preferredPosition: string
  joinedDate: Date
  stats: {
    kills: number
    deaths: number
    assists: number
  }
}

export default function TeamSection() {
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "ShadowStrike",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Leader",
      rank: "Immortal II",
      winRate: 78,
      gamesPlayed: 156,
      isOnline: true,
      preferredPosition: "Duelist",
      joinedDate: new Date(Date.now() - 86400000 * 90),
      stats: { kills: 2847, deaths: 1923, assists: 1456 },
    },
    {
      id: 2,
      name: "ProGamer2024",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Co-Leader",
      rank: "Diamond III",
      winRate: 73,
      gamesPlayed: 134,
      isOnline: true,
      preferredPosition: "Controller",
      joinedDate: new Date(Date.now() - 86400000 * 60),
      stats: { kills: 2156, deaths: 1678, assists: 1834 },
    },
    {
      id: 3,
      name: "MysticHealer",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Member",
      rank: "Diamond II",
      winRate: 82,
      gamesPlayed: 98,
      isOnline: false,
      preferredPosition: "Sentinel",
      joinedDate: new Date(Date.now() - 86400000 * 30),
      stats: { kills: 1789, deaths: 1234, assists: 2156 },
    },
  ])

  const [teamStats] = useState({
    teamRank: "Diamond I",
    teamWinRate: 77,
    totalGames: 89,
    currentStreak: 5,
    bestStreak: 12,
    tournamentsWon: 3,
    totalEarnings: 2450,
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Leader":
        return <CrownIcon className="h-4 w-4 text-yellow-500" />
      case "Co-Leader":
        return <ShieldIcon className="h-4 w-4 text-blue-500" />
      default:
        return <SwordIcon className="h-4 w-4 text-purple-500" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Leader":
        return "border-yellow-500/30 text-yellow-400"
      case "Co-Leader":
        return "border-blue-500/30 text-blue-400"
      default:
        return "border-purple-500/30 text-purple-400"
    }
  }

  const calculateKDA = (stats: { kills: number; deaths: number; assists: number }) => {
    return ((stats.kills + stats.assists) / Math.max(stats.deaths, 1)).toFixed(2)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Team Management</h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <UsersIcon className="h-3 w-3 mr-1" />
            Team Aphrodite
          </Badge>
          <Badge variant="outline" className="border-green-500/30 text-green-400">
            Team Aphrodite
          </Badge>
          <Badge variant="outline" className="border-green-500/30 text-green-400">
            <TrophyIcon className="h-3 w-3 mr-1" />
            {teamStats.tournamentsWon} Wins
          </Badge>
        </div>
      </div>

      {/* Team Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrophyIcon className="h-5 w-5 mr-2 text-primary" />
            Team Aphrodite Overview
          </CardTitle>
          <CardDescription>Elite competitive gaming team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary">{teamStats.teamRank}</div>
              <div className="text-sm text-muted-foreground">Team Rank</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-green-500">{teamStats.teamWinRate}%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-blue-500">{teamStats.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Current Streak</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-yellow-500">${teamStats.totalEarnings}</div>
              <div className="text-sm text-muted-foreground">Total Earnings</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <Card
            key={member.id}
            className="bg-card border-border transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {member.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{member.name}</h3>
                    {getRoleIcon(member.role)}
                  </div>
                  <Badge variant="outline" className={getRoleColor(member.role)}>
                    {member.role}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Rank</div>
                  <div className="font-medium">{member.rank}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Position</div>
                  <div className="font-medium">{member.preferredPosition}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Win Rate</div>
                  <div className="font-medium text-green-500">{member.winRate}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Games</div>
                  <div className="font-medium">{member.gamesPlayed}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Performance</span>
                  <span>{member.winRate}%</span>
                </div>
                <Progress value={member.winRate} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">K/D/A Stats</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 rounded bg-muted/50">
                    <div className="font-bold text-green-500">{member.stats.kills}</div>
                    <div className="text-muted-foreground">Kills</div>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/50">
                    <div className="font-bold text-red-500">{member.stats.deaths}</div>
                    <div className="text-muted-foreground">Deaths</div>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/50">
                    <div className="font-bold text-blue-500">{member.stats.assists}</div>
                    <div className="text-muted-foreground">Assists</div>
                  </div>
                </div>
                <div className="text-center text-sm">
                  <span className="font-bold">KDA: {calculateKDA(member.stats)}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageCircleIcon className="h-3 w-3 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <TargetIcon className="h-3 w-3 mr-1" />
                  Stats
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                Joined {member.joinedDate.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
              Team Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <div className="font-medium">Practice Session</div>
                <div className="text-sm text-muted-foreground">Today, 7:00 PM</div>
              </div>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                Upcoming
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <div className="font-medium">Tournament Match</div>
                <div className="text-sm text-muted-foreground">Tomorrow, 3:00 PM</div>
              </div>
              <Badge variant="outline" className="border-red-500/30 text-red-400">
                Important
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <div className="font-medium">Strategy Review</div>
                <div className="text-sm text-muted-foreground">Friday, 6:00 PM</div>
              </div>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                Meeting
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2 text-primary" />
              Team Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Invite New Member
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Schedule Practice
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrophyIcon className="h-4 w-4 mr-2" />
              View Team Stats
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Team Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Team Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Team Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: "Won tournament match", player: "Team Aphrodite", time: "2 hours ago", type: "win" },
              { action: "Completed practice session", player: "ShadowStrike", time: "1 day ago", type: "practice" },
              { action: "New member joined", player: "MysticHealer", time: "3 days ago", type: "join" },
              { action: "Strategy review completed", player: "ProGamer2024", time: "5 days ago", type: "meeting" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg border animate-in slide-in-from-left-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "win"
                      ? "bg-green-500"
                      : activity.type === "practice"
                        ? "bg-blue-500"
                        : activity.type === "join"
                          ? "bg-purple-500"
                          : "bg-yellow-500"
                  }`}
                />
                <div className="flex-1">
                  <div className="text-sm">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">
                    {activity.player} • {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
