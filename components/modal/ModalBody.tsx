"use client"
import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { theme } from "./modal.theme"
import { useModalContext } from "./ModalContext"

export type ModalBodyProps = PropsWithChildren<ComponentProps<"div">>

export const ModalBody: FC<ModalBodyProps> = ({ children, className, ...props }) => {
  const { popup } = useModalContext()

  return (
    <div
      className={classNames(
        theme.body.base,
        {
          [theme.body.popup]: popup,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
