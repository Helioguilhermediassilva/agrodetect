// Integração Avançada com Base de Conhecimento Científico
// Versão 4.0 - CORREÇÃO DEFINITIVA DA PÁGINA EM BRANCO
// Arquivo renomeado para forçar deploy correto no Vercel
import { 
  analyzeImageForPests, 
  analyzeFileName, 
  generatePestRecommendations,
  SUGARCANE_PESTS 
} from './pest-knowledge-base.js'

// Configuração da API Roboflow - v4.1 (Endpoint Correto)
const ROBOFLOW_CONFIG = {
  apiKey: 'JHigx9j2jdiEVdRLWWX6',
  modelEndpoint: 'https://detect.roboflow.com/cla-pqr9j/2',
  confidence: 0.5,
  overlap: 0.5
}

/**
 * Detecta pragas usando abordagem híbrida científica + Roboflow API
 * VERSÃO 4.0 - CORREÇÃO DEFINITIVA + INTEGRAÇÃO ROBOFLOW
 */
export async function detectPest(imageFile) {
  console.log('🔬 Iniciando detecção científica avançada v4.0...')
  console.log('📋 Arquivo de entrada:', imageFile.name, imageFile.size, 'bytes')
  
  try {
    // Análise do nome do arquivo
    const fileAnalysis = analyzeFileName(imageFile.name)
    console.log('📁 Análise do arquivo:', fileAnalysis)
    
    // Converte imagem para análise
    const canvas = await imageToCanvas(imageFile)
    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
    
    // 1. NOVA: Chamada para API Roboflow
    console.log('🤖 Iniciando detecção com Roboflow API...')
    const roboflowDetection = await callRoboflowAPI(imageFile)
    console.log('🤖 Resultado Roboflow:', roboflowDetection)
    
    // 2. Análise científica local (backup)
    const scientificDetection = analyzeImageForPests(imageData, canvas)
    console.log('🧬 Detecção científica local:', scientificDetection)
    
    // Combina resultados priorizando Roboflow
    const finalResult = combineDetectionResults(
      roboflowDetection,
      scientificDetection,
      fileAnalysis,
      canvas.width,
      canvas.height
    )
    
    console.log('✅ Resultado final v4.0:', finalResult)
    
    // Validação final do resultado
    if (!finalResult || typeof finalResult !== 'object') {
      throw new Error('Resultado inválido gerado pela análise')
    }
    
    if (!finalResult.pestName || !finalResult.recommendations) {
      throw new Error('Propriedades obrigatórias ausentes no resultado')
    }
    
    // Validação adicional das recomendações
    if (!Array.isArray(finalResult.recommendations) || finalResult.recommendations.length === 0) {
      throw new Error('Recomendações inválidas ou ausentes')
    }
    
    console.log('🎯 Validação completa aprovada - retornando resultado')
    return finalResult
    
  } catch (error) {
    console.error('❌ Erro na detecção v4.0:', error)
    console.error('Stack trace:', error.stack)
    
    // Retorna resultado de fallback seguro
    const fallbackResult = {
      pestName: 'Erro na Análise',
      scientificName: 'Análise não concluída',
      description: 'Ocorreu um erro durante a análise. Tente novamente.',
      confidence: 0,
      infestationLevel: 'Desconhecida',
      boundingBox: null,
      recommendations: [
        {
          type: 'Recomendação Geral',
          description: 'Consulte um especialista para análise manual da imagem.',
          products: ['Análise manual', 'Consulta especializada']
        }
      ],
      isIntelligentAnalysis: false,
      analysisMethod: 'Fallback de Erro v4.0',
      allPredictions: [],
      error: error.message,
      version: '4.0-fallback'
    }
    
    console.log('🔄 Retornando resultado de fallback:', fallbackResult)
    return fallbackResult
  }
}

/**
 * Converte arquivo de imagem para canvas
 */
async function imageToCanvas(imageFile) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      resolve(canvas)
    }
    
    img.onerror = () => reject(new Error('Falha ao carregar imagem'))
    
    img.src = URL.createObjectURL(imageFile)
  })
}

/**
 * Chama a API do Roboflow para detecção de pragas
 */
