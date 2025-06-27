import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Camera, Upload, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export function ImageUpload({ onImageAnalyzed }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [error, setError] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (file) => {
    if (!file) return

    // Validar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Formato de arquivo não suportado. Use JPG, PNG ou WebP.')
      return
    }

    // Validar tamanho (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 10MB.')
      return
    }

    setError(null)
    setSelectedImage(file)
    
    // Criar preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    handleFileSelect(file)
  }

  const clearImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setAnalysisResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setError(null)

    try {
      // Simular análise da API do Roboflow
      // Em produção, aqui seria feita a chamada real para a API
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Resultado simulado
      const mockResult = {
        pestName: 'Lagarta-do-cartucho',
        confidence: 0.87,
        infestationLevel: 'Moderada',
        description: 'Spodoptera frugiperda - Uma das principais pragas do milho',
        recommendations: [
          {
            type: 'Controle Biológico',
            products: ['Bacillus thuringiensis', 'Trichogramma pretiosum'],
            description: 'Uso de inimigos naturais para controle sustentável'
          },
          {
            type: 'Controle Químico',
            products: ['Clorantraniliprole', 'Flubendiamide'],
            description: 'Aplicação de inseticidas específicos quando necessário'
          },
          {
            type: 'Manejo Integrado',
            products: ['Rotação de culturas', 'Plantas armadilha'],
            description: 'Práticas preventivas para reduzir infestação'
          }
        ]
      }

      setAnalysisResult(mockResult)
      if (onImageAnalyzed) {
        onImageAnalyzed(mockResult)
      }
    } catch (err) {
      setError('Erro ao analisar a imagem. Tente novamente.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (analysisResult) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Resultado da Análise</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={clearImage}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4 mr-1" />
                Nova Análise
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={imagePreview}
                  alt="Imagem analisada"
                  className="w-full h-64 object-cover rounded-lg border"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Praga Identificada</h4>
                  <p className="text-xl font-bold text-green-600">{analysisResult.pestName}</p>
                  <p className="text-sm text-gray-600 mt-1">{analysisResult.description}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-sm text-gray-600">Confiança:</span>
                    <Badge variant="secondary" className="ml-2">
                      {Math.round(analysisResult.confidence * 100)}%
                    </Badge>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Infestação:</span>
                    <Badge 
                      variant={analysisResult.infestationLevel === 'Alta' ? 'destructive' : 'secondary'}
                      className="ml-2"
                    >
                      {analysisResult.infestationLevel}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendações de Controle</h3>
            <div className="space-y-4">
              {analysisResult.recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{rec.type}</h4>
                  <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.products.map((product, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8">
        {!selectedImage ? (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragOver
                ? 'border-green-400 bg-green-50'
                : 'border-green-300 hover:border-green-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Camera className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Envie sua imagem
            </h3>
            <p className="text-gray-600 mb-4">
              Arraste e solte ou clique para selecionar
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-green-600 hover:bg-green-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              Selecionar Arquivo
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <p className="text-sm text-gray-500 mt-4">
              Formatos aceitos: JPG, PNG, WebP (máx. 10MB)
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={clearImage}
                className="absolute top-2 right-2 bg-white/90 hover:bg-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Imagem carregada com sucesso! Clique em analisar para identificar a praga.
              </p>
              <Button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="bg-green-600 hover:bg-green-700"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Analisar Imagem
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

