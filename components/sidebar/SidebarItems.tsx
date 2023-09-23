import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { theme } from "./sidebar.theme"

const SidebarItems: FC<PropsWithChildren<ComponentProps<"div">>> = ({ children, className, ...props }): JSX.Element => {
  return (
    <div className={classNames(theme.items, className)} data-testid="flowbite-sidebar-items" {...props}>
      {children}
    </div>
  )
}

SidebarItems.displayName = "Sidebar.Items"
export default SidebarItems
