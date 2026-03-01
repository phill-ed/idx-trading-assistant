import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import { Wallet, TrendingUp, Plus, RefreshCw, Download, Target, Calendar } from 'lucide-react'

interface PortfolioItem {
  code: string
  name: string
  shares: number
  avgPrice: number
  currentPrice: number
  sector: string
}

const portfolioData: PortfolioItem[] = [
  { code: 'BBCA', name: 'Bank Central Asia', shares: 500, avgPrice: 8200, currentPrice: 8925, sector: 'Finance' },
  { code: 'BBRI', name: 'Bank Rakyat Indonesia', shares: 1000, avgPrice: 4500, currentPrice: 4850, sector: 'Finance' },
  { code: 'TLKM', name: 'Telkom Indonesia', shares: 300, avgPrice: 2900, currentPrice: 3150, sector: 'Technology' },
  { code: 'PTBA', name: 'P Tambang Batubara', shares: 200, avgPrice: 3500, currentPrice: 3850, sector: 'Mining' },
  { code: 'UNVR', name: 'Unilever Indonesia', shares: 150, avgPrice: 4300, currentPrice: 4150, sector: 'Consumer' },
  { code: 'PGAS', name: 'PGN Nusantara', shares: 500, avgPrice: 1050, currentPrice: 1125, sector: 'Energy' },
]

const performanceData = [
  { month: 'Jan', value: 10000000 },
  { month: 'Feb', value: 10500000 },
  { month: 'Mar', value: 10200000 },
  { month: 'Apr', value: 10800000 },
  { month: 'May', value: 11200000 },
  { month: 'Jun', value: 11000000 },
]

const sectorAllocation = [
  { name: 'Finance', value: 55, color: '#58a6ff' },
  { name: 'Technology', value: 15, color: '#a371f7' },
  { name: 'Mining', value: 12, color: '#d29922' },
  { name: 'Consumer', value: 10, color: '#3fb950' },
  { name: 'Energy', value: 8, color: '#f85149' },
]

function Portfolio() {
  const [selectedPeriod, setSelectedPeriod] = useState('1M')

  const totalValue = portfolioData.reduce((sum, item) => sum + (item.shares * item.currentPrice), 0)
  const totalCost = portfolioData.reduce((sum, item) => sum + (item.shares * item.avgPrice), 0)
  const totalGain = totalValue - totalCost
  const totalGainPercent = ((totalValue - totalCost) / totalCost) * 100

  const topGainers = [...portfolioData].sort((a, b) => {
    const gainA = ((a.currentPrice - a.avgPrice) / a.avgPrice) * 100
    const gainB = ((b.currentPrice - b.avgPrice) / b.avgPrice) * 100
    return gainB - gainA
  }).slice(0, 3)

  const topLosers = [...portfolioData].sort((a, b) => {
    const gainA = ((a.currentPrice - a.avgPrice) / a.avgPrice) * 100
    const gainB = ((b.currentPrice - b.avgPrice) / b.avgPrice) * 100
    return gainA - gainB
  }).slice(0, 3)

  return (
    <div className="portfolio">
      <div className="dashboard-header">
        <h1>💼 Portfolio Tracker</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary">
            <Plus size={14} style={{ marginRight: 6 }} />
            Add Position
          </button>
          <button className="btn" style={{ background: 'var(--bg-tertiary)' }}>
            <Download size={14} />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label"><Wallet size={14} /> Total Value</div>
          <div className="stat-value">Rp {(totalValue / 1000000).toFixed(2)}M</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><Target size={14} /> Total Cost</div>
          <div className="stat-value">Rp {(totalCost / 1000000).toFixed(2)}M</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><TrendingUp size={14} /> Total Gain/Loss</div>
          <div className="stat-value" style={{ color: totalGain >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            {totalGain >= 0 ? '+' : ''}Rp {(totalGain / 1000000).toFixed(2)}M
          </div>
          <div className={`stat-change ${totalGainPercent >= 0 ? 'positive' : 'negative'}`}>
            {totalGainPercent >= 0 ? '+' : ''}{totalGainPercent.toFixed(2)}%
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><Calendar size={14} /> Today's Change</div>
          <div className="stat-value" style={{ color: 'var(--accent-green)' }}>+2.15%</div>
          <div className="stat-change positive">+Rp 215K</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Performance Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Performance History</h3>
            <div style={{ display: 'flex', gap: 4 }}>
              {['1W', '1M', '3M', '6M', '1Y'].map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className="btn"
                  style={{ 
                    padding: '4px 10px', 
                    fontSize: '0.75rem',
                    background: selectedPeriod === period ? 'var(--accent-blue)' : 'var(--bg-tertiary)'
                  }}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <XAxis dataKey="month" stroke="#8b949e" />
                <YAxis stroke="#8b949e" tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                <Tooltip 
                  contentStyle={{ background: '#1c2128', border: '1px solid #30363d', borderRadius: 8 }}
                />
                <Line type="monotone" dataKey="value" stroke="#58a6ff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Sector Allocation</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '50%', height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sectorAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1c2128', border: '1px solid #30363d', borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ width: '50%' }}>
              {sectorAllocation.map(sector => (
                <div key={sector.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 2, background: sector.color }}></div>
                  <span style={{ flex: 1, fontSize: '0.85rem' }}>{sector.name}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{sector.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3 className="card-title">Holdings</h3>
          <button className="btn" style={{ background: 'var(--bg-tertiary)' }}>
            <RefreshCw size={14} />
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Shares</th>
                <th>Avg Price</th>
                <th>Current</th>
                <th>Value</th>
                <th>Gain/Loss</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.map(item => {
                const value = item.shares * item.currentPrice
                const gain = (item.currentPrice - item.avgPrice) * item.shares
                const gainPercent = ((item.currentPrice - item.avgPrice) / item.avgPrice) * 100
                return (
                  <tr key={item.code}>
                    <td>
                      <div className="stock-code">{item.code}</div>
                      <div className="stock-name">{item.name}</div>
                    </td>
                    <td>{item.shares}</td>
                    <td>Rp {item.avgPrice.toLocaleString('id-ID')}</td>
                    <td>Rp {item.currentPrice.toLocaleString('id-ID')}</td>
                    <td>Rp {(value / 1000000).toFixed(2)}M</td>
                    <td className={gain >= 0 ? 'positive' : 'negative'}>
                      {gain >= 0 ? '+' : ''}Rp {(gain / 1000).toFixed(0)}K
                    </td>
                    <td className={gainPercent >= 0 ? 'positive' : 'negative'}>
                      {gainPercent >= 0 ? '+' : ''}{gainPercent.toFixed(2)}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Movers */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🏆 Top Gainers</h3>
          </div>
          {topGainers.map((item) => {
            const gain = ((item.currentPrice - item.avgPrice) / item.avgPrice) * 100
            return (
              <div key={item.code} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <span className="stock-code">{item.code}</span>
                  <span className="stock-name" style={{ marginLeft: 8 }}>{item.name}</span>
                </div>
                <span className="positive">+{gain.toFixed(2)}%</span>
              </div>
            )
          })}
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📉 Top Losers</h3>
          </div>
          {topLosers.map((item) => {
            const gain = ((item.currentPrice - item.avgPrice) / item.avgPrice) * 100
            return (
              <div key={item.code} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <span className="stock-code">{item.code}</span>
                  <span className="stock-name" style={{ marginLeft: 8 }}>{item.name}</span>
                </div>
                <span className="negative">{gain.toFixed(2)}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
