import { useState } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Activity, Target, BarChart2 } from 'lucide-react'

const stockData = [
  { date: 'Jan', price: 8200 },
  { date: 'Feb', price: 8350 },
  { date: 'Mar', price: 8100 },
  { date: 'Apr', price: 8450 },
  { date: 'May', price: 8600 },
  { date: 'Jun', price: 8400 },
  { date: 'Jul', price: 8700 },
  { date: 'Aug', price: 8850 },
  { date: 'Sep', price: 8650 },
  { date: 'Oct', price: 8900 },
  { date: 'Nov', price: 8750 },
  { date: 'Dec', price: 8925 },
]

const indicators = {
  RSI: { value: 68.5, signal: 'Overbought', recommendation: 'Caution - may pullback' },
  SMA_20: { value: 8650, signal: 'Above', recommendation: 'Bullish trend' },
  SMA_50: { value: 8420, signal: 'Above', recommendation: 'Medium-term bullish' },
  MACD: { value: 125, signal: 'Bullish Crossover', recommendation: 'Buy signal' },
  Bollinger: { price: 8925, upper: 9100, lower: 8200, signal: 'Near upper band', recommendation: 'Could be overbought' },
}

function TechnicalAnalysis() {
  const [selectedStock, setSelectedStock] = useState('BBCA')
  const [timeframe, setTimeframe] = useState('1Y')

  return (
    <div className="technical-analysis">
      <div className="dashboard-header">
        <h1>📈 Technical Analysis</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <select 
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: 8, 
              background: 'var(--bg-tertiary)', 
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '1rem'
            }}
          >
            <option value="BBCA">BBCA - Bank Central Asia</option>
            <option value="BBRI">BBRI - Bank Rakyat</option>
            <option value="TLKM">TLKM - Telkom</option>
            <option value="BMRI">BMRI - Bank Mandiri</option>
          </select>
          <div style={{ display: 'flex', gap: 4 }}>
            {['1W', '1M', '3M', '6M', '1Y', 'ALL'].map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className="btn"
                style={{ 
                  background: timeframe === tf ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                  padding: '8px 12px'
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3 className="card-title">{selectedStock} - Price Chart</h3>
        </div>
        <div className="chart-container" style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stockData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#58a6ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
              <XAxis dataKey="date" stroke="#8b949e" />
              <YAxis domain={['auto', 'auto']} stroke="#8b949e" tickFormatter={(v) => v.toLocaleString()} />
              <Tooltip 
                contentStyle={{ background: '#1c2128', border: '1px solid #30363d', borderRadius: 8 }}
                labelStyle={{ color: '#e6edf3' }}
              />
              <Area type="monotone" dataKey="price" stroke="#58a6ff" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Technical Indicators */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title"><Activity size={18} /> Key Indicators</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>RSI (14)</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600 }}>{indicators.RSI.value}</div>
                <span className="tag tag-sell">{indicators.RSI.signal}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>SMA 20</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600 }}>{indicators.SMA_20.value.toLocaleString()}</div>
                <span className="tag tag-buy">{indicators.SMA_20.signal}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>SMA 50</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600 }}>{indicators.SMA_50.value.toLocaleString()}</div>
                <span className="tag tag-buy">{indicators.SMA_50.signal}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>MACD</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600 }}>+{indicators.MACD.value}</div>
                <span className="tag tag-buy">{indicators.MACD.signal}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
              <span>Bollinger Bands</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600 }}>{indicators.Bollinger.price} / {indicators.Bollinger.upper}</div>
                <span className="tag tag-hold">{indicators.Bollinger.signal}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title"><Target size={18} /> Analysis Summary</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: 16, background: 'var(--bg-tertiary)', borderRadius: 8, borderLeft: '3px solid var(--accent-green)' }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Overall Signal</div>
              <div style={{ color: 'var(--accent-green)', fontSize: '1.2rem' }}>BULLISH</div>
            </div>
            <div style={{ padding: 16, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Key Observations:</div>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: 20, fontSize: '0.9rem' }}>
                <li>Price above 20 & 50 SMA - bullish trend</li>
                <li>MACD bullish crossover - momentum positive</li>
                <li>RSI approaching overbought - caution</li>
                <li>Near upper Bollinger band - potential resistance</li>
              </ul>
            </div>
            <div style={{ padding: 16, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Recommendation:</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Consider <strong>holding</strong> current positions. Wait for pullback to support levels (SMA 20) for new entries. 
                Set stop-loss at 8500.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><BarChart2 size={18} /> Pattern Recognition</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {['Double Bottom', 'Bull Flag', 'Head & Shoulders'].map(pattern => (
            <div key={pattern} style={{ padding: 16, background: 'var(--bg-tertiary)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{pattern}</div>
              <span className="tag tag-buy">Detected</span>
              <div style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Confidence: 72%</div>
            </div>
          ))}
          {['Cup & Handle', 'Triangle', 'Wedge'].map(pattern => (
            <div key={pattern} style={{ padding: 16, background: 'var(--bg-tertiary)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{pattern}</div>
              <span className="tag tag-hold">Forming</span>
              <div style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Confidence: 45%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TechnicalAnalysis
