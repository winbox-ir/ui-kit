"use client"
import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { HiOutlineX } from "react-icons/hi"
import { theme } from "./modal.theme"
import { useModalContext } from "./ModalContext"

export type ModalHeaderProps = PropsWithChildren<ComponentProps<"div">>

export const ModalHeader: FC<ModalHeaderProps> = ({ children, className, ...props }): JSX.Element => {
  const { popup, onClose } = useModalContext()

  return (
    <div
      className={classNames(
        theme.header.base,
        {
          [theme.header.popup]: popup,
        },
        className
      )}
      {...props}
    >
      <h3 className={theme.header.title}>{children}</h3>
      <button aria-label="Close" className={theme.header.close.base} type="button" onClick={onClose}>
        <HiOutlineX aria-hidden className={theme.header.close.icon} />
      </button>
    </div>
  )
}