async function callRoboflowAPI(imageFile) {
  try {
    console.log('🤖 Preparando chamada para Roboflow API v4.3...')
    
    console.log('🌐 Enviando requisição para:', ROBOFLOW_CONFIG.modelEndpoint)
    console.log('📊 Tamanho do arquivo:', imageFile.size, 'bytes')
    
    // Formato correto para Roboflow API usando FormData
    const formData = new FormData()
    formData.append('file', imageFile)
    
    // URL com parâmetros de configuração
    const url = `${ROBOFLOW_CONFIG.modelEndpoint}?api_key=${ROBOFLOW_CONFIG.apiKey}&confidence=${ROBOFLOW_CONFIG.confidence}&overlap=${ROBOFLOW_CONFIG.overlap}`
    
    console.log('📡 URL completa:', url)
    
    // Faz chamada para API com formato FormData
    const response = await fetch(url, {
      method: 'POST',
      body: formData
      // Não definir Content-Type - deixar o browser definir automaticamente para FormData
    })
    
    console.log('📡 Status da resposta:', response.status, response.statusText)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erro detalhado:', errorText)
      
      // Se ainda der erro, tenta formato alternativo com base64
      console.log('🔄 Tentando formato alternativo com base64...')
      return await callRoboflowAPIBase64(imageFile)
    }
    
    const result = await response.json()
    console.log('📊 Resposta bruta da API:', result)
    console.log('✅ Chamada Roboflow bem-sucedida!')
    
    // Processa resultado da API
    return processRoboflowResponse(result)
    
  } catch (error) {
    console.error('❌ Erro na chamada Roboflow:', error)
    console.log('🔄 Continuando com análise local...')
    return [] // Retorna array vazio para continuar com análise local
  }
}

/**
 * Formato alternativo usando base64 (fallback)
 */
async function callRoboflowAPIBase64(imageFile) {
  try {
    console.log('🔄 Tentando formato base64 alternativo...')
    
    // Converte para base64
    const base64Image = await fileToBase64(imageFile)
    
    const url = `${ROBOFLOW_CONFIG.modelEndpoint}?api_key=${ROBOFLOW_CONFIG.apiKey}&confidence=${ROBOFLOW_CONFIG.confidence}&overlap=${ROBOFLOW_CONFIG.overlap}`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: base64Image
    })
    
    console.log('📡 Status resposta base64:', response.status, response.statusText)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erro formato base64:', errorText)
      throw new Error(`Erro HTTP base64: ${response.status}`)
    }
    
    const result = await response.json()
    console.log('✅ Sucesso com formato base64!')
    return processRoboflowResponse(result)
    
  } catch (error) {
    console.error('❌ Erro formato base64:', error)
    return []
  }
}

/**
 * Processa resposta da API Roboflow
 */
function processRoboflowResponse(apiResponse) {
  console.log('🔄 Processando resposta do Roboflow...')
  
  if (!apiResponse || !apiResponse.predictions || !Array.isArray(apiResponse.predictions)) {
    console.log('⚠️ Resposta inválida ou sem predições')
    return []
  }
  
  const detections = apiResponse.predictions.map((prediction, index) => {
    console.log(`🔍 Processando predição ${index + 1}:`, prediction)
    
    // Mapeia classes do Roboflow para IDs conhecidos
    const pestId = mapRoboflowClassToPestId(prediction.class)
    const pestData = SUGARCANE_PESTS[pestId] || {
      name: prediction.class,
      scientificName: `${prediction.class} (Roboflow)`,
      characteristics: { habitat: ['cana-de-açúcar'] }
    }
    
    return {
      id: pestId,
      name: pestData.name,
      scientificName: pestData.scientificName,
      confidence: prediction.confidence,
      boundingBox: {
        x: prediction.x - prediction.width / 2,
        y: prediction.y - prediction.height / 2,
        width: prediction.width,
        height: prediction.height
      },
      characteristics: pestData.characteristics,
      source: 'roboflow',
      rawPrediction: prediction
    }
  })
  
  console.log(`✅ Processadas ${detections.length} detecções do Roboflow`)
  return detections
}

/**
 * Mapeia classes do Roboflow para IDs de pragas conhecidas
 */
function mapRoboflowClassToPestId(roboflowClass) {
  const classMapping = {
    'broca-da-cana': 'broca-da-cana',
    'broca_da_cana': 'broca-da-cana',
    'diatraea': 'broca-da-cana',
    'cigarrinha': 'cigarrinha-das-raizes',
    'cigarrinha-das-raizes': 'cigarrinha-das-raizes',
    'mahanarva': 'cigarrinha-das-raizes',
    'migdolus': 'migdolus',
    'mosca-branca': 'mosca-branca',
    'bemisia': 'mosca-branca',
    'whitefly': 'mosca-branca'
  }
  
  const normalizedClass = roboflowClass.toLowerCase().replace(/[^a-z-]/g, '-')
  return classMapping[normalizedClass] || 'unknown'
}

