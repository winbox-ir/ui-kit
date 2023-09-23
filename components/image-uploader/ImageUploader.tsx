"use client"
import axios from "axios"
import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import React, { useRef, useState } from "react"
import AvatarEditor from "react-avatar-editor"
import { Control, RegisterOptions, useController } from "react-hook-form"
import { BsCamera } from "react-icons/bs"
import { toast } from "react-toastify"
import { Button } from "../button/Button"
import { Modal } from "../modal"

type ImageUploaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  title?: string
  description?: string
  className?: string
  disabled?: boolean
  isMulti?: boolean
  onUploaded?: (imgUrl: string) => void
  onFileSelected?: (file: File) => void
  acceptFile?: string
  // methods: UseFormReturn<any, any>
  name: string
  uploadUrl: string
  cdnUrl?: string
  control: Control<any, any>
  rules?: Omit<RegisterOptions<any, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">
  shape?: "square" | "circle"
  dimention?: { width: number; height: number }
  imageEditor?: boolean
}

export const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const {
    className = "",
    onUploaded,
    disabled,
    acceptFile,
    control,
    name,
    rules,
    onFileSelected,
    uploadUrl,
    cdnUrl = process.env.NODE_ENV == "production" ? "https://ac-cdn.winbox.ir" : "https://ac-cdn.winbox.ir",
    shape = "square",
    dimention = { width: 200, height: 200 },
    imageEditor = true,
  } = props
  const { field, fieldState } = useController({ name, control, rules })
  const error = fieldState.error

  const [openModal, setOpenModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const editorRef = useRef<AvatarEditor>(null)

  const [uploading, setUploading] = useState(false)

  const openImageEditor = (photo: File | null) => {
    setSelectedFile(photo), setOpenModal(true)
  }

  const uploadPhoto = (file: Blob | null, isBlob = false) => {
    if (!file || disabled) return
    let photo = isBlob ? new File([file], `${new Date().valueOf()}.jpeg`, { type: file.type }) : file

    setUploading(true)
    const fd = new FormData()
    fd.append("file", photo)
    axios
      .post(uploadUrl, fd)
      .then((res) => {
        const imageUrl = res.data
        field.onChange(imageUrl)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      })
      .finally(() => {
        setUploading(false)
        setSelectedFile(null)
        setOpenModal(false)
      })
  }

  return (
    <div
      className={`group relative flex justify-center items-center border border-dashed p-1 hover:bg-gray-100 dark:hover:bg-gray-800 duration-300 transition-colors rounded-lg cursor-pointer text-gray-500 ${className}`}
    >
      {field.value && (
        <div className="relative rounded overflow-hidden w-full h-full">
          <Image src={cdnUrl + "/" + field.value} fill priority sizes="250px" className="rounded" alt={""} />
        </div>
      )}

      <div className="flex justify-center items-center left-0 right-0 top-0 bottom-0 absolute" onClick={() => fileRef.current?.click()}>
        <BsCamera className="opacity-0 group-hover:opacity-100 duration-300 w-8 h-8 text-gray-300" />
      </div>

      <input
        className="hidden"
        type="file"
        onChange={(e) => {
          const _file = e.target.files?.item(0) ?? null
          if (imageEditor) {
            openImageEditor(_file)
          } else {
            uploadPhoto(_file)
          }
          // if (onFileSelected && _file) {
          //   onFileSelected(_file)
          // }
        }}
        ref={fileRef}
        // accept={acceptFile ?? "image/x-png,image/gif,image/jpeg,image/svg"}
        accept={acceptFile ?? "image/*"}
      />

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {openModal && (
          <Modal
            size={"sm"}
            onClick={(ev) => ev.stopPropagation()}
            onClose={() => {
              setOpenModal(false), setSelectedFile(null)
            }}
          >
            <Modal.Header>ویرایش تصویر</Modal.Header>
            <Modal.Body className="!p-0 flex item-center justify-center">
              <AvatarEditor
                ref={editorRef}
                image={selectedFile ? URL.createObjectURL(selectedFile) : ""}
                width={dimention.width}
                height={dimention.height}
                border={50}
                scale={1.0}
                borderRadius={dimention.width / 2}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                disabled={uploading}
                loading={uploading}
                onClick={() => editorRef.current!.getImageScaledToCanvas().toBlob((file) => uploadPhoto(file, true), "image/jpeg")}
              >
                بارگزاری
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </AnimatePresence>

      {error && <small className="text-xs text-red-500">{error.message}</small>}
    </div>
  )
}
