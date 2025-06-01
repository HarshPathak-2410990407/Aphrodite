"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SettingsIcon, LogOutIcon, UserIcon } from "lucide-react"

interface UserProfileProps {
  user?: {
    displayName: string
    photoURL?: string
  } | null
}

export default function UserProfile({ user }: UserProfileProps) {
  // Default user for demo
  const defaultUser = {
    displayName: "ProGamer2024",
    photoURL: "/placeholder.svg?height=40&width=40",
  }

  const currentUser = user || defaultUser

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-3 hover:bg-white/10">
          <div className="text-right">
            <div className="text-sm font-medium text-white">{currentUser.displayName}</div>
            <div className="text-xs text-white/60">Level 47</div>
          </div>
          <Avatar className="h-10 w-10 border-2 border-pink-400">
            <AvatarImage src={currentUser.photoURL || "/placeholder.svg"} alt={currentUser.displayName} />
            <AvatarFallback className="bg-pink-500/20 text-pink-300">
              {currentUser.displayName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Badge variant="outline" className="border-purple-400 text-purple-300">
            Diamond III
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black/90 border-white/10 backdrop-blur-sm">
        <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem className="text-white/80 hover:bg-white/10">
          <UserIcon className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white/80 hover:bg-white/10">
          <SettingsIcon className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
          <LogOutIcon className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
