"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ShieldIcon,
  ZapIcon,
  MonitorIcon,
  ThermometerIcon,
  CpuIcon,
  WifiIcon,
  RefreshCwIcon,
  TrashIcon,
  NotebookTabsIcon as TabsIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  SettingsIcon,
  GamepadIcon,
  NetworkIcon,
} from "lucide-react"

interface SystemStats {
  cpuTemp: number
  gpuTemp: number
  fanSpeed: number
  ramUsage: number
  cpuUsage: number
  diskUsage: number
  networkLatency: number
}

export default function LagShield() {
  const [systemStats, setSystemStats] = useState<SystemStats>({
    cpuTemp: 45,
    gpuTemp: 52,
    fanSpeed: 1200,
    ramUsage: 68,
    cpuUsage: 35,
    diskUsage: 45,
    networkLatency: 25,
  })
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [lastOptimized, setLastOptimized] = useState<Date | null>(null)
  const [openTabs, setOpenTabs] = useState(12)
  const [cacheSize, setCacheSize] = useState(245)

  // Simulate real-time system monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        cpuTemp: Math.max(35, Math.min(85, prev.cpuTemp + (Math.random() - 0.5) * 4)),
        gpuTemp: Math.max(40, Math.min(90, prev.gpuTemp + (Math.random() - 0.5) * 3)),
        fanSpeed: Math.max(800, Math.min(2500, prev.fanSpeed + (Math.random() - 0.5) * 100)),
        ramUsage: Math.max(20, Math.min(95, prev.ramUsage + (Math.random() - 0.5) * 5)),
        cpuUsage: Math.max(10, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        diskUsage: Math.max(20, Math.min(100, prev.diskUsage + (Math.random() - 0.5) * 3)),
        networkLatency: Math.max(5, Math.min(150, prev.networkLatency + (Math.random() - 0.5) * 10)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleCloseTabs = async () => {
    setIsOptimizing(true)
    // Simulate closing tabs
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setOpenTabs((prev) => Math.max(1, prev - Math.floor(Math.random() * 8) - 3))
    setIsOptimizing(false)
    setLastOptimized(new Date())
  }

  const handleClearCache = async () => {
    setIsOptimizing(true)
    // Simulate clearing cache
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setCacheSize((prev) => Math.max(10, prev - Math.floor(Math.random() * 200) - 50))
    setIsOptimizing(false)
    setLastOptimized(new Date())
  }

  const handleFullOptimization = async () => {
    setIsOptimizing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Simulate optimization effects
    setSystemStats((prev) => ({
      ...prev,
      cpuTemp: Math.max(35, prev.cpuTemp - 8),
      gpuTemp: Math.max(40, prev.gpuTemp - 6),
      ramUsage: Math.max(20, prev.ramUsage - 15),
      cpuUsage: Math.max(10, prev.cpuUsage - 20),
      networkLatency: Math.max(5, prev.networkLatency - 10),
    }))

    setOpenTabs(3)
    setCacheSize(15)
    setIsOptimizing(false)
    setLastOptimized(new Date())
  }

  const getTemperatureColor = (temp: number) => {
    if (temp < 50) return "text-green-500"
    if (temp < 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getUsageColor = (usage: number) => {
    if (usage < 50) return "bg-green-500"
    if (usage < 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  const performanceTips = [
    {
      category: "Graphics Settings",
      icon: MonitorIcon,
      tips: [
        "Lower texture quality to Medium or High instead of Ultra",
        "Disable or reduce anti-aliasing (MSAA/FXAA)",
        "Turn off motion blur and depth of field effects",
        "Reduce shadow quality and distance",
        "Lower render scale to 90-95% if needed",
      ],
    },
    {
      category: "System Optimization",
      icon: CpuIcon,
      tips: [
        "Close unnecessary background applications",
        "Disable Windows Game Bar and Xbox Game Mode",
        "Set game to High Priority in Task Manager",
        "Update graphics drivers regularly",
        "Clean temporary files and registry",
      ],
    },
    {
      category: "Network Optimization",
      icon: NetworkIcon,
      tips: [
        "Use wired Ethernet connection instead of WiFi",
        "Close bandwidth-heavy applications (streaming, downloads)",
        "Change DNS to 8.8.8.8 or 1.1.1.1",
        "Enable QoS (Quality of Service) on your router",
        "Use gaming VPN for better routing",
      ],
    },
    {
      category: "Hardware Tips",
      icon: SettingsIcon,
      tips: [
        "Ensure adequate cooling and clean dust from fans",
        "Monitor CPU and GPU temperatures",
        "Close Chrome tabs to free up RAM",
        "Defragment hard drives (not needed for SSDs)",
        "Consider upgrading RAM if usage is consistently high",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShieldIcon className="h-8 w-8 text-primary animate-pulse" />
          <div>
            <h2 className="text-2xl font-semibold">Lag Shield</h2>
            <p className="text-sm text-muted-foreground">Optimize your gaming performance</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-green-500/30 text-green-400">
            <ZapIcon className="h-3 w-3 mr-1" />
            Active Protection
          </Badge>
          {lastOptimized && <Badge variant="secondary">Last optimized: {lastOptimized.toLocaleTimeString()}</Badge>}
        </div>
      </div>

      <Tabs defaultValue="tools" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tools">Optimization Tools</TabsTrigger>
          <TabsTrigger value="monitoring">System Monitor</TabsTrigger>
          <TabsTrigger value="tips">Performance Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Optimization */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ZapIcon className="h-5 w-5 mr-2 text-primary" />
                  Quick Optimization
                </CardTitle>
                <CardDescription>One-click performance boost</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleFullOptimization}
                  disabled={isOptimizing}
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  {isOptimizing ? (
                    <>
                      <RefreshCwIcon className="h-5 w-5 mr-2 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <ShieldIcon className="h-5 w-5 mr-2" />
                      Activate Lag Shield
                    </>
                  )}
                </Button>
                <div className="text-sm text-muted-foreground text-center">
                  Closes tabs, clears cache, and optimizes system settings
                </div>
              </CardContent>
            </Card>

            {/* Individual Tools */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon className="h-5 w-5 mr-2 text-primary" />
                  Individual Tools
                </CardTitle>
                <CardDescription>Targeted optimization options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TabsIcon className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Browser Tabs</span>
                    <Badge variant="outline">{openTabs} open</Badge>
                  </div>
                  <Button size="sm" onClick={handleCloseTabs} disabled={isOptimizing} variant="outline">
                    Close Excess
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrashIcon className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Cache Size</span>
                    <Badge variant="outline">{cacheSize}MB</Badge>
                  </div>
                  <Button size="sm" onClick={handleClearCache} disabled={isOptimizing} variant="outline">
                    Clear Cache
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUpIcon className="h-5 w-5 mr-2 text-primary" />
                Performance Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{100 - Math.round(systemStats.cpuUsage)}%</div>
                  <div className="text-sm text-muted-foreground">CPU Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{100 - Math.round(systemStats.ramUsage)}%</div>
                  <div className="text-sm text-muted-foreground">RAM Free</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">{Math.round(systemStats.networkLatency)}ms</div>
                  <div className="text-sm text-muted-foreground">Network Ping</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{openTabs}</div>
                  <div className="text-sm text-muted-foreground">Open Tabs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Alert>
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertDescription>
              System monitoring shows simulated data. For real hardware monitoring, use dedicated software like HWiNFO64
              or MSI Afterburner.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CPU Temperature */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <ThermometerIcon className="h-5 w-5 mr-2 text-primary" />
                  CPU Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getTemperatureColor(systemStats.cpuTemp)}`}>
                    {Math.round(systemStats.cpuTemp)}°C
                  </div>
                  <Progress value={(systemStats.cpuTemp / 100) * 100} className="mt-2" />
                  <div className="text-sm text-muted-foreground mt-2">
                    {systemStats.cpuTemp < 60 ? "Optimal" : systemStats.cpuTemp < 80 ? "Warm" : "Hot"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GPU Temperature */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MonitorIcon className="h-5 w-5 mr-2 text-primary" />
                  GPU Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getTemperatureColor(systemStats.gpuTemp)}`}>
                    {Math.round(systemStats.gpuTemp)}°C
                  </div>
                  <Progress value={(systemStats.gpuTemp / 100) * 100} className="mt-2" />
                  <div className="text-sm text-muted-foreground mt-2">
                    {systemStats.gpuTemp < 65 ? "Optimal" : systemStats.gpuTemp < 85 ? "Warm" : "Hot"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fan Speed */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <RefreshCwIcon className="h-5 w-5 mr-2 text-primary animate-spin" />
                  Fan Speed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-500">{Math.round(systemStats.fanSpeed)}</div>
                  <div className="text-sm text-muted-foreground">RPM</div>
                  <Progress value={(systemStats.fanSpeed / 2500) * 100} className="mt-2" />
                </div>
              </CardContent>
            </Card>

            {/* RAM Usage */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CpuIcon className="h-5 w-5 mr-2 text-primary" />
                  RAM Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-500">{Math.round(systemStats.ramUsage)}%</div>
                  <Progress value={systemStats.ramUsage} className={`mt-2 ${getUsageColor(systemStats.ramUsage)}`} />
                  <div className="text-sm text-muted-foreground mt-2">
                    {systemStats.ramUsage < 70 ? "Good" : systemStats.ramUsage < 90 ? "High" : "Critical"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CPU Usage */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CpuIcon className="h-5 w-5 mr-2 text-primary" />
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">{Math.round(systemStats.cpuUsage)}%</div>
                  <Progress value={systemStats.cpuUsage} className={`mt-2 ${getUsageColor(systemStats.cpuUsage)}`} />
                  <div className="text-sm text-muted-foreground mt-2">
                    {systemStats.cpuUsage < 50 ? "Low" : systemStats.cpuUsage < 80 ? "Moderate" : "High"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Network Latency */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <WifiIcon className="h-5 w-5 mr-2 text-primary" />
                  Network Latency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">{Math.round(systemStats.networkLatency)}ms</div>
                  <Progress value={(systemStats.networkLatency / 150) * 100} className="mt-2" />
                  <div className="text-sm text-muted-foreground mt-2">
                    {systemStats.networkLatency < 30 ? "Excellent" : systemStats.networkLatency < 60 ? "Good" : "Poor"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {performanceTips.map((category, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <category.icon className="h-5 w-5 mr-2 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gaming-Specific Tips */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GamepadIcon className="h-5 w-5 mr-2 text-primary" />
                Game-Specific Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Competitive FPS Games</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Disable V-Sync for lower input lag</li>
                    <li>• Use fullscreen mode, not borderless</li>
                    <li>• Set refresh rate to maximum</li>
                    <li>• Lower graphics for higher FPS</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Battle Royale Games</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Optimize view distance settings</li>
                    <li>• Reduce particle effects</li>
                    <li>• Use performance mode if available</li>
                    <li>• Monitor temperature during long sessions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
