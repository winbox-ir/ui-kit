export interface FloatingButtonTheme {
  base: string
  button: string
  content: string
  item: {
    base: string
    icon: string
  }
}

export const theme: FloatingButtonTheme = {
  base: "relative",
  button: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full",
  content: "absolute left-0 py-2 bg-white dark:bg-gray-800 dark:text-gray-50 rounded-lg shadow-xl w-48 z-50",
  item: {
    base: "px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm cursor-pointer",
    icon: "me-2 h-4 w-4",
  },
}
