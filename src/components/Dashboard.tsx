import { TrendingUp, TrendingDown, Activity, Users, Globe, Clock } from 'lucide-react'

// Mock data for Indonesian stock market
const marketIndices = [
  { name: 'IDX Composite', value: 7245.67, change: 0.82, symbol: 'JKSE' },
  { name: 'IDX Growth', value: 1523.45, change: 1.24, symbol: 'IDXGROW' },
  { name: 'IDX Value', value: 985.32, change: -0.35, symbol: 'IDXVAL' },
]

const topMovers = [
  { code: 'BBCA', name: 'Bank Central Asia', price: 8925, change: 3.25 },
  { code: 'TLKM', name: 'Telkom Indonesia', price: 3150, change: 2.14 },
  { code: 'BMRI', name: 'Bank Mandiri', price: 5250, change: 1.87 },
  { code: 'ASII', name: 'Astra International', price: 5450, change: -2.31 },
  { code: 'UNVR', name: 'Unilever Indonesia', price: 4150, change: -1.56 },
]

const sectorPerformance = [
  { sector: 'Finance', change: 1.24 },
  { sector: 'Technology', change: 2.15 },
  { sector: 'Consumer', change: 0.45 },
  { sector: 'Mining', change: -0.82 },
  { sector: 'Infrastructure', change: 1.12 },
]

const recentSignals = [
  { type: 'BUY', stock: 'BBRI', reason: 'RSI oversold, support level', time: '2h ago' },
  { type: 'BUY', stock: 'PGAS', reason: 'Bullish divergence', time: '3h ago' },
  { type: 'SELL', stock: 'TKIM', reason: 'Resistance break down', time: '4h ago' },
]

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Market Dashboard</h1>
        <div className="market-status">
          <span className="status-dot status-closed"></span>
          <span>Market Closed (Next: Mon 09:30)</span>
        </div>
      </div>

      {/* Market Indices */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {marketIndices.map((idx) => (
          <div key={idx.symbol} className="stat-card">
            <div className="stat-label">{idx.name}</div>
            <div className="stat-value">{idx.value.toLocaleString('id-ID')}</div>
            <div className={`stat-change ${idx.change >= 0 ? 'positive' : 'negative'}`}>
              {idx.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {idx.change > 0 ? '+' : ''}{idx.change}%
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label"><Activity size={14} /> Trading Volume</div>
          <div className="stat-value">12.4B</div>
          <div className="stat-change positive">+15.2%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><Users size={14} /> Market Cap</div>
          <div className="stat-value">9,820T</div>
          <div className="stat-change positive">+0.8%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><Globe size={14} /> Listed Companies</div>
          <div className="stat-value">832</div>
          <div className="stat-change positive">+2</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><Clock size={14} /> Avg Turnover</div>
          <div className="stat-value">14.2T</div>
          <div className="stat-change negative">-3.4%</div>
        </div>
      </div>

      <div className="grid-2">
        {/* Top Movers */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🔥 Top Movers Today</h3>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {topMovers.map((stock) => (
                  <tr key={stock.code}>
                    <td className="stock-code">{stock.code}</td>
                    <td className="stock-name">{stock.name}</td>
                    <td>Rp {stock.price.toLocaleString('id-ID')}</td>
                    <td className={stock.change >= 0 ? 'positive' : 'negative'}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sector Performance */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📈 Sector Performance</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sectorPerformance.map((sector) => (
              <div key={sector.sector} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{sector.sector}</span>
                <span className={sector.change >= 0 ? 'positive' : 'negative'}>
                  {sector.change >= 0 ? '+' : ''}{sector.change}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent AI Signals */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <h3 className="card-title">🤖 Recent AI Trading Signals</h3>
          <button className="btn btn-primary">View All Signals</button>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {recentSignals.map((signal, idx) => (
            <div key={idx} style={{ 
              flex: 1, 
              padding: 16, 
              background: 'var(--bg-tertiary)', 
              borderRadius: 8,
              borderLeft: signal.type === 'BUY' ? '3px solid var(--accent-green)' : '3px solid var(--accent-red)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className={`tag tag-${signal.type.toLowerCase()}`}>{signal.type}</span>
                <span className="stock-code">{signal.stock}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{signal.reason}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>{signal.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
