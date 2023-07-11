import type { LabelColors } from './Label'

type labelTheme = {
  base: string
  colors: LabelColors
  disabled: string
}

export const theme: labelTheme = {
  base: 'text-sm font-medium',
  colors: {
    default: 'text-gray-900 dark:text-gray-300',
    info: 'text-blue-500 dark:text-blue-600',
    failure: 'text-red-700 dark:text-red-500',
    warning: 'text-yellow-500 dark:text-yellow-600',
    success: 'text-green-700 dark:text-green-500',
    blue: '',
    cyan: '',
    dark: '',
    gray: '',
    green: '',
    indigo: '',
    light: '',
    lime: '',
    pink: '',
    purple: '',
    red: '',
    teal: '',
    yellow: '',
  },
  disabled: 'opacity-50',
}
