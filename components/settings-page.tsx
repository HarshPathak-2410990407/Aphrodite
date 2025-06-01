"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "@/components/theme-provider"
import {
  SettingsIcon,
  MoonIcon,
  SunIcon,
  VolumeIcon,
  BellIcon,
  ShieldIcon,
  GamepadIcon,
  KeyIcon,
  DatabaseIcon,
  WifiIcon,
  PaletteIcon,
} from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState({
    notifications: {
      gameInvites: true,
      friendRequests: true,
      achievements: true,
      systemUpdates: false,
      coachTips: true,
    },
    audio: {
      masterVolume: [75],
      gameVolume: [80],
      voiceVolume: [70],
      notificationVolume: [60],
    },
    privacy: {
      showOnlineStatus: true,
      allowFriendRequests: true,
      showGameStats: true,
      shareAchievements: true,
    },
    performance: {
      autoOptimize: true,
      backgroundApps: true,
      gameMode: true,
      hardwareAcceleration: true,
    },
    geminiApiKey: "",
  })

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
  }

  const themes = [
    { id: "dark", name: "Dark", description: "Dark theme with subtle colors" },
    { id: "light", name: "Light", description: "Clean light theme" },
    { id: "gaming", name: "Gaming", description: "Purple and blue gaming theme" },
    { id: "neon", name: "Neon", description: "Bright neon colors" },
    { id: "matrix", name: "Matrix", description: "Green matrix-style theme" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <Badge variant="outline">
          <SettingsIcon className="h-3 w-3 mr-1" />
          Preferences
        </Badge>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PaletteIcon className="h-5 w-5 mr-2 text-primary" />
                Theme Settings
              </CardTitle>
              <CardDescription>Customize the appearance of Aphrodite</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map((themeOption) => (
                  <Card
                    key={themeOption.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      theme === themeOption.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setTheme(themeOption.id as any)}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-full h-16 rounded mb-3 ${
                          themeOption.id === "dark"
                            ? "bg-gradient-to-br from-gray-800 to-gray-900"
                            : themeOption.id === "light"
                              ? "bg-gradient-to-br from-gray-100 to-gray-200"
                              : themeOption.id === "gaming"
                                ? "bg-gradient-to-br from-purple-600 to-blue-600"
                                : themeOption.id === "neon"
                                  ? "bg-gradient-to-br from-pink-500 to-cyan-500"
                                  : "bg-gradient-to-br from-green-600 to-green-800"
                        }`}
                      ></div>
                      <h3 className="font-medium">{themeOption.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{themeOption.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">Toggle between light and dark themes</p>
                </div>
                <div className="flex items-center space-x-2">
                  <SunIcon className="h-4 w-4 text-yellow-500" />
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                  <MoonIcon className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellIcon className="h-5 w-5 mr-2 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Control what notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {key === "gameInvites" && "Receive notifications for game invitations"}
                      {key === "friendRequests" && "Get notified when someone sends a friend request"}
                      {key === "achievements" && "Celebrate your gaming achievements"}
                      {key === "systemUpdates" && "Stay informed about system updates"}
                      {key === "coachTips" && "Receive AI coaching recommendations"}
                    </p>
                  </div>
                  <Switch checked={value} onCheckedChange={(checked) => updateSetting("notifications", key, checked)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <VolumeIcon className="h-5 w-5 mr-2 text-primary" />
                Audio Settings
              </CardTitle>
              <CardDescription>Adjust volume levels and audio preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(settings.audio).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <span className="text-sm text-muted-foreground">{value[0]}%</span>
                  </div>
                  <Slider
                    value={value}
                    onValueChange={(newValue) => updateSetting("audio", key, newValue)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldIcon className="h-5 w-5 mr-2 text-primary" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Control your privacy and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {key === "showOnlineStatus" && "Let friends see when you're online"}
                      {key === "allowFriendRequests" && "Allow others to send friend requests"}
                      {key === "showGameStats" && "Display your gaming statistics publicly"}
                      {key === "shareAchievements" && "Share achievements with friends"}
                    </p>
                  </div>
                  <Switch checked={value} onCheckedChange={(checked) => updateSetting("privacy", key, checked)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GamepadIcon className="h-5 w-5 mr-2 text-primary" />
                Performance Settings
              </CardTitle>
              <CardDescription>Optimize Aphrodite for better performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.performance).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {key === "autoOptimize" && "Automatically optimize system for gaming"}
                      {key === "backgroundApps" && "Close unnecessary background applications"}
                      {key === "gameMode" && "Enable Windows Game Mode"}
                      {key === "hardwareAcceleration" && "Use hardware acceleration when available"}
                    </p>
                  </div>
                  <Switch checked={value} onCheckedChange={(checked) => updateSetting("performance", key, checked)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <KeyIcon className="h-5 w-5 mr-2 text-primary" />
                API Integrations
              </CardTitle>
              <CardDescription>Configure external service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Google Gemini API Key</Label>
                <p className="text-xs text-muted-foreground">
                  Enter your Google Gemini API key to power CoachGPT with advanced AI
                </p>
                <Input
                  type="password"
                  placeholder="Enter your Gemini API key..."
                  value={settings.geminiApiKey}
                  onChange={(e) => setSettings((prev) => ({ ...prev, geminiApiKey: e.target.value }))}
                />
                <Button size="sm" variant="outline">
                  Test Connection
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <DatabaseIcon className="h-8 w-8 text-green-500" />
                      <div>
                        <h3 className="font-medium">Steam Integration</h3>
                        <p className="text-xs text-muted-foreground">Connected</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <WifiIcon className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-medium">Discord Bot</h3>
                        <p className="text-xs text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
