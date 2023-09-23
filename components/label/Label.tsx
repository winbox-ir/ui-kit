"use client"
import classNames from "classnames"
import { ComponentProps, FC, PropsWithChildren } from "react"
import { UIColors } from "../../types"
import { theme } from "./label.theme"

export interface LabelColors extends UIColors {
  [key: string]: string
  default: string
}

export interface LabelProps extends PropsWithChildren<Omit<ComponentProps<"label">, "color">> {
  color?: keyof LabelColors
  value?: string
  disabled?: boolean
}

export const Label: FC<LabelProps> = ({ children, color = "default", disabled = false, value, className, ...props }): JSX.Element => {
  return (
    <label className={classNames(theme.base, theme.colors[color], disabled ?? theme.disabled, className)} {...props}>
      {value ?? children ?? ""}
    </label>
  )
}
