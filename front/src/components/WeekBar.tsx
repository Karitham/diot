import React, { useEffect, useRef } from 'react'
import '../styles/compo/WeekBar.css'

interface MondayComponentProps {
  dayOfWeek: string
  disabledStart: number
  disabledEnd: number
}

const MondayComponent: React.FC<MondayComponentProps> = (props: MondayComponentProps) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#2b4162'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#d9d9d9'
    ctx.fillRect(props.disabledStart, 0, props.disabledEnd - props.disabledStart, canvas.height)
  }, [props.disabledStart, props.disabledEnd])

  return (
    <div className="monday-parent">
      <div className="monday">{props.dayOfWeek}</div>
      <div className="planning2">
        <canvas className="canvas-full" ref={ref} height={10} width={24 * 60}></canvas>
      </div>
    </div>
  )
}

export default MondayComponent
