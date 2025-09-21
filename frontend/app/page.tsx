'use client'

import { useState } from 'react'

export default function Home() {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<any>(null)

  const runSalesAgent = async () => {
    setIsRunning(true)
    setResults(null)
    
    try {
      const response = await fetch('http://localhost:3000/run-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error running sales agent:', error)
      setResults({ error: 'Failed to connect to backend' })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800"></div>
      <div className="absolute inset-0 bg-[url('/bg.svg')] opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/15 rounded-full blur-xl animate-bounce-slow"></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full mb-6 animate-pulse-slow">
            <span className="text-4xl">🤖</span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
            AI Sales Agent
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Transform your sales process with intelligent lead qualification and personalized outreach generation
          </p>
        </div>

        {/* Main Action Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="card rounded-3xl p-8 border-0">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                🚀 Sales Pipeline Engine
              </h2>
              <p className="text-gray-600 text-lg">
                One click to qualify leads and generate personalized outreach
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={runSalesAgent}
                disabled={isRunning}
                className={`relative px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 ${
                  isRunning 
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-purple-500/25'
                }`}
              >
                {isRunning ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Pipeline...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <span>🎯</span>
                    <span>Run AI Sales Pipeline</span>
                    <span>⚡</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-8 animate-fade-in">
            {/* Summary Cards */}
            {results.results?.summary && (
              <div className="card rounded-3xl p-8 border-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  📊 Pipeline Analytics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {[
                    { label: 'Total Leads', value: results.results.summary.totalProcessed, color: 'blue', icon: '👥' },
                    { label: 'Hot Leads', value: results.results.summary.hotLeads, color: 'red', icon: '🔥' },
                    { label: 'Warm Leads', value: results.results.summary.warmLeads, color: 'orange', icon: '🌡️' },
                    { label: 'Cold Leads', value: results.results.summary.coldLeads, color: 'gray', icon: '❄️' },
                    { label: 'Drafts Created', value: results.results.summary.outreachDraftsCreated, color: 'green', icon: '📝' }
                  ].map((stat, index) => (
                    <div key={index} className={`text-center p-6 rounded-2xl bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 border border-${stat.color}-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <div className={`text-3xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
                      <div className={`text-sm font-medium text-${stat.color}-700`}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lead Qualification Results */}
            {results.results?.qualificationResults && (
              <div className="card rounded-3xl p-8 border-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  🎯 Lead Qualification Results
                </h3>
                <div className="grid gap-6">
                  {results.results.qualificationResults.map((lead: any, index: number) => (
                    <div key={index} className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {lead.lead.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-bold text-xl text-gray-800">{lead.lead.name}</h4>
                            <p className="text-gray-600 font-medium">{lead.lead.title} at {lead.lead.company}</p>
                            <p className="text-sm text-gray-500">{lead.lead.industry} • {lead.lead.companySize} employees</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`px-4 py-2 rounded-full text-sm font-bold mb-2 ${
                            lead.status === 'Hot Lead' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' :
                            lead.status === 'Warm Lead' ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white' :
                            'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                          }`}>
                            {lead.status}
                          </div>
                          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {lead.score}/100
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {lead.reasons.map((reason: string, reasonIndex: number) => (
                          <span key={reasonIndex} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm rounded-full font-medium border border-blue-200">
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outreach Drafts */}
            {results.results?.outreachDrafts && (
              <div className="card rounded-3xl p-8 border-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  📝 Generated Outreach Messages
                </h3>
                <div className="space-y-8">
                  {results.results.outreachDrafts.map((draft: any, index: number) => (
                    <div key={index} className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {draft.lead.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-bold text-xl text-gray-800">{draft.lead.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            draft.status === 'Hot Lead' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' :
                            'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                          }`}>
                            {draft.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Email Draft */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="text-2xl">📧</span>
                            <h5 className="font-bold text-lg text-gray-800">Email Outreach</h5>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono leading-relaxed text-gray-700 border">
                            {draft.email}
                          </div>
                        </div>
                        
                        {/* LinkedIn Draft */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="text-2xl">💼</span>
                            <h5 className="font-bold text-lg text-gray-800">LinkedIn Message</h5>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono leading-relaxed text-gray-700 border">
                            {draft.linkedin}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Display */}
            {results.error && (
              <div className="card rounded-3xl p-8 border-0 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">❌</span>
                  <div>
                    <h3 className="text-red-800 font-bold text-xl">Connection Error</h3>
                    <p className="text-red-600 mt-1">{results.error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
