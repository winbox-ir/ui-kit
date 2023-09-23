"use client"
import React from "react"

export const SvgLoading: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 52 12"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
      {...props}
    >
      <circle fill="currentColor" stroke="none" cx="6" cy="6" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
      </circle>
      <circle fill="currentColor" stroke="none" cx="26" cy="6" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
      </circle>
      <circle fill="currentColor" stroke="none" cx="46" cy="6" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
      </circle>
    </svg>
  )
}
