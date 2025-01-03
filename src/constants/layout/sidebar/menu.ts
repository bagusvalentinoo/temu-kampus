import type { MenuGroup } from '@/types/layout/sidebar/menu.type'
import { Box, CalendarArrowUp, CalendarDays, LayoutGrid, MapPin } from 'lucide-react'

export const menuGroups: MenuGroup[] = [
  {
    groupLabel: '',
    menus: [
      {
        href: '/dashboard',
        label: 'Dashboard',
        icon: LayoutGrid,
        submenus: []
      }
    ]
  },
  {
    groupLabel: 'Aktivitas',
    menus: [
      {
        href: '/events',
        label: 'Acara',
        icon: CalendarArrowUp,
        submenus: []
      },
      {
        href: '/calendar',
        label: 'Kalendar',
        icon: CalendarDays,
        submenus: []
      }
    ]
  }
]

export const menuGroupsAdmin: MenuGroup[] = [
  ...menuGroups,
  {
    groupLabel: 'Management',
    menus: [
      {
        href: '/locations',
        label: 'Lokasi',
        icon: MapPin,
        submenus: []
      },
      {
        href: '/resources',
        label: 'Peralatan',
        icon: Box,
        submenus: []
      }
    ]
  }
]