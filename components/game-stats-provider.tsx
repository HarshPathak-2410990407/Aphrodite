"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface GameStats {
  currentRank: string
  winRate: number
  avgPing: number
  squadMembers: number
  onlineMembers: number
  weeklyLP: number
  gamesPlayed: number
  hoursPlayed: number
  kda: number
  recentMatches: Array<{
    result: "win" | "loss"
    score: string
    map: string
    date: Date
  }>
  achievements: number
  totalAchievements: number
}

interface GameStatsContextType {
  selectedGame: string
  setSelectedGame: (gameId: string) => void
  gameStats: GameStats
}

const GameStatsContext = createContext<GameStatsContextType | undefined>(undefined)

const gameStatsData: Record<string, GameStats> = {
  valorant: {
    currentRank: "Diamond III",
    winRate: 73,
    avgPing: 23,
    squadMembers: 12,
    onlineMembers: 3,
    weeklyLP: 127,
    gamesPlayed: 45,
    hoursPlayed: 247,
    kda: 1.42,
    recentMatches: [
      { result: "win", score: "13-8", map: "Ascent", date: new Date(Date.now() - 3600000) },
      { result: "win", score: "13-11", map: "Bind", date: new Date(Date.now() - 7200000) },
      { result: "loss", score: "11-13", map: "Haven", date: new Date(Date.now() - 10800000) },
    ],
    achievements: 45,
    totalAchievements: 60,
  },
  cs2: {
    currentRank: "Global Elite",
    winRate: 68,
    avgPing: 31,
    squadMembers: 8,
    onlineMembers: 2,
    weeklyLP: 89,
    gamesPlayed: 38,
    hoursPlayed: 189,
    kda: 1.38,
    recentMatches: [
      { result: "win", score: "16-12", map: "Dust2", date: new Date(Date.now() - 3600000) },
      { result: "loss", score: "14-16", map: "Mirage", date: new Date(Date.now() - 7200000) },
      { result: "win", score: "16-9", map: "Inferno", date: new Date(Date.now() - 10800000) },
    ],
    achievements: 32,
    totalAchievements: 50,
  },
  overwatch: {
    currentRank: "Master",
    winRate: 71,
    avgPing: 28,
    squadMembers: 6,
    onlineMembers: 1,
    weeklyLP: 156,
    gamesPlayed: 29,
    hoursPlayed: 156,
    kda: 2.1,
    recentMatches: [
      { result: "win", score: "3-1", map: "King's Row", date: new Date(Date.now() - 3600000) },
      { result: "win", score: "3-2", map: "Hanamura", date: new Date(Date.now() - 7200000) },
      { result: "loss", score: "1-3", map: "Gibraltar", date: new Date(Date.now() - 10800000) },
    ],
    achievements: 28,
    totalAchievements: 45,
  },
  apex: {
    currentRank: "Platinum II",
    winRate: 65,
    avgPing: 35,
    squadMembers: 9,
    onlineMembers: 4,
    weeklyLP: 78,
    gamesPlayed: 52,
    hoursPlayed: 98,
    kda: 1.85,
    recentMatches: [
      { result: "win", score: "Squad #1", map: "World's Edge", date: new Date(Date.now() - 3600000) },
      { result: "loss", score: "Squad #7", map: "Kings Canyon", date: new Date(Date.now() - 7200000) },
      { result: "win", score: "Squad #2", map: "Olympus", date: new Date(Date.now() - 10800000) },
    ],
    achievements: 15,
    totalAchievements: 40,
  },
  lol: {
    currentRank: "Gold I",
    winRate: 58,
    avgPing: 42,
    squadMembers: 15,
    onlineMembers: 5,
    weeklyLP: 67,
    gamesPlayed: 67,
    hoursPlayed: 312,
    kda: 1.95,
    recentMatches: [
      { result: "win", score: "Victory", map: "Summoner's Rift", date: new Date(Date.now() - 3600000) },
      { result: "loss", score: "Defeat", map: "Summoner's Rift", date: new Date(Date.now() - 7200000) },
      { result: "win", score: "Victory", map: "ARAM", date: new Date(Date.now() - 10800000) },
    ],
    achievements: 67,
    totalAchievements: 80,
  },
  rocket: {
    currentRank: "Champion I",
    winRate: 62,
    avgPing: 19,
    squadMembers: 4,
    onlineMembers: 2,
    weeklyLP: 134,
    gamesPlayed: 31,
    hoursPlayed: 78,
    kda: 1.67,
    recentMatches: [
      { result: "win", score: "4-2", map: "DFH Stadium", date: new Date(Date.now() - 3600000) },
      { result: "win", score: "3-1", map: "Mannfield", date: new Date(Date.now() - 7200000) },
      { result: "loss", score: "1-3", map: "Urban Central", date: new Date(Date.now() - 10800000) },
    ],
    achievements: 22,
    totalAchievements: 35,
  },
  fortnite: {
    currentRank: "Champion",
    winRate: 45,
    avgPing: 38,
    squadMembers: 7,
    onlineMembers: 1,
    weeklyLP: 45,
    gamesPlayed: 89,
    hoursPlayed: 134,
    kda: 2.34,
    recentMatches: [
      { result: "win", score: "Victory Royale", map: "Battle Royale", date: new Date(Date.now() - 3600000) },
      { result: "loss", score: "#15", map: "Battle Royale", date: new Date(Date.now() - 7200000) },
      { result: "loss", score: "#8", map: "Zero Build", date: new Date(Date.now() - 10800000) },
    ],
    achievements: 34,
    totalAchievements: 55,
  },
  dota2: {
    currentRank: "Ancient III",
    winRate: 55,
    avgPing: 45,
    squadMembers: 11,
    onlineMembers: 3,
    weeklyLP: 89,
    gamesPlayed: 43,
    hoursPlayed: 267,
    kda: 1.78,
    recentMatches: [
      { result: "win", score: "Victory", map: "Radiant", date: new Date(Date.now() - 3600000) },
      { result: "loss", score: "Defeat", map: "Dire", date: new Date(Date.now() - 7200000) },
      { result: "win", score: "Victory", map: "Radiant", date: new Date(Date.now() - 10800000) },
    ],
    achievements: 56,
    totalAchievements: 78,
  },
}

export function GameStatsProvider({ children }: { children: ReactNode }) {
  const [selectedGame, setSelectedGame] = useState("valorant")

  const gameStats = gameStatsData[selectedGame] || gameStatsData.valorant

  return (
    <GameStatsContext.Provider value={{ selectedGame, setSelectedGame, gameStats }}>
      {children}
    </GameStatsContext.Provider>
  )
}

export function useGameStats() {
  const context = useContext(GameStatsContext)
  if (context === undefined) {
    throw new Error("useGameStats must be used within a GameStatsProvider")
  }
  return context
}
