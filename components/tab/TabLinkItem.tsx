import type { ComponentProps, FC, PropsWithChildren, ReactNode } from "react"

export interface TabItemProps extends PropsWithChildren<Omit<ComponentProps<"a">, "title">> {
  title: ReactNode
  href: string
  active?: boolean
  disabled?: boolean
  icon?: FC<ComponentProps<"svg">>
}

export const TabLinkItem: FC<TabItemProps> = ({ children, className, href }) => (
  <a href={href} className={className}>
    {children}
  </a>
)
