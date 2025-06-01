"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeProvider } from "@/components/theme-provider"
import { GameStatsProvider, useGameStats } from "@/components/game-stats-provider"
import GameSelector from "@/components/game-selector"
import {
  GamepadIcon,
  BotIcon,
  UsersIcon,
  TrophyIcon,
  ActivityIcon,
  ZapIcon,
  SettingsIcon,
  CalendarIcon,
  BarChartIcon,
  StarIcon,
  MessageCircleIcon,
  TrendingUpIcon,
  ShieldIcon,
  ShoppingCartIcon,
  AwardIcon,
} from "lucide-react"
import UserProfile from "@/components/user-profile"
import SettingsPage from "@/components/settings-page"
import EnhancedCoachGPT from "@/components/enhanced-coach-gpt"
import Leaderboard from "@/components/leaderboard"
import TournamentHub from "@/components/tournament-hub"
import TeammatesChat from "@/components/teammates-chat"
import PerformanceCharts from "@/components/performance-charts"
import TournamentBrackets from "@/components/tournament-brackets"
import VoiceChat from "@/components/voice-chat"
import TeamSection from "@/components/team-section"
import APIIntegrations from "@/components/api-integrations"
import BackgroundMusicPlayer from "@/components/background-music-player"
import LagShield from "@/components/lag-shield"
import Challenges from "@/components/challenges"
import AphroditeStore from "@/components/aphrodite-store"

