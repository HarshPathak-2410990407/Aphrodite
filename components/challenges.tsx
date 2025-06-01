"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrophyIcon,
  TargetIcon,
  ZapIcon,
  CalendarIcon,
  StarIcon,
  GiftIcon,
  CoinsIcon,
  CheckCircleIcon,
  ClockIcon,
  FlameIcon,
  AwardIcon,
  TrendingUpIcon,
} from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "achievement"
  difficulty: "easy" | "medium" | "hard"
  points: number
  progress: number
  maxProgress: number
  completed: boolean
  expiresAt?: Date
  icon: any
  category: string
}

interface UserPoints {
  total: number
  available: number
  earned: number
  spent: number
}

export default function Challenges() {
  const [userPoints, setUserPoints] = useState<UserPoints>({
    total: 2450,
    available: 1850,
    earned: 2450,
    spent: 600,
  })

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "daily-1",
      title: "Win 3 Matches",
      description: "Achieve victory in 3 ranked matches today",
      type: "daily",
      difficulty: "medium",
      points: 150,
      progress: 2,
      maxProgress: 3,
      completed: false,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      icon: TrophyIcon,
      category: "Combat",
    },
    {
      id: "daily-2",
      title: "Perfect Aim Training",
      description: "Complete 20 minutes of aim training",
      type: "daily",
      difficulty: "easy",
      points: 100,
      progress: 15,
      maxProgress: 20,
      completed: false,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      icon: TargetIcon,
      category: "Training",
    },
    {
      id: "daily-3",
      title: "Team Player",
      description: "Play 5 matches with your squad",
      type: "daily",
      difficulty: "easy",
      points: 75,
      progress: 5,
      maxProgress: 5,
      completed: true,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      icon: StarIcon,
      category: "Social",
    },
    {
      id: "weekly-1",
      title: "Rank Climber",
      description: "Gain 200 LP this week",
      type: "weekly",
      difficulty: "hard",
      points: 500,
      progress: 145,
      maxProgress: 200,
      completed: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      icon: TrendingUpIcon,
      category: "Progression",
    },
    {
      id: "weekly-2",
      title: "Consistency King",
      description: "Maintain 70%+ win rate for 20 games",
      type: "weekly",
      difficulty: "hard",
      points: 400,
      progress: 12,
      maxProgress: 20,
      completed: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      icon: FlameIcon,
      category: "Performance",
    },
    {
      id: "achievement-1",
      title: "First Blood Master",
      description: "Get first blood in 50 matches",
      type: "achievement",
      difficulty: "medium",
      points: 300,
      progress: 42,
      maxProgress: 50,
      completed: false,
      icon: ZapIcon,
      category: "Combat",
    },
  ])

  const [streakDays, setStreakDays] = useState(7)

  const handleClaimReward = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((challenge) => {
        if (challenge.id === challengeId && challenge.completed) {
          setUserPoints((points) => ({
            ...points,
            total: points.total + challenge.points,
            available: points.available + challenge.points,
            earned: points.earned + challenge.points,
          }))
          return { ...challenge, progress: 0, completed: false }
        }
        return challenge
      }),
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "border-green-500/30 text-green-400"
      case "medium":
        return "border-yellow-500/30 text-yellow-400"
      case "hard":
        return "border-red-500/30 text-red-400"
      default:
        return "border-gray-500/30 text-gray-400"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "daily":
        return "bg-blue-500/20 text-blue-300"
      case "weekly":
        return "bg-purple-500/20 text-purple-300"
      case "achievement":
        return "bg-orange-500/20 text-orange-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const dailyChallenges = challenges.filter((c) => c.type === "daily")
  const weeklyChallenges = challenges.filter((c) => c.type === "weekly")
  const achievements = challenges.filter((c) => c.type === "achievement")

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-700">
      {/* Header with Points */}
      <div className="flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center space-x-3">
          <TrophyIcon className="h-8 w-8 text-primary animate-bounce" />
          <div>
            <h2 className="text-2xl font-semibold">Challenges</h2>
            <p className="text-sm text-muted-foreground">Complete tasks to earn Aphrodite Points</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CoinsIcon className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-lg font-bold text-primary">{userPoints.available.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Available Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FlameIcon className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-lg font-bold text-orange-500">{streakDays}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Points Overview */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10 animate-in slide-in-from-left-4 duration-700">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AwardIcon className="h-5 w-5 mr-2 text-primary" />
            Points Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center animate-in zoom-in duration-500" style={{ animationDelay: "100ms" }}>
              <div className="text-2xl font-bold text-primary">{userPoints.total.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Earned</div>
            </div>
            <div className="text-center animate-in zoom-in duration-500" style={{ animationDelay: "200ms" }}>
              <div className="text-2xl font-bold text-green-500">{userPoints.available.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
            <div className="text-center animate-in zoom-in duration-500" style={{ animationDelay: "300ms" }}>
              <div className="text-2xl font-bold text-blue-500">{userPoints.spent.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Spent</div>
            </div>
            <div className="text-center animate-in zoom-in duration-500" style={{ animationDelay: "400ms" }}>
              <div className="text-2xl font-bold text-purple-500">{streakDays}</div>
              <div className="text-sm text-muted-foreground">Daily Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="daily" className="transition-all duration-300 hover:scale-105">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Daily ({dailyChallenges.filter((c) => !c.completed).length})
          </TabsTrigger>
          <TabsTrigger value="weekly" className="transition-all duration-300 hover:scale-105">
            <TrophyIcon className="h-4 w-4 mr-2" />
            Weekly ({weeklyChallenges.filter((c) => !c.completed).length})
          </TabsTrigger>
          <TabsTrigger value="achievements" className="transition-all duration-300 hover:scale-105">
            <AwardIcon className="h-4 w-4 mr-2" />
            Achievements ({achievements.filter((c) => !c.completed).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyChallenges.map((challenge, index) => (
              <Card
                key={challenge.id}
                className={`bg-card border-border transition-all duration-500 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-4 ${
                  challenge.completed ? "border-green-500/30 bg-green-500/5" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <challenge.icon className="h-6 w-6 text-primary" />
                    <div className="flex space-x-2">
                      <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      <Badge className={getTypeColor(challenge.type)}>{challenge.type}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {challenge.progress}/{challenge.maxProgress}
                      </span>
                    </div>
                    <Progress
                      value={(challenge.progress / challenge.maxProgress) * 100}
                      className="h-2 transition-all duration-300"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CoinsIcon className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-primary">{challenge.points} pts</span>
                    </div>
                    {challenge.expiresAt && (
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <ClockIcon className="h-3 w-3" />
                        <span>{Math.ceil((challenge.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60))}h left</span>
                      </div>
                    )}
                  </div>

                  {challenge.completed ? (
                    <Button
                      onClick={() => handleClaimReward(challenge.id)}
                      className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30 transition-all duration-300 hover:scale-105"
                    >
                      <GiftIcon className="h-4 w-4 mr-2" />
                      Claim Reward
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      In Progress
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weeklyChallenges.map((challenge, index) => (
              <Card
                key={challenge.id}
                className={`bg-card border-border transition-all duration-500 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-4 ${
                  challenge.completed ? "border-green-500/30 bg-green-500/5" : ""
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <challenge.icon className="h-8 w-8 text-primary" />
                    <div className="flex space-x-2">
                      <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      <Badge className={getTypeColor(challenge.type)}>{challenge.type}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {challenge.progress}/{challenge.maxProgress}
                      </span>
                    </div>
                    <Progress
                      value={(challenge.progress / challenge.maxProgress) * 100}
                      className="h-3 transition-all duration-300"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CoinsIcon className="h-5 w-5 text-primary" />
                      <span className="font-bold text-primary text-lg">{challenge.points} pts</span>
                    </div>
                    {challenge.expiresAt && (
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <ClockIcon className="h-4 w-4" />
                        <span>
                          {Math.ceil((challenge.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                        </span>
                      </div>
                    )}
                  </div>

                  {challenge.completed ? (
                    <Button
                      onClick={() => handleClaimReward(challenge.id)}
                      className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30 transition-all duration-300 hover:scale-105"
                    >
                      <GiftIcon className="h-4 w-4 mr-2" />
                      Claim Reward
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      In Progress
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((challenge, index) => (
              <Card
                key={challenge.id}
                className={`bg-card border-border transition-all duration-500 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-4 ${
                  challenge.completed ? "border-green-500/30 bg-green-500/5" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <challenge.icon className="h-6 w-6 text-primary" />
                    <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {challenge.progress}/{challenge.maxProgress}
                      </span>
                    </div>
                    <Progress
                      value={(challenge.progress / challenge.maxProgress) * 100}
                      className="h-2 transition-all duration-300"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CoinsIcon className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-primary">{challenge.points} pts</span>
                    </div>
                    <Badge variant="secondary">{challenge.category}</Badge>
                  </div>

                  {challenge.completed ? (
                    <Button
                      onClick={() => handleClaimReward(challenge.id)}
                      className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30 transition-all duration-300 hover:scale-105"
                    >
                      <GiftIcon className="h-4 w-4 mr-2" />
                      Claim Reward
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      In Progress
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
