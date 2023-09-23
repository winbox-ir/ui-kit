"use client"
import classNames from "classnames"
import type { ComponentProps, FC, PropsWithChildren, ReactElement } from "react"
import { Children, cloneElement, useMemo, useState } from "react"
import { HiChevronDown } from "react-icons/hi"
import { theme } from "./accordion.theme"
import { AccordionContent } from "./AccordionContent"
import type { AccordionPanelProps } from "./AccordionPanel"
import { AccordionPanel } from "./AccordionPanel"
import { AccordionTitle } from "./AccordionTitle"

export interface AccordionProps extends PropsWithChildren<ComponentProps<"div">> {
  alwaysOpen?: boolean
  arrowIcon?: FC<ComponentProps<"svg">>
  children: ReactElement<AccordionPanelProps> | ReactElement<AccordionPanelProps>[]
  flush?: boolean
}

const AccordionComponent: FC<AccordionProps> = ({ alwaysOpen = false, arrowIcon = HiChevronDown, children, flush = false, className, ...props }): JSX.Element => {
  const panels = useMemo(
    () =>
      Children.map(children, (child: any, i) =>
        cloneElement(child, {
          alwaysOpen,
          arrowIcon,
          flush,
        })
      ),
    [alwaysOpen, arrowIcon, children, flush]
  )

  return (
    <div className={classNames(theme.base, theme.flush[flush ? "on" : "off"], className)} data-testid="flowbite-accordion" {...props}>
      {panels}
    </div>
  )
}

AccordionComponent.displayName = "Accordion"
AccordionPanel.displayName = "Accordion.Panel"
AccordionTitle.displayName = "Accordion.Title"
AccordionContent.displayName = "Accordion.Content"

export const Accordion = Object.assign(AccordionComponent, {
  Panel: AccordionPanel,
  Title: AccordionTitle,
  Content: AccordionContent,
})
