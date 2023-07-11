export * from "./button/Button"
export * from "./spinner/Spinner"
export * from "./navbar/Navbar"
export * from "./dropdown/Dropdown"
export * from "./accourdion/Accordion"
export * from "./helper-text/HelperText"
export * from "./file-input/FileInput"
export * from "./radio/Radio"
export * from "./select/Select"
export * from "./text-input/TextInput"
export * from "./toggleSwitch/ToggleSwitch"
export * from "./textarea/Textarea"
export * from "./label/Label"
export * from "./floating/Floating"
export * from "./checkbox/Checkbox"
export * from "./avatar/Avatar"
export * from "./modal"
export * from "./sidebar"
export * from "./table/Table"
export * from "./title/Title"
export * from "./input-box/InputBox"
export * from "./tab/Tabs"
export * from "./tooltip/Tooltip"
export * from "./floating-button/FloatingButton"
export * from "./image-uploader"
export * from "./circle-progress-bar/CircleProgressBar"

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
