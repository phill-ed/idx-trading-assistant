import { useState } from 'react'
import { Newspaper, TrendingUp, Calendar, ExternalLink, Filter, Search, Bell } from 'lucide-react'

interface NewsItem {
  id: number
  title: string
  summary: string
  source: string
  time: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
  stocks: string[]
  category: string
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Bank Central Asia (BBCA) Reports Strong Q4 Earnings',
    summary: 'BBCA posted net profit of Rp 9.2 trillion in Q4 2025, beating analyst expectations. Revenue grew 15% YoY driven by loan growth and fee income.',
    source: 'Kontan',
    time: '2 hours ago',
    sentiment: 'bullish',
    stocks: ['BBCA'],
    category: 'Earnings'
  },
  {
    id: 2,
    title: 'Bank Indonesia Holds Interest Rates Steady',
    summary: 'BI kept the 7-day reverse repo rate at 6.0% as expected. Governor Warjiyo signaled a pause in the rate hike cycle.',
    source: 'Reuters',
    time: '4 hours ago',
    sentiment: 'neutral',
    stocks: ['BBRI', 'BMRI', 'BBCA'],
    category: 'Macro'
  },
  {
    id: 3,
    title: 'Telkom Indonesia (TLKM) Expands Fiber Network',
    summary: 'TLKM announces Rp 15 trillion investment in fiber optic expansion across Indonesia, targeting 20 million new home passes by 2027.',
    source: 'Bloomberg',
    time: '5 hours ago',
    sentiment: 'bullish',
    stocks: ['TLKM'],
    category: 'Corporate'
  },
  {
    id: 4,
    title: 'Coal Prices Decline on Global Demand Concerns',
    summary: 'Global coal prices fell 8% this week as China\'s demand outlook weakens. Indonesian coal exporters face headwinds.',
    source: 'CNBC Indonesia',
    time: '6 hours ago',
    sentiment: 'bearish',
    stocks: ['PTBA', 'ITMG', 'KTB'],
    category: 'Commodity'
  },
  {
    id: 5,
    title: 'Ramadan Season Expected to Boost Consumer Stocks',
    summary: 'Analysts predict strong performance for consumer staples as Ramadan drives higher spending. UNVR and INDF top picks.',
    source: 'Katra Sekuritas',
    time: '8 hours ago',
    sentiment: 'bullish',
    stocks: ['UNVR', 'INDF', 'KLBF'],
    category: 'Strategy'
  },
  {
    id: 6,
    title: 'Tesla Interest in Indonesian Nickel Sparks EV Sector Rally',
    summary: 'Reports of Tesla exploring nickel supply deals in Indonesia sent EV-related stocks higher. ANTM and HRUM lead gains.',
    source: 'Detik Finance',
    time: '10 hours ago',
    sentiment: 'bullish',
    stocks: ['ANTM', 'HRUM', 'INCO'],
    category: 'Sector'
  },
  {
    id: 7,
    title: 'Oil Prices Surge on Middle East Tensions',
    summary: 'Brent crude jumped to $85/barrel on geopolitical concerns. PERT and PGAS to benefit from higher energy prices.',
    source: 'Bloomberg',
    time: '12 hours ago',
    sentiment: 'bullish',
    stocks: ['PERT', 'PGAS', 'MEDC'],
    category: 'Commodity'
  },
  {
    id: 8,
    title: 'Infrastructure Spending Plan to Support Construction Stocks',
    summary: 'Government announces Rp 400 trillion infrastructure budget for 2026. WIKA and ADHI expected to win major contracts.',
    source: 'Kontan',
    time: '1 day ago',
    sentiment: 'bullish',
    stocks: ['WIKA', 'ADHI', 'PTPP'],
    category: 'Policy'
  },
]

const categories = ['All', 'Earnings', 'Macro', 'Corporate', 'Commodity', 'Strategy', 'Sector', 'Policy']
const watchlistNews = ['BBCA', 'BBRI', 'TLKM', 'PTBA']

function News() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false)

  const filteredNews = newsData
    .filter(news => selectedCategory === 'All' || news.category === selectedCategory)
    .filter(news => 
      searchQuery === '' || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.stocks.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(news => !showWatchlistOnly || news.stocks.some(s => watchlistNews.includes(s)))

  return (
    <div className="news">
      <div className="dashboard-header">
        <h1>📰 Market News</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <button 
            className={`btn ${showWatchlistOnly ? 'btn-primary' : ''}`}
            onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
            style={{ background: showWatchlistOnly ? 'var(--accent-blue)' : 'var(--bg-tertiary)' }}
          >
            <Bell size={14} style={{ marginRight: 6 }} />
            My Stocks
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div className="search-bar" style={{ width: 300 }}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search news..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn"
              style={{ 
                padding: '8px 14px',
                background: selectedCategory === cat ? 'var(--accent-blue)' : 'var(--bg-tertiary)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured News */}
      <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid var(--accent-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span className="tag" style={{ background: 'var(--accent-blue)', color: 'white' }}>FEATURED</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{newsData[0].time}</span>
        </div>
        <h2 style={{ fontSize: '1.3rem', marginBottom: 8 }}>{newsData[0].title}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>{newsData[0].summary}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {newsData[0].stocks.map(stock => (
              <span key={stock} className="stock-code">{stock}</span>
            ))}
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Source: {newsData[0].source}</span>
        </div>
      </div>

      {/* News Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {filteredNews.slice(1).map(news => (
          <div key={news.id} className="card" style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)' }}>{news.category}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{news.time}</span>
            </div>
            <h3 style={{ fontSize: '1rem', marginBottom: 8, lineHeight: 1.4 }}>{news.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {news.summary}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {news.stocks.map(stock => (
                  <span 
                    key={stock} 
                    className="stock-code" 
                    style={{ fontSize: '0.75rem', padding: '2px 6px', background: 'var(--bg-tertiary)', borderRadius: 4 }}
                  >
                    {stock}
                  </span>
                ))}
              </div>
              <span className={`tag tag-${news.sentiment}`}>{news.sentiment}</span>
            </div>
            <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Source: {news.source}
            </div>
          </div>
        ))}
      </div>

      {/* Economic Calendar */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <h3 className="card-title"><Calendar size={18} /> Economic Calendar</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Impact</th>
                <th>Forecast</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mar 3</td>
                <td>Indonesia CPI (YoY)</td>
                <td><span className="tag tag-buy">High</span></td>
                <td>2.8%</td>
              </tr>
              <tr>
                <td>Mar 5</td>
                <td>BI Rate Decision</td>
                <td><span className="tag tag-buy">High</span></td>
                <td>6.0% (steady)</td>
              </tr>
              <tr>
                <td>Mar 7</td>
                <td>Exports (MoM)</td>
                <td><span className="tag tag-hold">Medium</span></td>
                <td>2.5%</td>
              </tr>
              <tr>
                <td>Mar 10</td>
                <td>Trade Balance</td>
                <td><span className="tag tag-hold">Medium</span></td>
                <td>$2.1B surplus</td>
              </tr>
              <tr>
                <td>Mar 15</td>
                <td>GDP Growth (YoY)</td>
                <td><span className="tag tag-buy">High</span></td>
                <td>5.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default News
