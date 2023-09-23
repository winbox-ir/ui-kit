import classNames from "classnames"
import HelperText from "../helper-text/HelperText"
import type { ComponentProps, FC, ReactNode } from "react"
import { forwardRef } from "react"
import { Size, UIColors } from "../../types"
import { theme } from "./select.theme"

export interface SelectColors extends Pick<UIColors, "gray" | "info" | "failure" | "warning" | "success"> {
  [key: string]: string
}

export interface SelectSizes extends Pick<Size, "sm" | "md" | "lg"> {
  [key: string]: string
}

export interface SelectProps extends Omit<ComponentProps<"select">, "color" | "ref"> {
  sizing?: keyof SelectSizes
  shadow?: boolean
  helperText?: ReactNode
  addon?: ReactNode
  icon?: FC<ComponentProps<"svg">>
  color?: keyof SelectColors
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ children, sizing = "md", shadow, helperText, addon, icon: Icon, color = "gray", className, ...props }, ref) => {
  return (
    <div className={classNames(theme.base, className)}>
      {addon && <span className={theme.addon}>{addon}</span>}
      <div className={theme.field.base}>
        {Icon && (
          <div className={theme.field.icon.base}>
            <Icon className={theme.field.icon.svg} />
          </div>
        )}
        <select
          className={classNames(
            theme.field.select.base,
            theme.field.select.colors[color],
            theme.field.select.withIcon[Icon ? "on" : "off"],
            theme.field.select.withAddon[addon ? "on" : "off"],
            theme.field.select.withShadow[shadow ? "on" : "off"],
            theme.field.select.sizes[sizing]
          )}
          {...props}
          ref={ref}
        >
          {children}
        </select>
        {helperText && <HelperText color={color}>{helperText}</HelperText>}
      </div>
    </div>
  )
})

Select.displayName = "Select"
