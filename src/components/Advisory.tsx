import { useState } from 'react'
import { Brain, MessageSquare, Send, Sparkles, TrendingUp, Shield, Clock, ThumbsUp, ThumbsDown } from 'lucide-react'

interface AdvisorMessage {
  id: number
  type: 'user' | 'ai'
  content: string
  timestamp: string
}

const initialMessages: AdvisorMessage[] = [
  {
    id: 1,
    type: 'ai',
    content: "Hello! I'm your AI Trading Advisor for Indonesian stocks. I can help you with:\n\n📊 **Stock Analysis** - Technical & fundamental insights\n💡 **Trading Strategies** - Based on market conditions\n🎯 **Entry/Exit Points** - Smart price recommendations\n📰 **Market News** - Impact analysis on your portfolio\n\nWhat would you like to know?",
    timestamp: '10:00 AM'
  }
]

const quickActions = [
  { label: 'Analyze BBCA', icon: TrendingUp },
  { label: 'Portfolio Review', icon: Brain },
  { label: 'Risk Assessment', icon: Shield },
  { label: 'Market Outlook', icon: Sparkles },
]

const marketInsights = [
  { 
    title: 'IDX Composite Rally', 
    summary: 'Market showing strong momentum with financial sector leading gains. RSI indicates overbought conditions.',
    sentiment: 'bullish',
    stocks: ['BBCA', 'BBRI', 'BMRI']
  },
  { 
    title: 'Coal Sector Outlook', 
    summary: 'Global coal prices stabilizing. PTBA and ITMG showing support at current levels.',
    sentiment: 'neutral',
    stocks: ['PTBA', 'ITMG', 'KTB']
  },
  { 
    title: 'Consumer Confidence Rising', 
    summary: 'UNVR and INDF benefiting from increased consumer spending ahead of Ramadan.',
    sentiment: 'bullish',
    stocks: ['UNVR', 'INDF', 'KLBF']
  },
]

function Advisory() {
  const [messages, setMessages] = useState<AdvisorMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: AdvisorMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AdvisorMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: getAIResponse(input),
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, userMsg, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('bbca') || lowerQuery.includes('bank central')) {
      return `**BBCA Analysis:**\n\n📈 Current: Rp 8,925 (+3.25%)\n\n**Technical:**\n- RSI: 68.5 (Overbought)\n- SMA 20/50: Bullish alignment\n- MACD: Bullish crossover\n\n**Recommendation:** Hold current positions. Wait for pullback to Rp 8,500-8,600 for new entries. Support at SMA 20 (Rp 8,650).\n\n**Risk:** Near resistance at Rp 9,000.`
    }
    
    if (lowerQuery.includes('buy') || lowerQuery.includes('recommend')) {
      return `**Top Buy Recommendations Today:**\n\n1. **BBRI** - Strong support at Rp 4,800, RSI oversold\n   - Entry: Rp 4,850-4,900\n   - Target: Rp 5,200\n   - Stop: Rp 4,700\n\n2. **TLKM** - Bullish divergence on daily\n   - Entry: Rp 3,100-3,150\n   - Target: Rp 3,400\n   - Stop: Rp 3,000\n\n3. **PGAS** - Recovery play\n   - Entry: Rp 1,100-1,150\n   - Target: Rp 1,300\n   - Stop: Rp 1,050`
    }

    if (lowerQuery.includes('risk') || lowerQuery.includes('portfolio')) {
      return `**Portfolio Risk Assessment:**\n\n📊 Current Allocation:\n- Finance: 45% ⚠️ Overweight\n- Consumer: 20%\n- Mining: 15%\n- Energy: 10%\n- Others: 10%\n\n⚠️ **Risks Identified:**\n1. High exposure to financial sector\n2. Missing energy sector exposure\n3. No foreign stocks for diversification\n\n**Suggestions:**\n- Reduce BBCA/BBRI by 10%\n- Add PGAS or PERT (5-10%)\n- Consider IDX30 ETF for diversification`
    }

    return `I understand you're asking about: "${query}"\n\nFor more specific advice, try:\n- "Analyze BBCA" - Detailed stock analysis\n- "What should I buy?" - Buy recommendations\n- "Review my portfolio" - Risk assessment\n- "Market outlook" - General market sentiment\n\nOr select a quick action below!`
  }

  return (
    <div className="advisory">
      <div className="dashboard-header">
        <h1>🤖 AI Trading Advisor</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 24 }}>
        {/* Chat Interface */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '70vh' }}>
          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {quickActions.map(action => (
              <button
                key={action.label}
                onClick={() => setInput(action.label)}
                className="btn"
                style={{ background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <action.icon size={14} />
                {action.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16 }}>
            {messages.map(msg => (
              <div 
                key={msg.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 16 
                }}
              >
                <div 
                  style={{ 
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: 12,
                    background: msg.type === 'user' ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {msg.content}
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
                <Sparkles size={16} className="animate-pulse" />
                <span>AI is analyzing...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about stocks, strategies, or market..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 8,
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            <button onClick={handleSend} className="btn btn-primary" style={{ padding: '12px 20px' }}>
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Sidebar - Market Insights */}
        <div>
          <h3 style={{ marginBottom: 16 }}>📈 Market Insights</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {marketInsights.map((insight, idx) => (
              <div key={idx} className="card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h4 style={{ fontSize: '0.95rem' }}>{insight.title}</h4>
                  <span className={`tag tag-${insight.sentiment === 'bullish' ? 'buy' : insight.sentiment === 'bearish' ? 'sell' : 'hold'}`}>
                    {insight.sentiment}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                  {insight.summary}
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  {insight.stocks.map(stock => (
                    <span key={stock} className="stock-code" style={{ fontSize: '0.8rem' }}>{stock}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: 24, padding: 16, background: 'rgba(210, 153, 34, 0.1)', borderRadius: 8, border: '1px solid var(--accent-yellow)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Shield size={16} color="var(--accent-yellow)" />
              <span style={{ fontWeight: 600, color: 'var(--accent-yellow)' }}>Disclaimer</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              This is AI-generated advice for educational purposes only. Not financial advice. Always do your own research.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advisory
