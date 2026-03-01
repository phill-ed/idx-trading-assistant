import { useState } from 'react'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'

interface Stock {
  code: string
  name: string
  price: number
  change: number
  volume: string
  marketCap: string
}

const allStocks: Stock[] = [
  { code: 'BBCA', name: 'Bank Central Asia', price: 8925, change: 3.25, volume: '45.2M', marketCap: '1,102T' },
  { code: 'BBRI', name: 'Bank Rakyat Indonesia', price: 4850, change: 1.52, volume: '38.1M', marketCap: '731T' },
  { code: 'TLKM', name: 'Telkom Indonesia', price: 3150, change: 2.14, volume: '22.4M', marketCap: '312T' },
  { code: 'BMRI', name: 'Bank Mandiri', price: 5250, change: 1.87, volume: '28.9M', marketCap: '487T' },
  { code: 'ASII', name: 'Astra International', price: 5450, change: -2.31, volume: '15.2M', marketCap: '221T' },
  { code: 'UNVR', name: 'Unilever Indonesia', price: 4150, change: -1.56, volume: '8.4M', marketCap: '158T' },
  { code: 'PTBA', name: 'P Tambang Batubara', price: 3850, change: 4.12, volume: '12.1M', marketCap: '56T' },
  { code: 'ANTM', name: 'Aneka Tambang', price: 1525, change: -3.45, volume: '18.3M', marketCap: '38T' },
  { code: 'INDF', name: 'Indofood Sukses', price: 6850, change: 0.85, volume: '6.2M', marketCap: '59T' },
  { code: 'KLBF', name: 'Kalbe Farma', price: 1520, change: -0.65, volume: '9.8M', marketCap: '71T' },
  { code: 'PGAS', name: 'PGN Nusantara', price: 1125, change: 2.45, volume: '31.2M', marketCap: '27T' },
  { code: 'PERT', name: 'Pertamina Hulu Energi', price: 1620, change: 1.12, volume: '14.5M', marketCap: '82T' },
]

const stockSectors = ['All', 'Finance', 'Technology', 'Consumer', 'Mining', 'Infrastructure', 'Energy']

function StockMonitor({ searchQuery }: { searchQuery: string }) {
  const [watchlist, setWatchlist] = useState<string[]>(['BBCA', 'BBRI', 'TLKM'])
  const [selectedSector, setSelectedSector] = useState('All')
  const [sortBy, setSortBy] = useState<'code' | 'price' | 'change' | 'volume'>('code')

  const filteredStocks = allStocks
    .filter(stock => 
      (searchQuery === '' || stock.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
       stock.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price
      if (sortBy === 'change') return b.change - a.change
      if (sortBy === 'volume') return parseInt(b.volume) - parseInt(a.volume)
      return a.code.localeCompare(b.code)
    })

  const toggleWatchlist = (code: string) => {
    setWatchlist(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  return (
    <div className="stock-monitor">
      <div className="dashboard-header">
        <h1>🔍 Stock Monitor</h1>
        <button className="btn btn-primary">
          <RefreshCw size={14} style={{ marginRight: 6 }} />
          Refresh Data
        </button>
      </div>

      {/* Watchlist */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3 className="card-title">⭐ Watchlist</h3>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {watchlist.map(code => {
            const stock = allStocks.find(s => s.code === code)
            return stock ? (
              <div key={code} style={{ 
                padding: '10px 16px', 
                background: 'var(--bg-tertiary)', 
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <div>
                  <div className="stock-code">{code}</div>
                  <div className="stock-name">Rp {stock.price.toLocaleString('id-ID')}</div>
                </div>
                <div className={stock.change >= 0 ? 'positive' : 'negative'}>
                  {stock.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </div>
                <button 
                  onClick={() => toggleWatchlist(code)}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-yellow)', cursor: 'pointer' }}
                >
                  ★
                </button>
              </div>
            ) : null
          })}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {stockSectors.map(sector => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`btn ${selectedSector === sector ? 'btn-primary' : ''}`}
              style={{ background: selectedSector === sector ? 'var(--accent-blue)' : 'var(--bg-tertiary)' }}
            >
              {sector}
            </button>
          ))}
        </div>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          style={{ 
            padding: '8px 12px', 
            borderRadius: 6, 
            background: 'var(--bg-tertiary)', 
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)'
          }}
        >
          <option value="code">Sort by Code</option>
          <option value="price">Sort by Price</option>
          <option value="change">Sort by Change</option>
          <option value="volume">Sort by Volume</option>
        </select>
      </div>

      {/* Stock Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Code</th>
                <th>Name</th>
                <th>Price</th>
                <th>Change</th>
                <th>Volume</th>
                <th>Market Cap</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map(stock => (
                <tr key={stock.code}>
                  <td>
                    <button 
                      onClick={() => toggleWatchlist(stock.code)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
                    >
                      {watchlist.includes(stock.code) ? '★' : '☆'}
                    </button>
                  </td>
                  <td className="stock-code">{stock.code}</td>
                  <td className="stock-name">{stock.name}</td>
                  <td>Rp {stock.price.toLocaleString('id-ID')}</td>
                  <td className={stock.change >= 0 ? 'positive' : 'negative'}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </td>
                  <td>{stock.volume}</td>
                  <td>{stock.marketCap}</td>
                  <td>
                    <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StockMonitor
