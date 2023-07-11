import { CustomBoolean } from "../../types"

type AccordionTheme = {
  base: string
  content: {
    base: string
  }
  flush: CustomBoolean
  title: {
    arrow: {
      base: string
      open: {
        off: string
        on: string
      }
    }
    base: string
    flush: CustomBoolean
    heading: string
    open: CustomBoolean
    action: string
  }
}

export const theme: AccordionTheme = {
  base: "divide-y divide-gray-200 border-0 border-gray-200 dark:divide-gray-700 dark:border-gray-700",
  content: {
    base: "p-0 last:rounded-b-lg dark:bg-gray-900 first:rounded-t-lg mb-5",
  },
  flush: {
    off: "rounded-lg border-0",
    on: "border-b",
  },
  title: {
    arrow: {
      base: "h-6 w-6 shrink-0",
      open: {
        off: "",
        on: "rotate-180",
      },
    },
    base: "flex w-full rounded-t-lg select-none bg-gray-200 dark:bg-gray-700 mt-3 items-center justify-between first:rounded-t-lg last:rounded-b-lg py-2 px-4 text-left font-medium text-gray-500 dark:text-gray-400  cursor-pointer",
    flush: {
      off: "hover:shadow dark:hover:shadow",
      on: "!bg-transparent dark:!bg-transparent",
    },
    heading: "",
    open: {
      off: "",
      on: "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white",
    },
    action: "inline-flex items-center",
  },
}
