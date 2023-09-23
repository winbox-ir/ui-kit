import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { UIColors } from "../../types"
import { theme } from "./sidebar.theme"
import { useSidebarContext } from "./SidebarContext"

export interface SidebarCTAProps extends PropsWithChildren<Omit<ComponentProps<"div">, "color">> {
  color?: keyof SidebarCTAColors
}

export interface SidebarCTAColors extends Pick<UIColors, "blue" | "dark" | "failure" | "gray" | "green" | "light" | "purple" | "red" | "success" | "warning" | "yellow"> {
  [key: string]: string
}

const SidebarCTA: FC<SidebarCTAProps> = ({ children, color = "info", className, ...props }): JSX.Element => {
  const { isCollapsed } = useSidebarContext()

  return (
    <div className={classNames(theme.cta.base, theme.cta.color[color], className)} data-testid="sidebar-cta" hidden={isCollapsed} {...props}>
      {children}
    </div>
  )
}

SidebarCTA.displayName = "Sidebar.CTA"
export default SidebarCTA
