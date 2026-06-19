import PetalCanvas from './components/PetalCanvas'
import FallingText from './components/FallingText'
import NamePrompt from './components/NamePrompt'
import { useNameFromPath } from './hooks/useNameFromPath'

export default function App() {
  const name = useNameFromPath()

  // 전체 리로드 없이 URL만 바꾸고 popstate를 직접 발생시켜
  // useNameFromPath가 즉시 갱신되게 한다.
  const navigate = (path: string) => {
    window.history.pushState(null, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  const base = import.meta.env.BASE_URL // 예: "/site-test/"
  const goToName = (next: string) => navigate(base + encodeURIComponent(next))
  const goHome = () => navigate(base)

  return (
    <div className="stage">
      <PetalCanvas />
      <FallingText name={name} />

      {/* 이름이 없을 때만 가운데 입력 폼을 보여준다 */}
      {!name && (
        <header className="hero">
          <h1>안녕, 반가워 🌸</h1>
          <NamePrompt onSubmit={goToName} />
        </header>
      )}

      {/* 이름이 있을 때만 우하단 벚꽃 버튼으로 처음으로 돌아간다 */}
      {name && (
        <button
          type="button"
          className="home-button"
          onClick={goHome}
          aria-label="처음으로 돌아가기"
          title="처음으로"
        >
          🌸
        </button>
      )}
    </div>
  )
}
