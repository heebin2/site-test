import { useState } from 'react'

interface NamePromptProps {
  onSubmit: (name: string) => void
}

/** 이름이 없을 때 보여주는 입력 폼. 제출하면 /<name> 으로 이동한다. */
export default function NamePrompt({ onSubmit }: NamePromptProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <form className="name-prompt" onSubmit={handleSubmit}>
      <label htmlFor="name-input" className="name-prompt__label">
        이름을 알려주세요 🌸
      </label>
      <div className="name-prompt__row">
        <input
          id="name-input"
          className="name-prompt__input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="예: 철수"
          autoFocus
          maxLength={20}
        />
        <button
          type="submit"
          className="name-prompt__button"
          disabled={!value.trim()}
        >
          인사 받기
        </button>
      </div>
    </form>
  )
}
