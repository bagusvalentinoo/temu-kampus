'use client'

import Link from 'next/link'
import { LogOut, User } from 'lucide-react'
import type { User as UserModel } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { logout } from '@/actions/auth.action'
import { useTransition } from 'react'

type UserNavProps = {
  user: UserModel
}

export const UserNav = ({
  user
}: UserNavProps) => {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logout()
    })
  }

  const getInitials = (name: string): string => {
    const words = name.trim().split(' ')

    if (words.length === 1)
      return words[0].charAt(0).toUpperCase()

    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()
  }

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback
                    className="bg-transparent">{getInitials(user.name as string)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profil</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.role === 'admin' ? 'Admin' :
                user.role === 'lecturer' ? 'Dosen' :
                  user.role === 'student' ? 'Siswa' :
                    user.role}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/profile" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Profil
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={isPending} className="hover:cursor-pointer" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
