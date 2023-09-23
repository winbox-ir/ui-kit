import type { Placement } from "@floating-ui/core"
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from "react"
import { Floating, FlowbiteFloatingTheme } from "../floating/Floating"
import { theme } from "./tooltip.theme"

export interface FlowbiteTooltipTheme extends FlowbiteFloatingTheme {}

export interface TooltipProps extends PropsWithChildren<Omit<ComponentProps<"div">, "style">> {
  content: ReactNode
  placement?: "auto" | Placement
  trigger?: "hover" | "click"
  style?: "dark" | "light" | "auto"
  animation?: false | `duration-${number}`
  arrow?: boolean
  arrowClassName?: string
}

/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
export const Tooltip: FC<TooltipProps> = ({
  animation = "duration-300",
  arrow = true,
  children,
  content,
  placement = "top",
  style = "dark",
  trigger = "hover",
  className,
  arrowClassName,
  ...props
}) => {
  return (
    <Floating
      content={content}
      style={style}
      animation={animation}
      placement={placement}
      arrow={arrow}
      trigger={trigger}
      theme={theme}
      className={className}
      arrowClassName={arrowClassName}
      {...props}
    >
      {children}
    </Floating>
  )
}