function DashboardContent() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { selectedGame, setSelectedGame, gameStats } = useGameStats()

  // Mock user for demo
  const user = {
    displayName: "ProGamer2024",
    photoURL: "/placeholder.svg?height=40&width=40",
  }

  const getGameDisplayName = (gameId: string) => {
    const gameNames: Record<string, string> = {
      valorant: "Valorant",
      cs2: "Counter-Strike 2",
      overwatch: "Overwatch 2",
      apex: "Apex Legends",
      lol: "League of Legends",
      rocket: "Rocket League",
      fortnite: "Fortnite",
      dota2: "Dota 2",
    }
    return gameNames[gameId] || "Unknown Game"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header with animations */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40 animate-in slide-in-from-top-4 duration-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GamepadIcon className="h-8 w-8 text-primary animate-pulse" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Aphrodite
                </h1>
              </div>
              <Badge variant="secondary" className="animate-in slide-in-from-left-2 duration-300">
                Gaming Assistant
              </Badge>
              <Badge variant="outline" className="border-green-500/30 text-green-400 animate-pulse">
                Live
              </Badge>
              <div className="animate-in slide-in-from-left-4 duration-500">
                <GameSelector selectedGame={selectedGame} onGameChange={setSelectedGame} />
              </div>
            </div>
            <div className="animate-in slide-in-from-right-4 duration-500">
              <UserProfile user={user} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with enhanced animations */}
      <div className="container mx-auto px-4 py-6 animate-in fade-in-0 duration-700">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-11 bg-card/50 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500">
            <TabsTrigger value="dashboard" className="transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              <ActivityIcon className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="coach" className="transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              <BotIcon className="h-4 w-4 mr-2" />
              CoachGPT
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="transition-all duration-300 hover:scale-105 hover:bg-primary/10"
            >
              <TrophyIcon className="h-4 w-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger
              value="tournaments"
              className="transition-all duration-300 hover:scale-105 hover:bg-primary/10"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Tournaments
            </TabsTrigger>
            <TabsTrigger value="teammates" className="transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              <MessageCircleIcon className="h-4 w-4 mr-2" />
              Teammates
            </TabsTrigger>
            <TabsTrigger value="team" className="transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              <UsersIcon className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="stats" className="transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              <BarChartIcon className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="challenges" className="transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              <AwardIcon className="h-4 w-4 mr-2" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="store" className="transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              <ShoppingCartIcon className="h-4 w-4 mr-2" />
              Store
            </TabsTrigger>
            <TabsTrigger value="lagshield" className="transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              <ShieldIcon className="h-4 w-4 mr-2" />
              Lag Shield
            </TabsTrigger>
            <TabsTrigger value="settings" className="transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Game-specific header with enhanced animations */}
            <Card className="bg-card border-border animate-in slide-in-from-top-2 duration-500 hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Currently Playing: {getGameDisplayName(selectedGame)}</h3>
                    <p className="text-sm text-muted-foreground">
                      Rank: {gameStats.currentRank} • Win Rate: {gameStats.winRate}% • K/D/A: {gameStats.kda}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary animate-pulse">
                    {gameStats.gamesPlayed} Games Played
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Stats Grid with staggered animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border transition-all duration-500 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <TrophyIcon className="h-4 w-4 mr-2 text-primary" />
                    Current Rank
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{gameStats.currentRank}</div>
                  <p className="text-xs text-muted-foreground">+{gameStats.weeklyLP} LP this week</p>
                </CardContent>
              </Card>

              <Card
                className="bg-card border-border transition-all duration-500 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-2"
                style={{ animationDelay: "100ms" }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <StarIcon className="h-4 w-4 mr-2 text-primary" />
                    Win Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">{gameStats.winRate}%</div>
                  <p className="text-xs text-muted-foreground">Last {gameStats.gamesPlayed} games</p>
                </CardContent>
              </Card>

              <Card
                className="bg-card border-border transition-all duration-500 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-2"
                style={{ animationDelay: "200ms" }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <ZapIcon className="h-4 w-4 mr-2 text-primary" />
                    Avg. Ping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">{gameStats.avgPing}ms</div>
                  <p className="text-xs text-muted-foreground">Optimized connection</p>
                </CardContent>
              </Card>

              <Card
                className="bg-card border-border transition-all duration-500 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-2"
                style={{ animationDelay: "300ms" }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <UsersIcon className="h-4 w-4 mr-2 text-primary" />
                    Squad Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-500">{gameStats.squadMembers}</div>
                  <p className="text-xs text-muted-foreground">{gameStats.onlineMembers} online now</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Activity with enhanced animations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-card border-border animate-in slide-in-from-left-4 duration-700 hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => setActiveTab("coach")}
                    className="w-full justify-start transition-all duration-300 hover:scale-105 hover:shadow-md"
                    variant="outline"
                  >
                    <BotIcon className="h-4 w-4 mr-2" />
                    Get AI Coaching for {getGameDisplayName(selectedGame)}
                  </Button>
                  <Button
                    onClick={() => setActiveTab("challenges")}
                    className="w-full justify-start transition-all duration-300 hover:scale-105 hover:shadow-md"
                    variant="outline"
                  >
                    <AwardIcon className="h-4 w-4 mr-2" />
                    Complete Challenges
                  </Button>
                  <Button
                    onClick={() => setActiveTab("store")}
                    className="w-full justify-start transition-all duration-300 hover:scale-105 hover:shadow-md"
                    variant="outline"
                  >
                    <ShoppingCartIcon className="h-4 w-4 mr-2" />
                    Visit Aphrodite Store
                  </Button>
                  <Button
                    onClick={() => setActiveTab("tournaments")}
                    className="w-full justify-start transition-all duration-300 hover:scale-105 hover:shadow-md"
                    variant="outline"
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Join Tournament
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border animate-in slide-in-from-bottom-4 duration-700 hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>Recent {getGameDisplayName(selectedGame)} Matches</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {gameStats.recentMatches.map((match, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 animate-in slide-in-from-right-2 duration-300 hover:bg-muted/50 p-2 rounded-md transition-all"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full animate-pulse ${
                          match.result === "win" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="text-sm">
                          {match.result === "win" ? "Victory" : "Defeat"} - {match.score}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {match.map} • {match.date.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-6 animate-in slide-in-from-right-4 duration-700">
                <VoiceChat />
              </div>
            </div>

            {/* Performance Overview with enhanced animations */}
            <Card className="bg-card border-border animate-in slide-in-from-bottom-6 duration-700 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUpIcon className="h-5 w-5 mr-2 text-primary" />
                  {getGameDisplayName(selectedGame)} Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center animate-in zoom-in duration-500" style={{ animationDelay: "200ms" }}>
                    <div className="text-2xl font-bold text-green-500">{gameStats.winRate}%</div>
                    <div className="text-sm text-muted-foreground">Current Win Rate</div>
                  </div>
                  <div className="text-center animate-in zoom-in duration-500" style={{ animationDelay: "400ms" }}>
                    <div className="text-2xl font-bold text-blue-500">{gameStats.kda}</div>
                    <div className="text-sm text-muted-foreground">K/D/A Ratio</div>
                  </div>
                  <div className="text-center animate-in zoom-in duration-500" style={{ animationDelay: "600ms" }}>
                    <div className="text-2xl font-bold text-purple-500">{gameStats.hoursPlayed}h</div>
                    <div className="text-sm text-muted-foreground">Total Playtime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coach">
            <EnhancedCoachGPT />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>

          <TabsContent value="tournaments">
            <Tabs defaultValue="hub" className="space-y-6">
              <TabsList>
                <TabsTrigger value="hub">Tournament Hub</TabsTrigger>
                <TabsTrigger value="brackets">Live Brackets</TabsTrigger>
              </TabsList>
              <TabsContent value="hub">
                <TournamentHub />
              </TabsContent>
              <TabsContent value="brackets">
                <TournamentBrackets />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="teammates">
            <TeammatesChat />
          </TabsContent>

          <TabsContent value="team">
            <TeamSection />
          </TabsContent>

          <TabsContent value="stats">
            <PerformanceCharts />
          </TabsContent>

          <TabsContent value="challenges">
            <Challenges />
          </TabsContent>

          <TabsContent value="store">
            <AphroditeStore />
          </TabsContent>

          <TabsContent value="lagshield">
            <LagShield />
          </TabsContent>

          <TabsContent value="settings">
            <Tabs defaultValue="appearance" className="space-y-6">
              <TabsList>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="integrations">API Integrations</TabsTrigger>
                <TabsTrigger value="other">Other Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="appearance">
                <SettingsPage />
              </TabsContent>
              <TabsContent value="integrations">
                <APIIntegrations />
              </TabsContent>
              <TabsContent value="other">
                <SettingsPage />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>

      {/* Background Music Player with animation */}
      <div className="animate-in slide-in-from-bottom-4 duration-500">
        <BackgroundMusicPlayer />
      </div>
    </div>
  )
}

export default function AphroditeDashboard() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="aphrodite-theme">
      <GameStatsProvider>
        <DashboardContent />
      </GameStatsProvider>
    </ThemeProvider>
  )
}
