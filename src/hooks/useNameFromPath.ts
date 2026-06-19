import { useEffect, useState } from 'react'

/**
 * URL 경로에서 base(`/site-test/`) 이후 첫 세그먼트를 이름으로 추출한다.
 *   /site-test/        → null
 *   /site-test/철수    → "철수"
 * popstate / pushState 로 경로가 바뀌면 갱신된다.
 */
function readName(): string | null {
  const base = import.meta.env.BASE_URL // 예: "/site-test/"
  let path = window.location.pathname

  if (path.startsWith(base)) {
    path = path.slice(base.length)
  } else {
    // dev 서버 루트 등 base가 안 붙은 경우 대비
    path = path.replace(/^\//, '')
  }

  const segment = path.split('/')[0]?.trim()
  if (!segment) return null

  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

export function useNameFromPath(): string | null {
  const [name, setName] = useState<string | null>(() => readName())

  useEffect(() => {
    const update = () => setName(readName())
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  return name
}
