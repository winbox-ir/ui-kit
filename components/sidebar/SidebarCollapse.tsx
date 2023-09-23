import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { useId, useState } from "react"
import { HiChevronDown } from "react-icons/hi"
import { Tooltip } from "../tooltip"
import { useSidebarContext } from "./SidebarContext"
import type { SidebarItemProps } from "./SidebarItem"
import { SidebarItemContext } from "./SidebarItemContext"
import { theme } from "./sidebar.theme"

export interface SidebarCollapseProps extends PropsWithChildren<ComponentProps<"button"> & SidebarItemProps> {
  open?: boolean
  href?: string
  router: any
}

const SidebarCollapse: FC<SidebarCollapseProps> = ({ children, icon: Icon, href, label, className, open = false, router, ...props }): JSX.Element => {
  const id = useId()
  const { isCollapsed } = useSidebarContext()
  const [isOpen, setOpen] = useState(href ? router.asPath.startsWith(href) : open)

  // useEffect(() => setOpen(open), [open])

  // useEffect(() => {
  //   if (href) {
  //     if (router.asPath.startsWith(href)) setOpen(true)
  //   }
  // }, [href])

  const Wrapper: FC<PropsWithChildren<unknown>> = ({ children }): JSX.Element => (
    <li>
      {isCollapsed && !isOpen ? (
        <Tooltip content={label} placement="right">
          {children}
        </Tooltip>
      ) : (
        children
      )}
    </li>
  )

  return (
    <Wrapper>
      <button
        className={classNames(theme.collapse.button, className)}
        id={`flowbite-sidebar-collapse-${id}`}
        onClick={() => setOpen(!isOpen)}
        title={label}
        type="button"
        {...props}
      >
        {Icon && (
          <Icon aria-hidden className={classNames(theme.collapse.icon.base, theme.collapse.icon.open[isOpen ? "on" : "off"])} data-testid="flowbite-sidebar-collapse-icon" />
        )}
        {isCollapsed ? (
          <span className="sr-only">{label}</span>
        ) : (
          <>
            <span className={theme.collapse.label.base} data-testid="flowbite-sidebar-collapse-label">
              {label}
            </span>
            <HiChevronDown aria-hidden className={theme.collapse.label.icon} />
          </>
        )}
      </button>
      <ul aria-labelledby={`flowbite-sidebar-collapse-${id}`} className={theme.collapse.list} hidden={!isOpen}>
        <SidebarItemContext.Provider value={{ isInsideCollapse: true }}>{children}</SidebarItemContext.Provider>
      </ul>
    </Wrapper>
  )
}

SidebarCollapse.displayName = "Sidebar.Collapse"
export default SidebarCollapse
