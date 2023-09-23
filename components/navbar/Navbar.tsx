import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { useState } from "react"
import { theme } from "./navbar.theme"
import { NavbarBrand } from "./NavbarBrand"
import { NavbarCollapse } from "./NavbarCollapse"
import { NavbarContext } from "./NavbarContext"
import { NavbarLink } from "./NavbarLink"
import { NavbarToggle } from "./NavbarToggle"

export interface NavbarComponentProps extends PropsWithChildren<ComponentProps<"div">> {
  menuOpen?: boolean
  fluid?: boolean
  rounded?: boolean
  border?: boolean
}

const NavbarComponent: FC<NavbarComponentProps> = ({ children, menuOpen, fluid = false, rounded, border, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(menuOpen)

  return (
    <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={classNames(theme.base, border ? theme.bordered.on : theme.bordered.off, rounded ? theme.rounded.on : theme.rounded.off, className)} {...props}>
        <div className={classNames(theme.inner.base, fluid ? theme.inner.fluid.on : theme.inner.fluid.off)}>{children}</div>
      </div>
    </NavbarContext.Provider>
  )
}

NavbarComponent.displayName = "Navbar"
NavbarBrand.displayName = "Navbar.Brand"
NavbarCollapse.displayName = "Navbar.Collapse"
NavbarLink.displayName = "Navbar.Link"
NavbarToggle.displayName = "Navbar.Toggle"

export const Navbar = Object.assign(NavbarComponent, {
  Brand: NavbarBrand,
  Collapse: NavbarCollapse,
  Link: NavbarLink,
  Toggle: NavbarToggle,
})
