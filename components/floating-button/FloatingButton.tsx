import classNames from "classnames"
import React, { useState, useRef, useEffect, PropsWithChildren, useMemo } from "react"
import { IoAddOutline } from "react-icons/io5"
import { theme } from "./floating-button.theme"
import { FloatingButtonItem } from "./FloatingButtonItem"

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  position?: "bottom" | "top"
  icon?: React.ReactNode
  buttonClassName?: string
}

const FloatingButtonComponent: React.FC<PropsWithChildren<Props>> = (props) => {
  const { className, children, position, icon, buttonClassName, ...params } = props
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  // Extends DropdownItem's onClick to trigger a close request to the Floating component
  const attachCloseListener: any = (node: React.ReactNode) => {
    if (!React.isValidElement(node)) return node
    if ((node as React.ReactElement).type === FloatingButtonItem)
      return React.cloneElement(node, {
        onClick: () => {
          node.props.onClick?.()
          setIsOpen(false)
          // dismissOnClick && setCloseRequestKey(uuid())
        },
      } as any)
    if (node.props.children && typeof node.props.children === "object") {
      return React.cloneElement(node, {
        // @ts-expect-error unknown error
        children: Children.map(node.props.children, attachCloseListener),
      })
    }
    return node
  }

  const content = useMemo(
    () => (
      <ul ref={dropdownRef} className={classNames(theme.content, position == "bottom" ? "top-full mt-2" : "bottom-full mb-2")} onClick={(ev) => ev.stopPropagation()}>
        {React.Children.map(children, attachCloseListener)}
      </ul>
    ),
    [children]
  )

  return (
    <div className={classNames(theme.base, className)} {...params}>
      <button
        className={classNames(theme.button, buttonClassName)}
        onClick={(ev) => {
          ev.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        {icon}
        {!icon && <IoAddOutline size={28} />}
      </button>
      {isOpen && <>{content}</>}
    </div>
  )
}

// export default FloatingButton
FloatingButtonComponent.displayName = "Dropdown"
FloatingButtonComponent.displayName = "Dropdown.Item"
// DropdownHeader.displayName = 'Dropdown.Header'
// DropdownDivider.displayName = 'Dropdown.Divider'

export const FloatingButton = Object.assign(FloatingButtonComponent, {
  Item: FloatingButtonItem,
})
