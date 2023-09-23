import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { theme } from "./dropdown.theme"

export type DropdownItemProps = PropsWithChildren<ComponentProps<"li">> & {
  onClick?: () => void
  icon?: FC<ComponentProps<"svg">>
  href?: string
}

export const DropdownItem: FC<DropdownItemProps> = ({ children, className, onClick, icon: Icon, href }) => {
  return (
    <li className={classNames(theme.floating.item.base, className)} onClick={onClick}>
      {href ? (
        <a href={href} className={classNames(theme.floating.item.link)}>
          {Icon && <Icon className={theme.floating.item.icon} />}
          {children}
        </a>
      ) : (
        <div className={classNames(theme.floating.item.inner)}>
          {Icon && <Icon className={theme.floating.item.icon} />}
          {children}
        </div>
      )}
    </li>
  )
}
