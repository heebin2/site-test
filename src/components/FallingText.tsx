import { useEffect, useRef, useState } from 'react'
import { pick, rand } from '../utils/random'

interface Drop {
  id: number
  text: string
  left: number // vw
  fontSize: number // rem
  duration: number // s
  sway: number // px
  color: string
}

const BASE_WORDS = [
  '안녕',
  '반가워',
  '보고싶었어',
  '잘 지냈어',
  '따뜻해',
  '기분은 어때?',
  '예쁘다',
  '>_<',
  '히히',
  '하이!',
  '헤헤',
  '놀자!',
]
const TEXT_COLORS = ['#d63384', '#c2185b', '#ff6f91', '#b5179e']

interface FallingTextProps {
  name: string | null
}

/** 인사말이 비처럼 위에서 아래로 떨어진다. name이 있으면 "<name> 야 안녕?"도 함께. */
export default function FallingText({ name }: FallingTextProps) {
  const [drops, setDrops] = useState<Drop[]>([])
  const nextId = useRef(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduceMotion) return

    // name이 있으면 가중치를 줘서 자주 등장
    const greeting = name ? `${name}야 안녕` : null
    const pickWord = () => {
      if (greeting && Math.random() < 0.45) return greeting
      return pick(BASE_WORDS)
    }

    const spawn = () => {
      const drop: Drop = {
        id: nextId.current++,
        text: pickWord(),
        left: rand(2, 92),
        fontSize: rand(1.1, 2.6),
        duration: rand(6, 12),
        sway: rand(-40, 40),
        color: pick(TEXT_COLORS),
      }
      setDrops((prev) => [...prev, drop])
    }

    // 처음에 몇 개를 흩뿌려 시작
    for (let i = 0; i < 6; i++) {
      window.setTimeout(spawn, i * 400)
    }
    const interval = window.setInterval(spawn, 900)
    return () => window.clearInterval(interval)
  }, [name])

  const handleEnd = (id: number) => {
    setDrops((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <div className="falling-text" aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="drop"
          onAnimationEnd={() => handleEnd(d.id)}
          style={
            {
              left: `${d.left}vw`,
              fontSize: `${d.fontSize}rem`,
              color: d.color,
              '--sway': `${d.sway}px`,
              animationDuration: `${d.duration}s`,
            } as React.CSSProperties
          }
        >
          {d.text}
        </span>
      ))}
    </div>
  )
}
