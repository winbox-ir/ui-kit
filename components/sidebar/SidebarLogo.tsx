import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { useId } from "react"
import { theme } from "./sidebar.theme"
import { useSidebarContext } from "./SidebarContext"

export interface SidebarLogoProps extends PropsWithChildren<ComponentProps<"a">> {
  className?: string
  href: string
  img: string
  imgAlt?: string
}

const SidebarLogo: FC<SidebarLogoProps> = ({ children, href, img, imgAlt = "", className, ...props }) => {
  const id = useId()
  const { isCollapsed } = useSidebarContext()

  return (
    <a aria-labelledby={`flowbite-sidebar-logo-${id}`} className={classNames(theme.logo.base, className)} href={href} {...props}>
      <img alt={imgAlt} className={theme.logo.img} src={img} />
      <span className={theme.logo.collapsed[isCollapsed ? "on" : "off"]} id={`flowbite-sidebar-logo-${id}`}>
        {children}
      </span>
    </a>
  )
}

SidebarLogo.displayName = "Sidebar.Logo"
export default SidebarLogo
