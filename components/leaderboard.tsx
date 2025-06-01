"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrophyIcon,
  MedalIcon,
  CrownIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  GamepadIcon,
  UserPlusIcon,
  UserCheckIcon,
  SearchIcon,
  FilterIcon,
  StarIcon,
} from "lucide-react"

interface LeaderboardEntry {
  id: number
  rank: number
  username: string
  avatar: string
  score: number
  change: number
  winRate: number
  gamesPlayed: number
  currentRank: string
  isFriend: boolean
  isOnline: boolean
  country: string
}

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [friendRequests, setFriendRequests] = useState<number[]>([])

  const [leaderboardData] = useState<LeaderboardEntry[]>([
    {
      id: 1,
      rank: 1,
      username: "ShadowStrike",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 2847,
      change: 12,
      winRate: 78,
      gamesPlayed: 45,
      currentRank: "Immortal II",
      isFriend: true,
      isOnline: true,
      country: "US",
    },
    {
      id: 2,
      rank: 2,
      username: "ProGamer2024",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 2756,
      change: 8,
      winRate: 73,
      gamesPlayed: 38,
      currentRank: "Diamond III",
      isFriend: false,
      isOnline: true,
      country: "US",
    },
    {
      id: 3,
      rank: 3,
      username: "MysticHealer",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 2698,
      change: -3,
      winRate: 82,
      gamesPlayed: 29,
      currentRank: "Diamond II",
      isFriend: true,
      isOnline: false,
      country: "CA",
    },
    {
      id: 4,
      rank: 4,
      username: "IronWill",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 2634,
      change: 15,
      winRate: 71,
      gamesPlayed: 52,
      currentRank: "Diamond I",
      isFriend: false,
      isOnline: true,
      country: "UK",
    },
    {
      id: 5,
      rank: 5,
      username: "QuickScope",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 2589,
      change: -7,
      winRate: 85,
      gamesPlayed: 31,
      currentRank: "Platinum III",
      isFriend: false,
      isOnline: false,
      country: "DE",
    },
  ])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <CrownIcon className="h-5 w-5 text-yellow-400" />
      case 2:
        return <MedalIcon className="h-5 w-5 text-gray-300" />
      case 3:
        return <MedalIcon className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-white/60">#{rank}</span>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-yellow-400/30"
      case 2:
        return "bg-gradient-to-r from-gray-300/20 to-gray-500/20 border-gray-300/30"
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-amber-800/20 border-amber-600/30"
      default:
        return "bg-white/5 border-white/10"
    }
  }

  const handleAddFriend = (playerId: number) => {
    setFriendRequests((prev) => [...prev, playerId])
  }

  const filteredPlayers = leaderboardData.filter(
    (player) =>
      player.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.currentRank.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const friendsOnly = filteredPlayers.filter((entry) => entry.isFriend || entry.username === "ProGamer2024")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Enhanced Leaderboard</h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="border-yellow-400 text-yellow-300">
            <TrophyIcon className="h-3 w-3 mr-1" />
            Competitive Season
          </Badge>
          <Badge variant="outline" className="border-green-400 text-green-300 animate-pulse">
            Live Rankings
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="friends" className="space-y-6">
        <TabsList className="bg-black/20 backdrop-blur-sm">
          <TabsTrigger value="friends">Friends Only</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="regional">Regional</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-6">
          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white/80 flex items-center">
                  <TrophyIcon className="h-4 w-4 mr-2 text-yellow-400" />
                  Your Rank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">#2</div>
                <div className="text-xs text-white/60">Among friends</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white/80 flex items-center">
                  <TrendingUpIcon className="h-4 w-4 mr-2 text-green-400" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">+127 LP</div>
                <div className="text-xs text-white/60">8 position change</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white/80 flex items-center">
                  <UsersIcon className="h-4 w-4 mr-2 text-purple-400" />
                  Friends Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-400">{friendsOnly.length}</div>
                <div className="text-xs text-white/60">This season</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white/80 flex items-center">
                  <StarIcon className="h-4 w-4 mr-2 text-blue-400" />
                  Best Rank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">#1</div>
                <div className="text-xs text-white/60">All time high</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/20 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center">
                  <UsersIcon className="h-5 w-5 mr-2 text-purple-400" />
                  Friends Leaderboard
                </span>
              </CardTitle>
              <CardDescription className="text-white/60">
                Compete with your friends and track your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {friendsOnly.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${getRankColor(entry.rank)} ${
                      entry.username === "ProGamer2024" ? "ring-2 ring-pink-400/50" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10">{getRankIcon(entry.rank)}</div>
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white/20">
                          <AvatarImage src={entry.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{entry.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {entry.username === "ProGamer2024" && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full border-2 border-black"></div>
                        )}
                        {entry.isOnline && entry.username !== "ProGamer2024" && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-white flex items-center space-x-2">
                          <span>{entry.username}</span>
                          {entry.username === "ProGamer2024" && (
                            <Badge variant="outline" className="border-pink-400 text-pink-300 text-xs">
                              You
                            </Badge>
                          )}
                          {entry.isOnline && entry.username !== "ProGamer2024" && (
                            <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                              Online
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-white/60">
                          {entry.currentRank} • {entry.country}
                        </div>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs text-white/60">{entry.gamesPlayed} games</span>
                          <span className="text-xs text-green-400">{entry.winRate}% WR</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{entry.score.toLocaleString()}</div>
                        <div
                          className={`flex items-center text-sm ${
                            entry.change > 0 ? "text-green-400" : entry.change < 0 ? "text-red-400" : "text-white/60"
                          }`}
                        >
                          {entry.change > 0 ? (
                            <TrendingUpIcon className="h-3 w-3 mr-1" />
                          ) : entry.change < 0 ? (
                            <TrendingDownIcon className="h-3 w-3 mr-1" />
                          ) : null}
                          {entry.change > 0 ? "+" : ""}
                          {entry.change}
                        </div>
                      </div>
                      {!entry.isFriend && entry.username !== "ProGamer2024" && (
                        <Button
                          size="sm"
                          onClick={() => handleAddFriend(entry.id)}
                          disabled={friendRequests.includes(entry.id)}
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
                        >
                          {friendRequests.includes(entry.id) ? (
                            <UserCheckIcon className="h-4 w-4" />
                          ) : (
                            <UserPlusIcon className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global" className="space-y-6">
          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Global Leaderboard</CardTitle>
              <CardDescription className="text-white/60">
                See how you rank against all players worldwide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPlayers.map((entry) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${getRankColor(entry.rank)} ${
                      entry.username === "ProGamer2024" ? "ring-2 ring-pink-400/50" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10">{getRankIcon(entry.rank)}</div>
                      <Avatar className="h-12 w-12 border-2 border-white/20">
                        <AvatarImage src={entry.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{entry.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white flex items-center space-x-2">
                          <span>{entry.username}</span>
                          {entry.isFriend && (
                            <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                              Friend
                            </Badge>
                          )}
                          {entry.username === "ProGamer2024" && (
                            <Badge variant="outline" className="border-pink-400 text-pink-300 text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-white/60">
                          {entry.currentRank} • {entry.country}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{entry.score.toLocaleString()}</div>
                        <div
                          className={`flex items-center text-sm ${
                            entry.change > 0 ? "text-green-400" : entry.change < 0 ? "text-red-400" : "text-white/60"
                          }`}
                        >
                          {entry.change > 0 ? (
                            <TrendingUpIcon className="h-3 w-3 mr-1" />
                          ) : entry.change < 0 ? (
                            <TrendingDownIcon className="h-3 w-3 mr-1" />
                          ) : null}
                          {entry.change > 0 ? "+" : ""}
                          {entry.change}
                        </div>
                      </div>
                      {!entry.isFriend && entry.username !== "ProGamer2024" && (
                        <Button
                          size="sm"
                          onClick={() => handleAddFriend(entry.id)}
                          disabled={friendRequests.includes(entry.id)}
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
                        >
                          {friendRequests.includes(entry.id) ? (
                            <UserCheckIcon className="h-4 w-4" />
                          ) : (
                            <UserPlusIcon className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <div className="text-center py-12">
            <TrophyIcon className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Regional Rankings</h3>
            <p className="text-white/60 mb-6">Compare with players in your region</p>
            <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30">
              Coming Soon
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Competition Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Total Participants</span>
                  <span className="text-white font-bold">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Friends Participating</span>
                  <span className="text-white font-bold">{friendsOnly.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Your Best Rank</span>
                  <span className="text-yellow-400 font-bold">#1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Season Progress</span>
                  <span className="text-white font-bold">67%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <TrophyIcon className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-sm text-white">First Place</p>
                    <p className="text-xs text-white/60">Reached #1 on friends leaderboard</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUpIcon className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-white">Climbing Star</p>
                    <p className="text-xs text-white/60">Gained 10+ positions this week</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <GamepadIcon className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-white">Consistent Player</p>
                    <p className="text-xs text-white/60">Played 30+ games this season</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
