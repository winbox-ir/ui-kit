"use client"
import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { theme } from "./sidebar.theme"

import { SidebarItemContext } from "./SidebarItemContext"

const SidebarItemGroup: FC<PropsWithChildren<ComponentProps<"ul">>> = ({ children, className, ...props }) => {
  return (
    <ul className={classNames(theme.itemGroup, className)} data-testid="flowbite-sidebar-item-group" {...props}>
      <SidebarItemContext.Provider value={{ isInsideCollapse: false }}>{children}</SidebarItemContext.Provider>
    </ul>
  )
}

SidebarItemGroup.displayName = "Sidebar.ItemGroup"
export default SidebarItemGroup
