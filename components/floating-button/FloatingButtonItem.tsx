"use client"
import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { theme } from "./floating-button.theme"

export type FloatingButtonItemProps = PropsWithChildren<ComponentProps<"li">> & {
  onClick?: () => void
  icon?: FC<ComponentProps<"svg">>
}

export const FloatingButtonItem: FC<FloatingButtonItemProps> = ({ children, className, onClick, icon: Icon }) => {
  return (
    <li className={classNames(theme.item.base, className)} onClick={onClick}>
      {Icon && <Icon className={theme.item.icon} />}
      {children}
    </li>
  )
}