/**
 * Converte arquivo para base64
 */
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      // Remove o prefixo "data:image/...;base64," e retorna apenas o base64
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Combina resultados de detecção priorizando Roboflow API
 */
function combineDetectionResults(roboflowDetection, scientificDetection, fileAnalysis, width, height) {
  console.log('🔄 Combinando resultados de detecção...')
  
  // Prioriza Roboflow, depois detecção científica, depois análise de arquivo
  let detections = []
  let analysisMethod = 'IA Local'
  
  if (roboflowDetection && roboflowDetection.length > 0) {
    detections = roboflowDetection
    analysisMethod = 'Roboflow API'
    console.log('🤖 Usando detecção Roboflow como primária')
  } else if (scientificDetection && scientificDetection.length > 0) {
    detections = scientificDetection
    analysisMethod = 'IA Local'
    console.log('📊 Usando detecção científica como primária')
  } else if (fileAnalysis && fileAnalysis.pestId) {
    // Converte análise de arquivo para formato de detecção
    const pestData = SUGARCANE_PESTS[fileAnalysis.pestId]
    if (pestData) {
      detections = [{
        id: fileAnalysis.pestId,
        name: pestData.name,
        scientificName: pestData.scientificName,
        confidence: fileAnalysis.confidence,
        boundingBox: generateCenterBoundingBox(width, height),
        characteristics: pestData.characteristics,
        source: 'filename'
      }]
      analysisMethod = 'Análise de Nome do Arquivo'
      console.log('📁 Usando análise de arquivo como primária')
    }
  }
  
  // Se não há detecções, gera detecção padrão
  if (detections.length === 0) {
    detections = [generateFallbackDetection(width, height)]
    analysisMethod = 'Fallback Local'
    console.log('🔄 Usando detecção de fallback')
  }  
  // Processa primeira detecção
  const primaryDetection = detections[0]
  const recommendations = generatePestRecommendations(primaryDetection.id)
  
  const finalResult = {
    // Estrutura compatível com ImageUpload.jsx
    pestName: primaryDetection.name,
    scientificName: primaryDetection.scientificName,
    description: `${primaryDetection.scientificName} - ${primaryDetection.characteristics?.habitat?.join(', ') || 'Praga de cana-de-açúcar'}`,
    confidence: primaryDetection.confidence,
    infestationLevel: primaryDetection.confidence > 0.8 ? 'Alta' : primaryDetection.confidence > 0.6 ? 'Média' : 'Baixa',
    boundingBox: primaryDetection.boundingBox,
    recommendations: recommendations,
    isIntelligentAnalysis: true,
    analysisMethod: analysisMethod,
    allPredictions: detections,
    
    // Dados adicionais para compatibilidade
    pest: {
      name: primaryDetection.name,
      scientificName: primaryDetection.scientificName,
      confidence: Math.round(primaryDetection.confidence * 100),
      characteristics: primaryDetection.characteristics
    },
    detectionCount: detections.length,
    allDetections: detections,
    metadata: {
      imageSize: { width, height },
      processingTime: Date.now(),
      version: '4.0-fixed'
    }
  }
  
  console.log('🎯 Resultado final estruturado v4.0:', finalResult)
  console.log('📊 Propriedades do resultado:', Object.keys(finalResult))
  console.log('🔍 Tipo de recomendações:', typeof finalResult.recommendations, Array.isArray(finalResult.recommendations))
  
  return finalResult
}

/**
 * Gera detecção de fallback
 */
function generateFallbackDetection(width, height) {
  return {
    id: 'unknown',
    name: 'Praga Não Identificada',
    scientificName: 'Espécie não determinada',
    confidence: 0.5,
    boundingBox: generateCenterBoundingBox(width, height),
    characteristics: {
      habitat: ['cana-de-açúcar'],
      damage: ['Danos não especificados'],
      lifecycle: ['Ciclo não determinado']
    },
    source: 'fallback'
  }
}

/**
 * Gera bounding box centralizado
 */
function generateCenterBoundingBox(width, height) {
  const boxWidth = Math.min(width * 0.3, 150)
  const boxHeight = Math.min(height * 0.3, 100)
  
  return {
    x: (width - boxWidth) / 2,
    y: (height - boxHeight) / 2,
    width: boxWidth,
    height: boxHeight
  }
}

