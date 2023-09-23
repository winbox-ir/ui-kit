"use client"
import type { FC } from 'react'
import { theme } from './dropdown.theme'

export const DropdownDivider: FC = () => {
  return <div className={theme.floating.divider} />
}
