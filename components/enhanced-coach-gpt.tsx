"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useGameStats } from "@/components/game-stats-provider"
import {
  BotIcon,
  SendIcon,
  TrendingUpIcon,
  TargetIcon,
  BrainIcon,
  MessageCircleIcon,
  SparklesIcon,
  MicIcon,
  ImageIcon,
  GamepadIcon,
  UserIcon,
  RefreshCwIcon,
  TrophyIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  SettingsIcon,
  DatabaseIcon,
} from "lucide-react"

interface Message {
  id: number
  type: "user" | "coach" | "system"
  content: string
  timestamp: Date
  category: "gaming" | "general"
}

interface KnowledgeEntry {
  question: string
  answer: string
}

export default function EnhancedCoachGPT() {
  const { selectedGame, gameStats } = useGameStats()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "coach",
      content: `Hello! I'm CoachGPT, powered by Google Gemini AI and trained on extensive gaming knowledge. I can help you with gaming strategies, general conversations, and specific game mechanics. I see you're currently playing ${selectedGame}. How can I assist you today?`,
      timestamp: new Date(),
      category: "general",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationMode, setConversationMode] = useState<"gaming" | "general">("gaming")
  const [apiKey, setApiKey] = useState("AIzaSyBHfLeIO3BS_gbBmwimJAwhdirwizBpSyc")
  const [apiStatus, setApiStatus] = useState<"unknown" | "connected" | "error">("unknown")
  const [showApiSettings, setShowApiSettings] = useState(false)
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeEntry[]>([])
  const [knowledgeLoaded, setKnowledgeLoaded] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const gameSpecificTips = {
    valorant: [
      "How to smoke mid on Mirage?",
      "Best agent for beginners?",
      "Economy management tips",
      "Site execution strategies",
      "Clutch situation advice",
    ],
    cs2: [
      "Improve my spray control",
      "Map positioning advice",
      "Grenade usage tips",
      "Anti-eco strategies",
      "Retake execution",
    ],
    overwatch: [
      "Hero synergy advice",
      "Ultimate timing tips",
      "Positioning for my role",
      "Counter-pick strategies",
      "Team coordination",
    ],
    apex: [
      "Legend selection tips",
      "Third-party strategies",
      "Ring positioning",
      "Weapon meta advice",
      "Squad communication",
    ],
    lol: [
      "Champion matchup advice",
      "Jungle pathing tips",
      "Wave management",
      "Team fight positioning",
      "Objective control",
    ],
    rocket: [
      "Aerial control tips",
      "Rotation strategies",
      "Boost management",
      "Defensive positioning",
      "Shot accuracy",
    ],
    fortnite: [
      "Building techniques",
      "Zone rotation tips",
      "Weapon loadout advice",
      "Edit course strategies",
      "End game positioning",
    ],
    dota2: ["Hero itemization", "Farming patterns", "Ward placement", "Team fight execution", "Objective timing"],
  }

  const generalTopics = [
    "Tell me a joke",
    "Explain quantum physics",
    "Help with homework",
    "Career advice",
    "Cooking recipes",
    "Movie recommendations",
    "Life advice",
    "Technology trends",
  ]

  // Load knowledge base on component mount
  useEffect(() => {
    const loadKnowledgeBase = async () => {
      try {
        const response = await fetch("/data/aphrodite_knowledge_base.csv")
        const csvText = await response.text()

        // Parse CSV
        const lines = csvText.split("\n")
        const knowledge: KnowledgeEntry[] = []

        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const line = lines[i]
            const firstCommaIndex = line.indexOf(",")
            if (firstCommaIndex !== -1) {
              const question = line.substring(0, firstCommaIndex).replace(/"/g, "").trim()
              const answer = line
                .substring(firstCommaIndex + 1)
                .replace(/"/g, "")
                .trim()
              knowledge.push({ question, answer })
            }
          }
        }

        setKnowledgeBase(knowledge)
        setKnowledgeLoaded(true)
        console.log(`Loaded ${knowledge.length} knowledge entries`)
      } catch (error) {
        console.error("Failed to load knowledge base:", error)
        setKnowledgeLoaded(false)
      }
    }

    loadKnowledgeBase()
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const findRelevantKnowledge = (userMessage: string): KnowledgeEntry | null => {
    if (!knowledgeLoaded || knowledgeBase.length === 0) return null

    const lowerMessage = userMessage.toLowerCase()

    // Find exact or partial matches
    for (const entry of knowledgeBase) {
      const lowerQuestion = entry.question.toLowerCase()

      // Check for exact match
      if (lowerQuestion === lowerMessage) {
        return entry
      }

      // Check for partial matches (at least 3 words in common)
      const messageWords = lowerMessage.split(" ").filter((word) => word.length > 2)
      const questionWords = lowerQuestion.split(" ").filter((word) => word.length > 2)

      const commonWords = messageWords.filter((word) => questionWords.includes(word))
      if (commonWords.length >= 2) {
        return entry
      }
    }

    return null
  }

  const testApiConnection = async (): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Hello, this is a test message.",
                  },
                ],
              },
            ],
          }),
        },
      )

      if (response.ok) {
        setApiStatus("connected")
        return true
      } else {
        console.error("API Test failed:", response.status, response.statusText)
        setApiStatus("error")
        return false
      }
    } catch (error) {
      console.error("API Test error:", error)
      setApiStatus("error")
      return false
    }
  }

  const callGeminiAI = async (userMessage: string): Promise<string> => {
    if (!apiKey || apiKey.trim() === "") {
      throw new Error("API key not configured")
    }

    try {
      // Check for relevant knowledge first
      const relevantKnowledge = findRelevantKnowledge(userMessage)

      let systemPrompt = ""
      if (conversationMode === "gaming") {
        systemPrompt = `You are CoachGPT, an expert gaming coach specializing in ${selectedGame}. The user is currently ${gameStats.currentRank} with a ${gameStats.winRate}% win rate and ${gameStats.kda} K/D/A ratio.`

        if (relevantKnowledge) {
          systemPrompt += ` I have specific knowledge about this topic: "${relevantKnowledge.question}" - ${relevantKnowledge.answer}. Use this information to provide a comprehensive answer.`
        }

        systemPrompt += ` Provide specific, actionable gaming advice. Be encouraging and focus on improvement strategies. Keep responses concise but helpful (under 300 words).`
      } else {
        systemPrompt = `You are CoachGPT, a helpful AI assistant. You can discuss any topic - gaming, life advice, general questions, or casual conversation. Be friendly, informative, and engaging. Keep responses conversational and helpful (under 300 words).`
      }

      const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: fullPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 500,
            },
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.text()
        console.error("Gemini API Error:", response.status, response.statusText, errorData)
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()

      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        setApiStatus("connected")
        return data.candidates[0].content.parts[0].text || "I received your message but couldn't generate a response."
      } else {
        throw new Error("Invalid response format from Gemini API")
      }
    } catch (error) {
      console.error("Gemini API Error:", error)
      setApiStatus("error")
      throw error
    }
  }

  const getFallbackResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    // Enhanced greeting responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      const greetings = [
        `Hello! I'm CoachGPT, your AI gaming assistant. I see you're playing ${selectedGame} with a ${gameStats.winRate}% win rate - that's solid! How can I help you improve today?`,
        `Hey there! Welcome to CoachGPT. I'm here to help you dominate in ${selectedGame}. With your current ${gameStats.currentRank} rank, I can provide personalized tips to help you climb even higher!`,
        `Hi! Great to see you back. I've been analyzing gaming strategies and I'm ready to help you level up your ${selectedGame} gameplay. What would you like to work on?`,
      ]
      return greetings[Math.floor(Math.random() * greetings.length)]
    }

    if (lowerMessage.includes("how are you") || lowerMessage.includes("how's it going")) {
      return `I'm doing great! I've been studying the latest ${selectedGame} meta and analyzing pro player strategies. I'm excited to help you improve your gameplay. How has your gaming session been going?`
    }

    if (
      lowerMessage.includes("good morning") ||
      lowerMessage.includes("good afternoon") ||
      lowerMessage.includes("good evening")
    ) {
      const timeGreetings = [
        `Good to see you! Ready for some ${selectedGame} coaching? I've got some fresh strategies that could help boost your performance.`,
        `Hope you're having a great day! Let's make it even better by improving your ${selectedGame} skills. What aspect of your gameplay would you like to focus on?`,
        `Welcome back! I'm here and ready to help you dominate your next ${selectedGame} matches. What can we work on together?`,
      ]
      return timeGreetings[Math.floor(Math.random() * timeGreetings.length)]
    }

    if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks")) {
      return `You're very welcome! I'm always here to help you improve at ${selectedGame}. Feel free to ask me anything about strategies, techniques, or game mechanics. Good luck in your next matches!`
    }

    if (lowerMessage.includes("who are you") || lowerMessage.includes("what are you")) {
      return `I'm CoachGPT, your personal AI gaming coach powered by Google Gemini and trained on extensive gaming knowledge. I specialize in helping players like you improve at ${selectedGame} and other competitive games. I can analyze your performance, suggest strategies, and provide personalized coaching based on your current rank of ${gameStats.currentRank}.`
    }

    // First check knowledge base
    const relevantKnowledge = findRelevantKnowledge(message)
    if (relevantKnowledge) {
      return `Based on my gaming knowledge: ${relevantKnowledge.answer}`
    }

    if (conversationMode === "gaming") {
      if (lowerMessage.includes("aim") || lowerMessage.includes("crosshair")) {
        return `For ${selectedGame}, focus on keeping your crosshair at head level and practice pre-aiming common angles. Your current rank of ${gameStats.currentRank} suggests you have good fundamentals, but consistent crosshair placement can help you climb higher.`
      } else if (lowerMessage.includes("rank") || lowerMessage.includes("improve")) {
        return `With your current ${gameStats.winRate}% win rate in ${selectedGame}, you're performing well! Focus on consistency and reviewing your gameplay. Small improvements in positioning and decision-making can help you reach the next rank.`
      } else if (lowerMessage.includes("economy") || lowerMessage.includes("money")) {
        return `Economy management is crucial in ${selectedGame}. Save when your team saves, buy when your team buys. Don't force-buy unless it's a must-win round. Coordinate with your team for maximum impact.`
      } else {
        return `I'd love to help you improve at ${selectedGame}! What specific aspect of your gameplay would you like to work on? I have extensive knowledge about game mechanics, strategies, and tips.`
      }
    } else {
      if (lowerMessage.includes("joke")) {
        const jokes = [
          "Why don't scientists trust atoms? Because they make up everything! 😄",
          "Why did the gamer break up with their keyboard? It wasn't their type! ⌨️😂",
          "What do you call a noob who's good at Tetris? A block star! 🎮✨",
        ]
        return jokes[Math.floor(Math.random() * jokes.length)]
      } else if (lowerMessage.includes("help")) {
        return "I'm here to help! I can assist with gaming advice, answer questions, have conversations, or help with various topics. What would you like to know?"
      } else {
        return "I'm here to chat and help with any questions you might have. Could you tell me more about what you'd like to discuss?"
      }
    }
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: message,
      timestamp: new Date(),
      category: conversationMode,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      let aiResponse: string

      try {
        aiResponse = await callGeminiAI(message)
      } catch (apiError) {
        console.warn("Gemini API failed, using fallback:", apiError)
        aiResponse = getFallbackResponse(message)
      }

      const coachResponse: Message = {
        id: messages.length + 3,
        type: "coach",
        content: aiResponse,
        timestamp: new Date(),
        category: conversationMode,
      }

      setMessages((prev) => [...prev, coachResponse])
    } catch (error) {
      const errorResponse: Message = {
        id: messages.length + 2,
        type: "coach",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date(),
        category: conversationMode,
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const clearConversation = () => {
    setMessages([
      {
        id: 1,
        type: "coach",
        content: `Hello! I'm CoachGPT, powered by Google Gemini AI and trained on extensive gaming knowledge. I can help you with gaming strategies, general conversations, and specific game mechanics. I see you're currently playing ${selectedGame}. How can I assist you today?`,
        timestamp: new Date(),
        category: "general",
      },
    ])
  }

  const currentTips = gameSpecificTips[selectedGame as keyof typeof gameSpecificTips] || gameSpecificTips.valorant

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">CoachGPT - AI Assistant</h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="border-green-400 text-green-300">
            <BrainIcon className="h-3 w-3 mr-1" />
            Google Gemini
          </Badge>
          <Badge
            variant="outline"
            className={knowledgeLoaded ? "border-blue-400 text-blue-300" : "border-gray-400 text-gray-300"}
          >
            <DatabaseIcon className="h-3 w-3 mr-1" />
            {knowledgeLoaded ? `${knowledgeBase.length} Knowledge Entries` : "Loading KB..."}
          </Badge>
          <Badge
            variant="outline"
            className={
              apiStatus === "connected"
                ? "border-green-400 text-green-300 animate-pulse"
                : apiStatus === "error"
                  ? "border-red-400 text-red-300"
                  : "border-yellow-400 text-yellow-300"
            }
          >
            {apiStatus === "connected" ? (
              <>
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                Connected
              </>
            ) : apiStatus === "error" ? (
              <>
                <AlertTriangleIcon className="h-3 w-3 mr-1" />
                Error
              </>
            ) : (
              "Unknown"
            )}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowApiSettings(!showApiSettings)}
            className="text-white/80 hover:bg-white/10"
          >
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* API Settings */}
      {showApiSettings && (
        <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Google AI Configuration</CardTitle>
            <CardDescription className="text-white/60">Configure your Google AI (Gemini) API settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Google AI API Key</label>
              <div className="flex space-x-2">
                <Input
                  type="password"
                  placeholder="AIza..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-black/20 border-white/20 text-white placeholder:text-white/40"
                />
                <Button
                  onClick={testApiConnection}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
                >
                  Test
                </Button>
              </div>
              <p className="text-xs text-white/60">
                Get your API key from{" "}
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Google AI Studio
                </a>
              </p>
            </div>

            {apiStatus === "connected" && (
              <Alert className="border-green-500/30 bg-green-500/10">
                <CheckCircleIcon className="h-4 w-4" />
                <AlertDescription className="text-green-300">
                  Google Gemini API connection successful! Enhanced AI features are now available.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Knowledge Base Status</label>
              <div className="flex items-center space-x-2">
                <DatabaseIcon className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-white/80">
                  {knowledgeLoaded
                    ? `${knowledgeBase.length} gaming knowledge entries loaded`
                    : "Loading knowledge base..."}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs
        value={conversationMode}
        onValueChange={(value) => setConversationMode(value as "gaming" | "general")}
        className="space-y-6"
      >
        <TabsList className="bg-black/20 backdrop-blur-sm">
          <TabsTrigger value="gaming" className="flex items-center space-x-2">
            <GamepadIcon className="h-4 w-4" />
            <span>Gaming Coach</span>
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <MessageCircleIcon className="h-4 w-4" />
            <span>General Chat</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Chat Interface */}
          <Card className="lg:col-span-2 bg-black/20 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <BotIcon className="h-5 w-5 mr-2 text-pink-400" />
                    Chat with CoachGPT
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    {conversationMode === "gaming"
                      ? `Gaming coach for ${selectedGame} - Current rank: ${gameStats.currentRank} | Knowledge Base: ${knowledgeBase.length} entries`
                      : "General AI assistant for any topic"}
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearConversation}
                  className="text-white/80 hover:bg-white/10"
                >
                  <RefreshCwIcon className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-96 w-full rounded-md border border-white/10 p-4 bg-black/10" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-pink-500/20 text-pink-100 border border-pink-500/30"
                            : message.type === "system"
                              ? "bg-yellow-500/20 text-yellow-100 border border-yellow-500/30"
                              : "bg-blue-500/20 text-blue-100 border border-blue-500/30"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          {message.type === "user" ? (
                            <UserIcon className="h-3 w-3" />
                          ) : message.type === "system" ? (
                            <AlertTriangleIcon className="h-3 w-3" />
                          ) : (
                            <BotIcon className="h-3 w-3" />
                          )}
                          <span className="text-xs opacity-60">
                            {message.type === "user" ? "You" : message.type === "system" ? "System" : "CoachGPT"}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {message.category}
                          </Badge>
                        </div>
                        <div className="text-sm whitespace-pre-line">{message.content}</div>
                        <p className="text-xs opacity-60 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-blue-500/20 text-blue-100 border border-blue-500/30 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <BotIcon className="h-3 w-3" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="flex space-x-2">
                <Input
                  placeholder={conversationMode === "gaming" ? "Ask for gaming advice..." : "Ask me anything..."}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage(inputMessage)}
                  className="bg-black/20 border-white/20 text-white placeholder:text-white/40"
                />
                <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30">
                  <MicIcon className="h-4 w-4" />
                </Button>
                <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={isTyping}
                  className="bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30"
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <TabsContent value="gaming" className="space-y-6 mt-0">
              <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <SparklesIcon className="h-5 w-5 mr-2 text-yellow-400" />
                    {selectedGame} Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {currentTips.map((tip, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left hover:bg-white/10 text-white/80 transition-all duration-300 hover:scale-105"
                      onClick={() => handleSendMessage(tip)}
                    >
                      <MessageCircleIcon className="h-4 w-4 mr-2" />
                      {tip}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Current Game Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <TrophyIcon className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-sm text-white">Rank: {gameStats.currentRank}</p>
                      <p className="text-xs text-white/60">Win Rate: {gameStats.winRate}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TargetIcon className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-white">K/D/A: {gameStats.kda}</p>
                      <p className="text-xs text-white/60">{gameStats.gamesPlayed} games played</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BrainIcon className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-sm text-white">Playtime: {gameStats.hoursPlayed}h</p>
                      <p className="text-xs text-white/60">This season</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="general" className="space-y-6 mt-0">
              <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <SparklesIcon className="h-5 w-5 mr-2 text-yellow-400" />
                    Quick Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {generalTopics.map((topic, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left hover:bg-white/10 text-white/80 transition-all duration-300 hover:scale-105"
                      onClick={() => handleSendMessage(topic)}
                    >
                      <MessageCircleIcon className="h-4 w-4 mr-2" />
                      {topic}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">AI Capabilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-white/80">
                    <p>✨ General conversation</p>
                    <p>🎓 Educational help</p>
                    <p>💡 Creative assistance</p>
                    <p>🔧 Problem solving</p>
                    <p>🎯 Life advice</p>
                    <p>🌟 Entertainment</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">AI Features</CardTitle>
                <CardDescription className="text-white/60">
                  {apiStatus === "connected" ? "Powered by Google Gemini + Knowledge Base" : "Knowledge Base Active"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30">
                  <BrainIcon className="h-4 w-4 mr-2" />
                  Advanced Analysis
                </Button>
                <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30">
                  <TargetIcon className="h-4 w-4 mr-2" />
                  Personalized Tips
                </Button>
                <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30">
                  <TrendingUpIcon className="h-4 w-4 mr-2" />
                  Real-time Coaching
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
