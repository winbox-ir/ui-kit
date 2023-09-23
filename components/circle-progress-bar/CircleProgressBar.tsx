import { PropsWithChildren } from "react"

type CircleProgressBarProps = {
  size?: number
  className?: string
  progress?: number
}

export function CircleProgressBar(props: PropsWithChildren<CircleProgressBarProps>) {
  const { size = 32, progress = 0 } = props

  const percentageComplete = progress
  const strokeDashOffsetValue = 100 - percentageComplete * 100

  return (
    <svg height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: `rotate(-90deg)` }}>
      <circle
        cx={`${size / 2}`}
        cy={`${size / 2}`}
        r={`${size / 2.5}`}
        strokeWidth="4"
        stroke="darkorange"
        fill="none"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset={strokeDashOffsetValue}
      ></circle>
      <text
        x={`${size / 2}`}
        y={`${size / 2}`}
        dominantBaseline="middle"
        textAnchor="middle"
        style={{ whiteSpace: "nowrap", fontSize: 10 }}
        transform={`rotate(90, ${size / 2}, ${size / 2})`}
        className="dark:fill-white"
      >
        %{Math.round(progress * 100)}
      </text>
    </svg>
  )
}

export default CircleProgressBar
