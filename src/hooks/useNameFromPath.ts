import { useEffect, useState } from 'react'

/**
 * URL 경로에서 base(`/site-test/`) 이후 첫 세그먼트를 이름으로 추출한다.
 *   /site-test/        → null
 *   /site-test/철수    → "철수"
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

interface NameRoute {
  name: string | null
  /** 전체 리로드 없이 path로 이동하고 name 상태를 즉시 갱신한다. */
  navigate: (path: string) => void
}

export function useNameFromPath(): NameRoute {
  const [name, setName] = useState<string | null>(() => readName())

  useEffect(() => {
    // 브라우저 뒤로/앞으로 가기 대응
    const update = () => setName(readName())
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  const navigate = (path: string) => {
    window.history.pushState(null, '', path)
    setName(readName()) // 합성 이벤트에 의존하지 않고 직접 갱신
  }

  return { name, navigate }
}
