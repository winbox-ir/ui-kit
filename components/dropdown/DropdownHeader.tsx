import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { theme } from "./dropdown.theme"
import { DropdownDivider } from "./DropdownDivider"

export const DropdownHeader: FC<PropsWithChildren<ComponentProps<"div">>> = ({ children, className, ...props }): JSX.Element => {
  return (
    <>
      <div className={classNames(theme.floating.header, className)} {...props}>
        {children}
      </div>
      <DropdownDivider />
    </>
  )
}
