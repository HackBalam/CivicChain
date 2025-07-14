"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Hand, Coins, ShieldCheck, X, Wallet, Zap, Globe, Users, BookOpen, Building2 } from "lucide-react"

type ModalType = "fines" | "ngo" | "academy" | "garage" | "hall" | null

const buildings = [
  {
    id: "fines",
    name: "Smart Fines Hub",
    icon: Building2,
    description: "AI-powered fine management",
    top: { desktop: "20%", mobile: "25%" },
    left: { desktop: "85%", mobile: "80%" },
    color: "from-orange-500 to-red-500",
  },
  {
    id: "ngo",
    name: "DAO Community",
    icon: Users,
    description: "Decentralized governance",
    top: { desktop: "25%", mobile: "30%" },
    left: { desktop: "15%", mobile: "20%" },
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "academy",
    name: "Legal AI Oracle",
    icon: BookOpen,
    description: "Blockchain-verified legal advice",
    top: { desktop: "15%", mobile: "20%" },
    left: { desktop: "50%", mobile: "50%" },
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "garage",
    name: "Digital Wallet",
    icon: Wallet,
    description: "Your Web3 identity",
    top: { desktop: "75%", mobile: "70%" },
    left: { desktop: "20%", mobile: "25%" },
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "hall",
    name: "Governance Portal",
    icon: Globe,
    description: "Transparent voting system",
    top: { desktop: "70%", mobile: "65%" },
    left: { desktop: "80%", mobile: "75%" },
    color: "from-indigo-500 to-purple-500",
  },
]

const Fireworks = ({ particles = 20 }: { particles?: number }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
    {Array.from({ length: particles }).map((_, i) => {
      const angle = (i / particles) * 360
      const distance = 30 + Math.random() * 20
      const colors = ["bg-cyan-400", "bg-purple-400", "bg-pink-400", "bg-green-400", "bg-yellow-400"]
      const color = colors[Math.floor(Math.random() * colors.length)]
      return (
        <div
          key={i}
          className={`absolute w-2 h-2 ${color} rounded-full animate-fireworks-burst shadow-lg`}
          style={{
            transform: `rotate(${angle}deg) translateX(${distance}px) rotate(-${angle}deg)`,
            animationDelay: `${Math.random() * 0.3}s`,
            boxShadow: `0 0 10px currentColor`,
          }}
        />
      )
    })}
  </div>
)

const RaisedHands = () => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex pointer-events-none z-10">
    {Array.from({ length: 7 }).map((_, i) => (
      <div
        key={i}
        style={{
          animationDelay: `${i * 0.1}s`,
          transform: `translateX(${(i - 3) * 12}px)`,
        }}
        className="animate-raise-hand opacity-0"
      >
        <div className="w-8 h-8 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
          ✋
        </div>
      </div>
    ))}
  </div>
)

