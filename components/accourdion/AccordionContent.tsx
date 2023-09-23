"use client"
import classNames from "classnames"
import type { ComponentProps, FC } from "react"
import { theme } from "./accordion.theme"
import { useAccordionContext } from "./AccordionPanelContext"

export const AccordionContent: FC<ComponentProps<"div">> = ({ children, className, ...props }): JSX.Element => {
  const { isOpen } = useAccordionContext()

  if (!isOpen) return <></>

  return (
    <div className={classNames(theme.content.base, className)} data-testid="flowbite-accordion-content" hidden={!isOpen} {...props}>
      {children}
    </div>
  )
}
