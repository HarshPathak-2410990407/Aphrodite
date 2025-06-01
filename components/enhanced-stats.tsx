"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUpIcon,
  TrendingDownIcon,
  TargetIcon,
  ClockIcon,
  StarIcon,
  GamepadIcon,
  BarChartIcon,
  AwardIcon,
} from "lucide-react"

interface GameStats {
  game: string
  rank: string
  winRate: number
  kda: number
  playtime: number
  recentMatches: number
  improvement: number
  peakRank: string
}

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt: Date
}

export default function EnhancedStats() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const [gameStats] = useState<GameStats[]>([
    {
      game: "Valorant",
      rank: "Diamond III",
      winRate: 73,
      kda: 1.42,
      playtime: 247,
      recentMatches: 15,
      improvement: 12,
      peakRank: "Immortal I",
    },
    {
      game: "CS2",
      rank: "Global Elite",
      winRate: 68,
      kda: 1.38,
      playtime: 189,
      recentMatches: 8,
      improvement: -3,
      peakRank: "Global Elite",
    },
    {
      game: "Overwatch 2",
      rank: "Master",
      winRate: 71,
      kda: 2.1,
      playtime: 156,
      recentMatches: 12,
      improvement: 8,
      peakRank: "Grandmaster",
    },
  ])

  const [achievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "First Blood",
      description: "Get 100 first kills",
      icon: "🎯",
      rarity: "common",
      unlockedAt: new Date(Date.now() - 86400000 * 5),
    },
    {
      id: 2,
      title: "Clutch Master",
      description: "Win 50 1v3+ clutches",
      icon: "⚡",
      rarity: "epic",
      unlockedAt: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: 3,
      title: "Rank Climber",
      description: "Gain 500+ LP in a week",
      icon: "🚀",
      rarity: "rare",
      unlockedAt: new Date(Date.now() - 86400000),
    },
    {
      id: 4,
      title: "Team Player",
      description: "Play 100 matches with friends",
      icon: "👥",
      rarity: "legendary",
      unlockedAt: new Date(),
    },
  ])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-500/30 text-gray-400"
      case "rare":
        return "border-blue-500/30 text-blue-400"
      case "epic":
        return "border-purple-500/30 text-purple-400"
      case "legendary":
        return "border-yellow-500/30 text-yellow-400"
      default:
        return "border-gray-500/30 text-gray-400"
    }
  }

  const overallStats = {
    totalPlaytime: gameStats.reduce((sum, game) => sum + game.playtime, 0),
    averageWinRate: Math.round(gameStats.reduce((sum, game) => sum + game.winRate, 0) / gameStats.length),
    totalMatches: gameStats.reduce((sum, game) => sum + game.recentMatches, 0),
    averageKDA: (gameStats.reduce((sum, game) => sum + game.kda, 0) / gameStats.length).toFixed(2),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Performance Analytics</h2>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={selectedPeriod === "week" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("week")}
          >
            Week
          </Button>
          <Button
            size="sm"
            variant={selectedPeriod === "month" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("month")}
          >
            Month
          </Button>
          <Button
            size="sm"
            variant={selectedPeriod === "season" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("season")}
          >
            Season
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="games">By Game</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overall Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2 text-primary" />
                  Total Playtime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallStats.totalPlaytime}h</div>
                <p className="text-xs text-muted-foreground">This {selectedPeriod}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <StarIcon className="h-4 w-4 mr-2 text-primary" />
                  Average Win Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{overallStats.averageWinRate}%</div>
                <p className="text-xs text-muted-foreground">Across all games</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TargetIcon className="h-4 w-4 mr-2 text-primary" />
                  Average K/D/A
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">{overallStats.averageKDA}</div>
                <p className="text-xs text-muted-foreground">Kill/Death/Assist ratio</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <GamepadIcon className="h-4 w-4 mr-2 text-primary" />
                  Matches Played
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-500">{overallStats.totalMatches}</div>
                <p className="text-xs text-muted-foreground">Recent matches</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Your gaming performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                <div className="text-center">
                  <BarChartIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Performance chart coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="games" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameStats.map((game, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{game.game}</CardTitle>
                    <Badge variant="outline">{game.rank}</Badge>
                  </div>
                  <CardDescription>Peak: {game.peakRank}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Win Rate</div>
                      <div className="text-lg font-semibold text-green-500">{game.winRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">K/D/A</div>
                      <div className="text-lg font-semibold text-blue-500">{game.kda}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Playtime</div>
                      <div className="text-lg font-semibold">{game.playtime}h</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Matches</div>
                      <div className="text-lg font-semibold">{game.recentMatches}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Recent Performance</span>
                      <div className={`flex items-center ${game.improvement > 0 ? "text-green-500" : "text-red-500"}`}>
                        {game.improvement > 0 ? (
                          <TrendingUpIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDownIcon className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(game.improvement)}%
                      </div>
                    </div>
                    <Progress value={game.winRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Unlocked {achievement.unlockedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AwardIcon className="h-5 w-5 mr-2 text-primary" />
                Achievement Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Headshot Master</span>
                  <span className="text-sm text-muted-foreground">847/1000</span>
                </div>
                <Progress value={84.7} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Win Streak</span>
                  <span className="text-sm text-muted-foreground">7/10</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tournament Victor</span>
                  <span className="text-sm text-muted-foreground">2/5</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                  <div className="text-center">
                    <TrendingUpIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Trend analysis coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Skill Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Aim Accuracy</span>
                    <div className="flex items-center text-green-500">
                      <TrendingUpIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">+5.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Game Sense</span>
                    <div className="flex items-center text-green-500">
                      <TrendingUpIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">+3.8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Team Play</span>
                    <div className="flex items-center text-red-500">
                      <TrendingDownIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">-1.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consistency</span>
                    <div className="flex items-center text-green-500">
                      <TrendingUpIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">+7.1%</span>
                    </div>
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
