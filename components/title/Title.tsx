import classNames from 'classnames'
import { ComponentProps, FC, PropsWithChildren } from 'react'
import { UIColors } from '../../types'
import { theme } from './title.theme'

export interface TitleColors extends UIColors {
  [key: string]: string
  default: string
}

export interface TitleProps
  extends PropsWithChildren<Omit<ComponentProps<'label'>, 'color'>> {
  color?: keyof TitleColors
  value?: string
  disabled?: boolean
}

export const Title: FC<TitleProps> = ({
  children,
  color = 'default',
  disabled = false,
  value,
  className,
  ...props
}): JSX.Element => {
  return (
    <label
      className={classNames(
        theme.base,
        theme.colors[color],
        disabled ?? theme.disabled,
        className
      )}
      {...props}
    >
      {value ?? children ?? ''}
    </label>
  )
}
