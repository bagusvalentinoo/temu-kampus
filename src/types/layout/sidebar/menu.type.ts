import type { LucideIcon } from 'lucide-react'

export type SubMenuItem = {
  href: string
  label: string
  active?: boolean
}

export type MenuItem = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: SubMenuItem[]
}

export type MenuGroup = {
  groupLabel: string
  menus: MenuItem[]
}