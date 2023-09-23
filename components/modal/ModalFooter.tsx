"use client"
import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { theme } from "./modal.theme"
import { useModalContext } from "./ModalContext"

export type ModalFooterProps = PropsWithChildren<ComponentProps<"div">>

export const ModalFooter: FC<ModalFooterProps> = ({ children, className, ...props }) => {
  const { popup } = useModalContext()

  return (
    <div
      className={classNames(
        theme.footer.base,
        {
          [theme.footer.popup]: !popup,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
