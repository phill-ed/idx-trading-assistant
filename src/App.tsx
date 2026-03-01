import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import StockMonitor from './components/StockMonitor'
import TechnicalAnalysis from './components/TechnicalAnalysis'
import Advisory from './components/Advisory'
import Portfolio from './components/Portfolio'
import News from './components/News'
import { LayoutDashboard, LineChart, Brain, Briefcase, Newspaper, Search } from 'lucide-react'

type Tab = 'dashboard' | 'monitor' | 'analysis' | 'advisory' | 'portfolio' | 'news'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'monitor', label: 'Monitor', icon: Search },
    { id: 'analysis', label: 'Analysis', icon: LineChart },
    { id: 'advisory', label: 'AI Advisory', icon: Brain },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'news', label: 'News', icon: Newspaper },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'monitor': return <StockMonitor searchQuery={searchQuery} />;
      case 'analysis': return <TechnicalAnalysis />;
      case 'advisory': return <Advisory />;
      case 'portfolio': return <Portfolio />;
      case 'news': return <News />;
      default: return <Dashboard />;
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">📈</span>
          <span className="logo-text">IDX Trading Assistant</span>
        </div>
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search stock (e.g., BBCA, TLKM)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="main-container">
        <nav className="sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as Tab)}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <main className="content">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
