import CivicChainDashboard from "@/components/civic-chain-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl mb-4">
            CivicChain
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-2">
            "Decentralized governance for the digital age"
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Blockchain Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Smart Contracts Active</span>
            </div>
          </div>
        </header>
        <CivicChainDashboard />
      </div>
    </main>
  )
}
