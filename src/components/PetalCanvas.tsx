import { useEffect, useRef } from 'react'
import { pick, rand } from '../utils/random'

type RGB = readonly [number, number, number]

interface Petal {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  fallSpeed: number
  swayPhase: number
  swayAmplitude: number
  color: RGB
  opacity: number
}

const PETAL_COLORS: readonly RGB[] = [
  [255, 183, 197], // 연분홍
  [255, 209, 220], // 더 옅은 분홍
  [255, 228, 235], // 거의 흰
]

/** 전체 화면을 덮는 캔버스에 벚꽃 꽃잎이 흩날린다. */
export default function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let width = 0
    let height = 0
    let petals: Petal[] = []
    let raf = 0

    // atTop=true 면 화면 위쪽에서, false 면 화면 어디서나 시작 (초기 분포용)
    const makePetal = (atTop: boolean): Petal => ({
      x: rand(0, width),
      y: atTop ? rand(-height, 0) : rand(0, height),
      size: rand(8, 18),
      rotation: rand(0, Math.PI * 2),
      rotationSpeed: rand(-0.02, 0.02),
      fallSpeed: rand(0.5, 1.6),
      swayPhase: rand(0, Math.PI * 2),
      swayAmplitude: rand(0.5, 1.8),
      color: pick(PETAL_COLORS),
      opacity: rand(0.6, 0.95),
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // 화면 면적에 비례한 꽃잎 수 (40 ~ 70)
      const count = Math.round(
        Math.min(70, Math.max(40, (width * height) / 26000))
      )
      petals = Array.from({ length: count }, () => makePetal(false))
    }

    const drawPetal = (p: Petal) => {
      const [r, g, b] = p.color
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`
      // 꽃잎 한 장: 끝이 살짝 오목한 타원형
      const h = p.size / 2
      ctx.beginPath()
      ctx.moveTo(0, -h)
      ctx.bezierCurveTo(h, -h, h, h, 0, h)
      ctx.bezierCurveTo(-h, h, -h, -h, 0, -h)
      ctx.fill()
      ctx.restore()
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of petals) {
        p.y += p.fallSpeed
        p.swayPhase += 0.01
        p.x += Math.sin(p.swayPhase) * p.swayAmplitude
        p.rotation += p.rotationSpeed

        // 화면 밖으로 나가면 위에서 재생성(recycle)
        if (p.y > height + 20 || p.x < -30 || p.x > width + 30) {
          Object.assign(p, makePetal(true))
        }
        drawPetal(p)
      }
      raf = window.requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduceMotion) {
      // 모션 최소화: 정적으로 한 프레임만 그린다
      ctx.clearRect(0, 0, width, height)
      petals.forEach(drawPetal)
    } else {
      raf = window.requestAnimationFrame(tick)
    }

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="petal-canvas" aria-hidden="true" />
}
