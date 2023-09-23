"use client"
import classNames from "classnames"
import { motion } from "framer-motion"
import type { ComponentProps, FC, PropsWithChildren } from "react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CustomBoolean, Positions, Size } from "../../types"
import { ModalBody } from "./ModalBody"
import { ModalContext } from "./ModalContext"
import { ModalFooter } from "./ModalFooter"
import { ModalHeader } from "./ModalHeader"
import { SvgLoading } from "./SvgLoading"
import { theme } from "./modal.theme"

export interface FlowbiteModalTheme {
  base: string
  show: CustomBoolean
  content: {
    base: string
    inner: string
    loadingOverlay: string
  }
  body: {
    base: string
    popup: string
  }
  header: {
    base: string
    popup: string
    title: string
    close: {
      base: string
      icon: string
    }
  }
  footer: {
    base: string
    popup: string
  }
  sizes: ModalSizes
  positions: ModalPositions
}

export interface ModalPositions extends Positions {
  [key: string]: string
}

export interface ModalSizes extends Omit<Size, "xs"> {
  [key: string]: string
}

export interface ModalProps extends PropsWithChildren<ComponentProps<"div">> {
  onClose?: () => void
  autoClose?: boolean
  position?: keyof ModalPositions
  popup?: boolean
  root?: HTMLElement
  show?: boolean
  size?: keyof ModalSizes
  innerClassName?: string
  dismissible?: boolean
  isLoading?: boolean
}

const backdropAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
  },
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
}

const ModalComponent: FC<ModalProps> = ({
  children,
  show = true,
  root,
  popup,
  size = "2xl",
  position = "center",
  onClose,
  autoClose = false,
  className,
  innerClassName,
  dismissible = true,
  isLoading = false,
  ...props
}) => {
  const [mounted, setMounted] = useState(false)
  const [parent, setParent] = useState<HTMLElement | undefined>(root)
  const [container, setContainer] = useState<HTMLDivElement | undefined>()

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0]
    if (show && body) {
      body.style.overflow = "hidden"

      return () => {
        body.style.overflow = "unset"
      }
    }
  }, [show])

  // useEffect(() => {
  //   if (!parent) setParent(document.body)
  //   if (!container) setContainer(document.createElement("div"))
  // }, [])

  // useEffect(() => {
  //   if (!container || !parent || !show) {
  //     return
  //   }

  //   parent.appendChild(container)

  //   return () => {
  //     if (container) {
  //       parent.removeChild(container)
  //     }
  //   }
  // }, [container, parent, show])

  // return container
  //   ? createPortal(
  //       <ModalContext.Provider value={{ popup, onClose }}>
  //         <div
  //           aria-hidden={!show}
  //           className={classNames(theme.base, theme.positions[position], show ? theme.show.on : theme.show.off, className)}
  //           data-testid="modal"
  //           role="dialog"
  //           {...props}
  //         >
  //           <div className={classNames(theme.content.base, theme.sizes[size])}>
  //             <div className={classNames(theme.content.inner, innerClassName)}>{children}</div>
  //           </div>
  //         </div>
  //       </ModalContext.Provider>,
  //       container
  //     )
  //   : null
  const ref: any = useRef()
  useEffect(() => {
    if (autoClose) {
      const checkIfClickedOutside = (e: any) => {
        if (onClose && ref.current && !ref.current.contains(e.target)) {
          onClose()
        }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
        document.removeEventListener("click", checkIfClickedOutside)
      }
    }
  }, [onClose])

  if (mounted) {
    return createPortal(
      <ModalContext.Provider value={{ popup, onClose }}>
        <motion.div
          variants={backdropAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-hidden={!show}
          className={classNames(theme.base, theme.positions[position], show ? theme.show.on : theme.show.off, className)}
          data-testid="modal"
          role="dialog"
          // {...props}
        >
          <motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit" className={classNames(theme.content.base, theme.sizes[size])}>
            <div className={classNames(theme.content.inner, innerClassName)} ref={ref}>
              {children}
            </div>
            {isLoading && (
              <div className={classNames(theme.content.loadingOverlay)} style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}>
                <SvgLoading className="w-10 h-10" />
              </div>
            )}
          </motion.div>
        </motion.div>
      </ModalContext.Provider>,
      document.getElementById("modal_root") as Element
    )
  }

  return null
}

ModalComponent.displayName = "Modal"
ModalHeader.displayName = "Modal.Header"
ModalBody.displayName = "Modal.Body"
ModalFooter.displayName = "Modal.Footer"

export const Modal = Object.assign(ModalComponent, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
})
