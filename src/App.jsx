import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Leaf, Camera, Brain, Shield, History, Phone, Download, Calendar } from 'lucide-react'
import { ImageUpload } from './components/ImageUpload.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [analysisHistory, setAnalysisHistory] = useState([])

  // Carregar histórico do localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('pestAnalysisHistory')
    if (savedHistory) {
      setAnalysisHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleImageAnalyzed = (result) => {
    const newAnalysis = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...result
    }
    
    const updatedHistory = [newAnalysis, ...analysisHistory]
    setAnalysisHistory(updatedHistory)
    localStorage.setItem('pestAnalysisHistory', JSON.stringify(updatedHistory))
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />
      case 'upload':
        return <UploadPage setCurrentPage={setCurrentPage} onImageAnalyzed={handleImageAnalyzed} />
      case 'history':
        return <HistoryPage setCurrentPage={setCurrentPage} analysisHistory={analysisHistory} />
      case 'contact':
        return <ContactPage setCurrentPage={setCurrentPage} />
      default:
        return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  )
}

function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">AgroDetect</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setCurrentPage('upload')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'upload'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Identificar Praga
            </button>
            <button
              onClick={() => setCurrentPage('history')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'history'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Histórico
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'contact'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Contato
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

function HomePage({ setCurrentPage }) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Identificação Inteligente de Pragas e{' '}
          <span className="text-green-600">Recomendação Automática</span>{' '}
          de Controle com Visão Computacional
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Potencialize sua lavoura com inteligência artificial: detecte pragas e aja rápido.
        </p>
        <Button
          onClick={() => setCurrentPage('upload')}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Camera className="mr-2 h-5 w-5" />
          Identificar Praga
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="border-green-100 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Camera className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">Upload Simples</CardTitle>
            <CardDescription>
              Envie uma foto da praga encontrada na sua lavoura de forma rápida e fácil
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-green-100 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">IA Avançada</CardTitle>
            <CardDescription>
              Tecnologia de visão computacional para identificação precisa e confiável
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-green-100 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">Recomendações</CardTitle>
            <CardDescription>
              Receba orientações automáticas de controle e manejo integrado de pragas
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* How it Works Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Como Funciona
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fotografe</h3>
            <p className="text-gray-600 text-sm">Tire uma foto clara da praga na sua plantação</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Envie</h3>
            <p className="text-gray-600 text-sm">Faça upload da imagem em nossa plataforma</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Analise</h3>
            <p className="text-gray-600 text-sm">Nossa IA identifica a praga automaticamente</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">4</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Aja</h3>
            <p className="text-gray-600 text-sm">Receba recomendações de controle personalizadas</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function UploadPage({ setCurrentPage, onImageAnalyzed }) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Identificar Praga
        </h1>
        <p className="text-gray-600">
          Envie uma foto da praga para análise automática
        </p>
      </div>
      
      <ImageUpload onImageAnalyzed={onImageAnalyzed} />
    </main>
  )
}

function HistoryPage({ setCurrentPage, analysisHistory }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const downloadReport = (analysis) => {
    const reportContent = `
RELATÓRIO DE ANÁLISE DE PRAGA - AGRODETECT

Data da Análise: ${formatDate(analysis.date)}
Praga Identificada: ${analysis.pestName}
Descrição: ${analysis.description}
Nível de Confiança: ${Math.round(analysis.confidence * 100)}%
Nível de Infestação: ${analysis.infestationLevel}

RECOMENDAÇÕES DE CONTROLE:

${analysis.recommendations.map((rec, index) => `
${index + 1}. ${rec.type}
   Descrição: ${rec.description}
   Produtos recomendados: ${rec.products.join(', ')}
`).join('')}

---
Relatório gerado pelo AgroDetect
Sistema de Identificação Inteligente de Pragas
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `relatorio-praga-${analysis.pestName.replace(/\s+/g, '-').toLowerCase()}-${new Date(analysis.date).toISOString().split('T')[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Histórico de Consultas
        </h1>
        <p className="text-gray-600">
          Acompanhe suas análises anteriores
        </p>
      </div>
      
      {analysisHistory.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma consulta ainda
            </h3>
            <p className="text-gray-600 mb-4">
              Suas análises de pragas aparecerão aqui
            </p>
            <Button 
              onClick={() => setCurrentPage('upload')}
              className="bg-green-600 hover:bg-green-700"
            >
              Fazer primeira análise
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              {analysisHistory.length} análise{analysisHistory.length !== 1 ? 's' : ''} encontrada{analysisHistory.length !== 1 ? 's' : ''}
            </p>
            <Button 
              onClick={() => setCurrentPage('upload')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Camera className="mr-2 h-4 w-4" />
              Nova Análise
            </Button>
          </div>

          <div className="grid gap-6">
            {analysisHistory.map((analysis) => (
              <Card key={analysis.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {analysis.pestName}
                      </h3>
                      <p className="text-gray-600 text-sm flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(analysis.date)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">
                        {Math.round(analysis.confidence * 100)}% confiança
                      </Badge>
                      <Badge 
                        variant={analysis.infestationLevel === 'Alta' ? 'destructive' : 'secondary'}
                      >
                        {analysis.infestationLevel}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{analysis.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Recomendações:</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      {analysis.recommendations.map((rec, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <h5 className="font-medium text-gray-900 text-sm mb-1">{rec.type}</h5>
                          <p className="text-gray-600 text-xs">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadReport(analysis)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Baixar Relatório
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

function ContactPage({ setCurrentPage }) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Contato e Suporte
        </h1>
        <p className="text-gray-600">
          Entre em contato conosco para dúvidas e suporte técnico
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Envie uma mensagem</CardTitle>
            <CardDescription>
              Preencha o formulário e entraremos em contato
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensagem
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Sua mensagem..."
              />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Enviar Mensagem
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
            <CardDescription>
              Outras formas de entrar em contato
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">+55 (11) 9999-9999</span>
            </div>
            <div className="flex items-center space-x-3">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">contato@agrodetect.com</span>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Horário de Atendimento</h4>
              <p className="text-gray-600 text-sm">
                Segunda a Sexta: 8h às 18h<br />
                Sábado: 8h às 12h
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-green-400" />
              <span className="text-lg font-bold">AgroDetect</span>
            </div>
            <p className="text-gray-400 text-sm">
              Tecnologia de ponta para identificação inteligente de pragas e proteção da sua lavoura.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Identificação de Pragas</li>
              <li>Recomendações</li>
              <li>Histórico</li>
              <li>Relatórios</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Central de Ajuda</li>
              <li>Contato</li>
              <li>Documentação</li>
              <li>Status do Sistema</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Sobre Nós</li>
              <li>Blog</li>
              <li>Carreiras</li>
              <li>Privacidade</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 AgroDetect. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default App