const FinesOffice = ({
  paidFineId,
  setPaidFineId,
}: { paidFineId: string | null; setPaidFineId: (id: string | null) => void }) => {
  const fines = [
    {
      id: "fine-1",
      title: "Speed Violation",
      location: "Smart Highway A1, Block #47291",
      amount: 0.15,
      discount: 0,
      hash: "0x7f8a...3b2c",
    },
    {
      id: "fine-2",
      title: "Parking Violation",
      location: "DeFi Plaza, Block #47285",
      amount: 0.08,
      discount: 0.2,
      hash: "0x9e4d...7a1f",
    },
  ]

  const handlePay = (fineId: string) => {
    setPaidFineId(fineId)
    setTimeout(() => setPaidFineId(null), 3000)
  }

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent flex items-center gap-3">
          <Building2 className="w-8 h-8 text-orange-400" />
          Smart Fines Hub
        </DialogTitle>
        <p className="text-gray-400 text-sm">AI-powered violation management on blockchain</p>
      </DialogHeader>

      <div className="space-y-4">
        {fines.map((fine) => (
          <Card
            key={fine.id}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl relative overflow-hidden group hover:border-orange-500/50 transition-all duration-300"
          >
            {paidFineId === fine.id && <Fireworks />}
            {fine.discount > 0 && (
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-0 shadow-lg">
                <Zap className="w-3 h-3 mr-1" />
                {Math.round(fine.discount * 100)}% Early Pay
              </Badge>
            )}
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white mb-1">{fine.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{fine.location}</p>
                  <p className="text-xs text-gray-500 font-mono">Hash: {fine.hash}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {fine.discount > 0 ? (
                      <>
                        <span className="line-through text-gray-500 text-lg">{fine.amount} ETH</span>
                        <br />
                        <span className="text-green-400">{(fine.amount * (1 - fine.discount)).toFixed(3)} ETH</span>
                      </>
                    ) : (
                      <span className="text-red-400">{fine.amount} ETH</span>
                    )}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handlePay(fine.id)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Wallet className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Pay with Stellar
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const CommunityNGO = ({
  supportedProjectId,
  setSupportedProjectId,
}: { supportedProjectId: string | null; setSupportedProjectId: (id: string | null) => void }) => {
  const project = {
    id: "project-1",
    title: "Green Infrastructure DAO",
    progress: 75,
    goal: 1000,
    funding: "2.5 ETH",
    voters: 847,
  }

  const handleSupport = (projectId: string) => {
    setSupportedProjectId(projectId)
    setTimeout(() => setSupportedProjectId(null), 2000)
  }

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-3">
          <Users className="w-8 h-8 text-green-400" />
          DAO Community
        </DialogTitle>
        <p className="text-gray-400 text-sm">Decentralized autonomous organization for city improvements</p>
      </DialogHeader>

      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl relative overflow-hidden hover:border-green-500/50 transition-all duration-300">
        {supportedProjectId === project.id && <RaisedHands />}
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-white">{project.title}</h3>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">Active</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-2xl font-bold text-green-400">{project.funding}</p>
              <p className="text-gray-400 text-sm">Total Funding</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-2xl font-bold text-blue-400">{project.voters}</p>
              <p className="text-gray-400 text-sm">DAO Members</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Consensus Progress</span>
              <span className="text-white font-bold">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-3 bg-gray-700 border border-gray-600" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>
                {project.progress * 10}/{project.goal} votes
              </span>
              <span>Quorum: 75%</span>
            </div>
          </div>

          <Button
            onClick={() => handleSupport(project.id)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Hand className="mr-2 h-4 w-4 group-hover:animate-bounce" />
            Vote & Stake
            <Coins className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

const RoadAcademy = () => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "🤖 Welcome to Legal AI Oracle! I'm powered by blockchain-verified legal data. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    const newMessages = [...messages, { from: "user", text: input }]
    setMessages(newMessages)
    setIsTyping(true)

    setTimeout(() => {
      newMessages.push({
        from: "bot",
        text: "⚖️ Based on smart contract analysis and legal precedent data, Article 75 grants you appeal rights within 15 days. Transaction hash: 0x4f7a...9e2d",
      })
      setMessages([...newMessages])
      setIsTyping(false)
    }, 1500)

    setInput("")
  }

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-400" />
          Legal AI Oracle
        </DialogTitle>
        <p className="text-gray-400 text-sm">Blockchain-verified legal assistance powered by AI</p>
      </DialogHeader>

      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl">
        <CardContent className="p-0">
          <div className="h-80 bg-black/20 border-b border-gray-700">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.from === "bot"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      } shadow-lg`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about legal rights, violations, or procedures..."
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6"
              >
                <Zap className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                Appeal Process
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                Smart Contract Rights
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const MyGarage = () => {
  const [walletConnected, setWalletConnected] = useState(true)

  return (
    <div className="space-y-6">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
              <Wallet className="w-8 h-8 text-purple-400" />
              Digital Wallet
            </DialogTitle>
            <p className="text-gray-400 text-sm">Your Web3 civic identity</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Connected</span>
          </div>
        </div>
      </DialogHeader>

      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Citizen_0x7f8a</h3>
              <p className="text-gray-400 text-sm font-mono">0x7f8a...3b2c</p>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white mt-1">Verified Citizen</Badge>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-2xl font-bold text-purple-400">2.5</p>
              <p className="text-gray-400 text-xs">ETH Balance</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-2xl font-bold text-blue-400">847</p>
              <p className="text-gray-400 text-xs">Civic Score</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-2xl font-bold text-green-400">12</p>
              <p className="text-gray-400 text-xs">DAO Votes</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Transaction History</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-2xl mb-2">
                  🚗
                </div>
                <p className="text-xs text-red-400">Pending</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-2xl mb-2">
                  ✅
                </div>
                <p className="text-xs text-green-400">Paid</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-2xl mb-2">
                  ⚡
                </div>
                <p className="text-xs text-blue-400">Discount</p>
              </div>
            </div>

            <h4 className="text-lg font-bold text-white mt-6">NFT Achievements</h4>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-2xl border-2 border-yellow-400/50 shadow-lg">
                🏆
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center text-2xl border-2 border-gray-400/50 shadow-lg">
                🛡️
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const CityHall = () => (
  <div className="space-y-6">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
        <Globe className="w-8 h-8 text-indigo-400" />
        Governance Portal
      </DialogTitle>
      <p className="text-gray-400 text-sm">Transparent blockchain-based voting system</p>
    </DialogHeader>

    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl hover:border-indigo-500/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white">Proposal #2024-001</CardTitle>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">Active</Badge>
        </div>
        <p className="text-gray-400">Smart Bike Lane Infrastructure</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-2xl font-bold text-green-400">1,247</p>
            <p className="text-gray-400 text-sm">For Votes</p>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-2xl font-bold text-red-400">423</p>
            <p className="text-gray-400 text-sm">Against Votes</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Voting Progress</span>
            <span className="text-white font-bold">74.6% For</span>
          </div>
          <Progress value={74.6} className="h-3 bg-gray-700 border border-gray-600" />
          <p className="text-xs text-gray-500">Ends in 2 days, 14 hours</p>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Vote For
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 shadow-lg">
            <X className="mr-2 h-4 w-4" />
            Vote Against
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">Gas fee: ~0.001 ETH • Voting power: 1 token = 1 vote</div>
      </CardContent>
    </Card>
  </div>
)

export default function CivicChainDashboard() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [paidFineId, setPaidFineId] = useState<string | null>(null)
  const [supportedProjectId, setSupportedProjectId] = useState<string | null>(null)

  const renderModalContent = () => {
    switch (activeModal) {
      case "fines":
        return <FinesOffice paidFineId={paidFineId} setPaidFineId={setPaidFineId} />
      case "ngo":
        return <CommunityNGO supportedProjectId={supportedProjectId} setSupportedProjectId={setSupportedProjectId} />
      case "academy":
        return <RoadAcademy />
      case "garage":
        return <MyGarage />
      case "hall":
        return <CityHall />
      default:
        return null
    }
  }

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main road with neon effect */}
      <div className="absolute top-1/2 left-0 w-full h-20 sm:h-24 md:h-28 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 transform -translate-y-1/2 border-y-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 transform -translate-y-1/2 animate-pulse"></div>

        {/* Animated road lines */}
        <div className="absolute top-1/2 left-0 w-full h-1 transform -translate-y-1/2 overflow-hidden">
          <div className="flex w-[200%] h-full animate-[scroll_4s_linear_infinite]">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="flex-1 flex">
                <div className="w-1/2 h-full bg-white/80"></div>
                <div className="w-1/2 h-full bg-transparent"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated vehicle */}
      <div className="absolute top-1/2 transform -translate-y-1/2 animate-drive">
        <div className="text-4xl sm:text-5xl md:text-6xl filter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">🚗</div>
      </div>

      {/* Buildings with modern design */}
      {buildings.map((building) => {
        const IconComponent = building.icon
        return (
          <button
            key={building.id}
            onClick={() => setActiveModal(building.id as ModalType)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none group touch-manipulation z-10"
            style={{
              top:
                typeof window !== "undefined" && window.innerWidth < 768 ? building.top.mobile : building.top.desktop,
              left:
                typeof window !== "undefined" && window.innerWidth < 768 ? building.left.mobile : building.left.desktop,
            }}
          >
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br ${building.color} rounded-2xl border-2 border-white/20 shadow-2xl flex items-center justify-center backdrop-blur-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 animate-float`}
            >
              <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
            </div>
            <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 w-max px-3 py-2 bg-black/80 backdrop-blur-sm text-white text-xs sm:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gray-600 shadow-xl">
              <p className="font-bold">{building.name}</p>
              <p className="text-gray-300 text-xs">{building.description}</p>
            </div>
          </button>
        )
      })}

      <Dialog open={activeModal !== null} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 shadow-2xl text-white font-sans w-[95vw] max-w-4xl p-0 max-h-[90vh] overflow-hidden rounded-2xl">
          <div className="p-6 overflow-y-auto max-h-[80vh]">{renderModalContent()}</div>
          <Button
            onClick={() => setActiveModal(null)}
            variant="ghost"
            className="absolute top-4 right-4 h-10 w-10 p-0 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-full backdrop-blur-sm"
          >
            <X className="h-5 w-5 text-red-400" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes drive {
          0% { right: -80px; }
          100% { right: calc(100% + 80px); }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-drive {
          animation: drive 10s linear infinite;
        }
      `}</style>
    </div>
  )
}
