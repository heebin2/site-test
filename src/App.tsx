import PetalCanvas from './components/PetalCanvas'
import FallingText from './components/FallingText'
import NamePrompt from './components/NamePrompt'
import { useNameFromPath } from './hooks/useNameFromPath'

export default function App() {
  const name = useNameFromPath()

  // 이름을 /<name> 경로로 반영한다. 전체 리로드 없이 URL만 바꾸고
  // popstate를 직접 발생시켜 useNameFromPath가 즉시 갱신되게 한다.
  const goToName = (next: string) => {
    const base = import.meta.env.BASE_URL // 예: "/site-test/"
    window.history.pushState(null, '', base + encodeURIComponent(next))
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div className="stage">
      <PetalCanvas />
      <FallingText name={name} />
      <header className="hero">
        {name ? (
          <>
            <h1>{name} 야, 안녕? 🌸</h1>
            <p>벚꽃과 함께 인사를 전해요</p>
          </>
        ) : (
          <>
            <h1>안녕, 반가워 🌸</h1>
            <NamePrompt onSubmit={goToName} />
          </>
        )}
      </header>
    </div>
  )
}
