import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'This is a demo response from MiMo AI. Connect your MiMo API key to get real responses!' }])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🧠 MiMo Quiz</h1>
        <p>AI Quiz Generator</p>
      </header>
      <div className="chat-container">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div className="avatar">{msg.role === 'user' ? '👤' : '🤖'}</div>
            <div className="content">{msg.content}</div>
          </div>
        ))}
        {loading && <div className="message assistant"><div className="avatar">🤖</div><div className="content thinking">Thinking...</div></div>}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a topic for quiz..." />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default App
