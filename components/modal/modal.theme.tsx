import { FlowbiteModalTheme } from "./Modal"

export const theme: FlowbiteModalTheme = {
  base: "fixed top-0 right-0 left-0 z-50 h-modal overflow-y-auto overflow-x-hidden md:inset-0 md:h-full duration-300",
  show: {
    on: "flex bg-gray-700 bg-opacity-10 dark:bg-opacity-30", // 'flex bg-gray-900 bg-opacity-10 dark:bg-opacity-80',
    off: "hidden",
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner: "relative rounded-lg bg-white shadow-2xl dark:bg-gray-700",
    loadingOverlay: "absolute left-0 right-0 top-0 bottom-0 z-20 flex justify-center items-center rounded-b-lg filter backdrop-blur-[2px] print:hidden dark:text-white m-4 rounded-lg",
  },
  body: {
    // base: "p-4 md:max-h-[500px]",
    base: "p-4",
    popup: "pt-0",
  },
  header: {
    base: "flex items-center justify-between rounded-t dark:border-gray-600 border-b px-4 py-2",
    popup: "!p-2 !border-b-0",
    title: "text-lg font-medium text-gray-900 dark:text-white",
    close: {
      base: "ms-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      icon: "h-5 w-5",
    },
  },
  footer: {
    base: "flex items-center space-e-2 rounded-b border-gray-200 p-4 dark:border-gray-600",
    popup: "border-t",
  },
  sizes: {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  },
  positions: {
    "top-left": "items-start justify-start",
    "top-center": "items-start justify-center",
    "top-right": "items-start justify-end",
    "center-left": "items-center justify-start",
    center: "items-center justify-center",
    "center-right": "items-center justify-end",
    "bottom-right": "items-end justify-end",
    "bottom-center": "items-end justify-center",
    "bottom-left": "items-end justify-start",
  },
}
