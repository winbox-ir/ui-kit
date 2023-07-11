import { FloatingDropdownTheme } from "./Dropdown"

type DropdownTheme = {
  floating: FloatingDropdownTheme
  content: string
  inlineWrapper: string
  arrowIcon: string
}

export const theme: DropdownTheme = {
  floating: {
    target: "w-fit",
    base: "z-10 w-fit rounded divide-y divide-gray-100 shadow",
    animation: "transition-opacity",
    hidden: "invisible opacity-0",
    style: {
      dark: "bg-gray-900 text-white dark:bg-gray-700",
      light: "border border-gray-200 bg-white text-gray-900",
      auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
    },
    header: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
    content: "py-1 text-sm text-gray-700 dark:text-gray-200",
    arrow: {
      base: "absolute z-10 h-2 w-2 rotate-45",
      style: {
        dark: "bg-gray-900 dark:bg-gray-700",
        light: "bg-white",
        auto: "bg-white dark:bg-gray-700",
      },
      placement: "-4px",
    },
    item: {
      base: "flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white hover:text-blue-700 dark:hover:text-blue-400",
      inner: "flex-1 flex items-center py-2 px-4 justify-start text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white hover:text-blue-700 dark:hover:text-blue-400",
      link: "flex-1 flex items-center py-2 px-4 justify-start text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white hover:text-blue-700 dark:hover:text-blue-400",
      icon: "me-2 h-4 w-4",
    },
    divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
  },
  arrowIcon: "ml-2 h-4 w-4",
  inlineWrapper: "flex items-center",
  content: "py-1",
}
