"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUpIcon, TrendingDownIcon, TargetIcon, ZapIcon, StarIcon, BarChartIcon } from "lucide-react"

interface ChartData {
  label: string
  value: number
  change: number
}

export default function PerformanceCharts() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const winRateData: ChartData[] = [
    { label: "Mon", value: 65, change: 2 },
    { label: "Tue", value: 72, change: 7 },
    { label: "Wed", value: 68, change: -4 },
    { label: "Thu", value: 75, change: 7 },
    { label: "Fri", value: 73, change: -2 },
    { label: "Sat", value: 78, change: 5 },
    { label: "Sun", value: 73, change: -5 },
  ]

  const kdaData: ChartData[] = [
    { label: "Mon", value: 1.2, change: 0.1 },
    { label: "Tue", value: 1.4, change: 0.2 },
    { label: "Wed", value: 1.3, change: -0.1 },
    { label: "Thu", value: 1.6, change: 0.3 },
    { label: "Fri", value: 1.5, change: -0.1 },
    { label: "Sat", value: 1.7, change: 0.2 },
    { label: "Sun", value: 1.4, change: -0.3 },
  ]

  const rankProgressData: ChartData[] = [
    { label: "Week 1", value: 1850, change: 50 },
    { label: "Week 2", value: 1920, change: 70 },
    { label: "Week 3", value: 1880, change: -40 },
    { label: "Week 4", value: 1950, change: 70 },
  ]

  const BarChart = ({
    data,
    color,
    title,
    unit = "",
  }: {
    data: ChartData[]
    color: string
    title: string
    unit?: string
  }) => {
    const maxValue = Math.max(...data.map((d) => d.value))

    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <BarChartIcon className="h-5 w-5 mr-2 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end justify-between h-32 space-x-2">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div className="relative w-full">
                    <div
                      className={`w-full ${color} rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer`}
                      style={{
                        height: `${(item.value / maxValue) * 100}px`,
                        animationDelay: `${index * 100}ms`,
                      }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg">
                      {item.value}
                      {unit}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{item.label}</div>
                  <div
                    className={`text-xs flex items-center mt-1 ${item.change > 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {item.change > 0 ? (
                      <TrendingUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(item.change)}
                    {unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const LineChart = ({
    data,
    color,
    title,
    unit = "",
  }: {
    data: ChartData[]
    color: string
    title: string
    unit?: string
  }) => {
    const maxValue = Math.max(...data.map((d) => d.value))
    const minValue = Math.min(...data.map((d) => d.value))
    const range = maxValue - minValue

    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUpIcon className="h-5 w-5 mr-2 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-32 w-full">
            <svg className="w-full h-full" viewBox="0 0 400 120">
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={color.replace("bg-", "").replace("-500", "")} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={color.replace("bg-", "").replace("-500", "")} stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 24}
                  x2="400"
                  y2={i * 24}
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                />
              ))}

              {/* Line path */}
              <path
                d={`M ${data
                  .map(
                    (item, index) =>
                      `${(index / (data.length - 1)) * 380 + 10},${120 - ((item.value - minValue) / range) * 100 - 10}`,
                  )
                  .join(" L ")}`}
                fill="none"
                stroke={color.replace("bg-", "").replace("-500", "")}
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-in draw-in duration-1000"
              />

              {/* Area fill */}
              <path
                d={`M ${data
                  .map(
                    (item, index) =>
                      `${(index / (data.length - 1)) * 380 + 10},${120 - ((item.value - minValue) / range) * 100 - 10}`,
                  )
                  .join(" L ")} L ${((data.length - 1) / (data.length - 1)) * 380 + 10},110 L 10,110 Z`}
                fill={`url(#gradient-${title})`}
                className="animate-in fade-in duration-1000"
              />

              {/* Data points */}
              {data.map((item, index) => (
                <circle
                  key={index}
                  cx={(index / (data.length - 1)) * 380 + 10}
                  cy={120 - ((item.value - minValue) / range) * 100 - 10}
                  r="4"
                  fill={color.replace("bg-", "").replace("-500", "")}
                  className="hover:r-6 transition-all cursor-pointer animate-in zoom-in duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </svg>

            {/* Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
              {data.map((item, index) => (
                <span key={index}>{item.label}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
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
          <TabsTrigger value="detailed">Detailed</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChart data={winRateData} color="bg-green-500" title="Win Rate Trend" unit="%" />
            <LineChart data={kdaData} color="bg-blue-500" title="K/D/A Progress" />
          </div>

          <LineChart data={rankProgressData} color="bg-purple-500" title="Rank Progress" unit=" LP" />
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TargetIcon className="h-5 w-5 mr-2 text-primary" />
                  Accuracy Heatmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }, (_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-sm ${
                        Math.random() > 0.7
                          ? "bg-green-500"
                          : Math.random() > 0.4
                            ? "bg-yellow-500"
                            : Math.random() > 0.2
                              ? "bg-orange-500"
                              : "bg-red-500"
                      } opacity-80 hover:opacity-100 transition-opacity cursor-pointer animate-in zoom-in`}
                      style={{ animationDelay: `${i * 20}ms` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <ZapIcon className="h-5 w-5 mr-2 text-primary" />
                  Reaction Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary animate-pulse">245ms</div>
                    <div className="text-sm text-muted-foreground">Average</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Best</span>
                      <span className="text-green-500">198ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Worst</span>
                      <span className="text-red-500">312ms</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <StarIcon className="h-5 w-5 mr-2 text-primary" />
                  Skill Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: "Aim", rating: 85 },
                    { skill: "Game Sense", rating: 72 },
                    { skill: "Positioning", rating: 68 },
                    { skill: "Team Play", rating: 79 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.skill}</span>
                        <span>{item.rating}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${item.rating}%`,
                            animationDelay: `${index * 200}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>vs Friends</CardTitle>
                <CardDescription>How you compare to your gaming friends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "You", value: 73, color: "bg-primary" },
                    { name: "ShadowStrike", value: 78, color: "bg-green-500" },
                    { name: "MysticHealer", value: 68, color: "bg-blue-500" },
                    { name: "IronWill", value: 71, color: "bg-purple-500" },
                  ].map((player, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className={player.name === "You" ? "font-bold" : ""}>{player.name}</span>
                        <span>{player.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`${player.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{
                            width: `${player.value}%`,
                            animationDelay: `${index * 150}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Rank Distribution</CardTitle>
                <CardDescription>Your rank compared to all players</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: "Immortal", percentage: 2, isYou: false },
                    { rank: "Diamond", percentage: 8, isYou: true },
                    { rank: "Platinum", percentage: 15, isYou: false },
                    { rank: "Gold", percentage: 25, isYou: false },
                    { rank: "Silver", percentage: 30, isYou: false },
                    { rank: "Bronze", percentage: 20, isYou: false },
                  ].map((tier, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded ${tier.isYou ? "bg-primary/20 border border-primary/30" : ""}`}
                    >
                      <div className="flex justify-between text-sm">
                        <span className={tier.isYou ? "font-bold" : ""}>{tier.rank}</span>
                        <span>{tier.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1 mt-1">
                        <div
                          className={`${tier.isYou ? "bg-primary" : "bg-muted-foreground"} h-1 rounded-full transition-all duration-1000`}
                          style={{
                            width: `${tier.percentage}%`,
                            animationDelay: `${index * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
