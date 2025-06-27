// Integração Avançada com Base de Conhecimento Científico
// Versão 4.0 - CORREÇÃO DEFINITIVA DA PÁGINA EM BRANCO
// Arquivo renomeado para forçar deploy correto no Vercel
import { 
  analyzeImageForPests, 
  analyzeFileName, 
  generatePestRecommendations,
  SUGARCANE_PESTS 
} from './pest-knowledge-base.js'

// Configuração da API Roboflow - v4.6 (Modelo Otimizado para Pragas Agrícolas)
const ROBOFLOW_CONFIG = {
  apiKey: 'JHigx9j2jdiEVdRLWWX6',
  modelEndpoint: 'https://serverless.roboflow.com/agricultural-pests-detection/3',
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
    
    // 2. Análise científica local melhorada (backup)
    const scientificDetection = analyzeImageForPests(imageData, canvas, imageFile)
    console.log('🧬 Detecção científica local:', scientificDetection)
    
    // 3. Análise visual avançada (novo)
    const visualDetection = analyzeImageVisually(imageData, canvas, imageFile)
    console.log('👁️ Análise visual:', visualDetection)
    
    // Combina resultados priorizando Roboflow
    const finalResult = combineDetectionResults(
      roboflowDetection,
      scientificDetection,
      visualDetection,
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
    console.log('🤖 Preparando chamada para Roboflow API v4.7 (Correção FormData)...')
    
    console.log('🌐 Enviando requisição para:', ROBOFLOW_CONFIG.modelEndpoint)
    console.log('📊 Tamanho do arquivo:', imageFile.size, 'bytes')
    console.log('📄 Tipo do arquivo:', imageFile.type)
    
    // Converte WebP para JPEG se necessário para melhor compatibilidade
    const processedFile = await convertToJPEG(imageFile)
    console.log('🔄 Arquivo processado:', processedFile.type, processedFile.size, 'bytes')
    
    // Usa apenas FormData (mais confiável)
    const formData = new FormData()
    formData.append('file', processedFile)
    
    const url = `${ROBOFLOW_CONFIG.modelEndpoint}?api_key=${ROBOFLOW_CONFIG.apiKey}&confidence=${ROBOFLOW_CONFIG.confidence}&overlap=${ROBOFLOW_CONFIG.overlap}`
    
    console.log('📡 Enviando via FormData para:', url)
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })
    
    console.log('📡 Status da resposta:', response.status, response.statusText)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erro detalhado:', errorText)
      throw new Error(`Erro HTTP: ${response.status} - ${errorText}`)
    }
    
    const result = await response.json()
    console.log('📊 Resposta bruta da API:', result)
    console.log('🔍 Número de predições:', result.predictions ? result.predictions.length : 0)
    
    if (result.predictions && result.predictions.length > 0) {
      console.log('🎉 ROBOFLOW DETECTOU PRAGAS!', result.predictions.length, 'detecções')
      result.predictions.forEach((pred, i) => {
        console.log(`🐛 Detecção ${i+1}:`, pred.class, 'confiança:', pred.confidence)
      })
    } else {
      console.log('⚠️ Roboflow não detectou pragas nesta imagem')
    }
    
    // Processa resultado da API
    return processRoboflowResponse(result)
    
  } catch (error) {
    console.error('❌ Erro na chamada Roboflow:', error)
    console.log('🔄 Continuando com análise local...')
    return [] // Retorna array vazio para continuar com análise local
  }
}

/**
 * Converte imagem para JPEG para melhor compatibilidade com Roboflow
 */
async function convertToJPEG(file) {
  return new Promise((resolve) => {
    // Se já é JPEG, retorna o arquivo original
    if (file.type === 'image/jpeg') {
      resolve(file)
      return
    }
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Redimensiona se muito grande (máximo 1024px)
      const maxSize = 1024
      let { width, height } = img
      
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (height * maxSize) / width
          width = maxSize
        } else {
          width = (width * maxSize) / height
          height = maxSize
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Fundo branco para melhor contraste
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, width, height)
      
      // Desenha a imagem
      ctx.drawImage(img, 0, 0, width, height)
      
      // Converte para JPEG com qualidade alta
      canvas.toBlob((blob) => {
        const jpegFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
          type: 'image/jpeg'
        })
        resolve(jpegFile)
      }, 'image/jpeg', 0.9)
    }
    
    img.src = URL.createObjectURL(file)
  })
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
 * Modelo: agricultural-pests-detection/3
 * Classes: Caterpillar, Grasshoppers, Slugs, Weevils
 */
function mapRoboflowClassToPestId(roboflowClass) {
  const classMapping = {
    // Modelo agricultural-pests-detection/3
    'caterpillar': 'broca-da-cana',        // Lagartas → Broca-da-cana
    'catterpillar': 'broca-da-cana',       // Variação de escrita
    'weevils': 'bicudo-da-cana',           // Gorgulhos → Bicudo-da-cana
    'weevil': 'bicudo-da-cana',            // Singular
    'grasshoppers': 'cigarrinha-das-raizes', // Gafanhotos → Cigarrinha
    'grasshopper': 'cigarrinha-das-raizes',  // Singular
    'slugs': 'migdolus',                   // Lesmas → Migdolus (praga de solo)
    'slug': 'migdolus',                    // Singular
    
    // Mapeamentos antigos mantidos para compatibilidade
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
  const mappedId = classMapping[normalizedClass]
  
  console.log(`🔄 Mapeando classe "${roboflowClass}" → "${mappedId || 'unknown'}"`)
  return mappedId || 'unknown'
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
function combineDetectionResults(roboflowDetection, scientificDetection, visualDetection, fileAnalysis, width, height) {
  console.log('🔄 Combinando resultados de detecção...')
  
  // Prioriza Roboflow, depois detecção científica, depois visual, depois análise de arquivo
  let detections = []
  let analysisMethod = 'IA Local'
  
  if (roboflowDetection && roboflowDetection.length > 0) {
    detections = roboflowDetection
    analysisMethod = 'Roboflow API'
    console.log('🤖 Usando resultado Roboflow como primário')
  } else if (scientificDetection && scientificDetection.length > 0) {
    detections = scientificDetection
    analysisMethod = 'IA Científica Local'
    console.log('🧬 Usando detecção científica como primária')
  } else if (visualDetection && visualDetection.length > 0) {
    detections = visualDetection
    analysisMethod = 'Análise Visual'
    console.log('👁️ Usando análise visual como primária')
  } else if (fileAnalysis && fileAnalysis.pestId) {
    // Converte análise de arquivo para formato de detecção
    const pestData = SUGARCANE_PESTS[fileAnalysis.pestId]
    if (pestData) {
      detections = [{
        pestId: fileAnalysis.pestId,
        confidence: fileAnalysis.confidence,
        boundingBox: {
          x: width * 0.3,
          y: height * 0.3,
          width: width * 0.4,
          height: height * 0.4
        },
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
  const recommendations = generatePestRecommendations(primaryDetection.pestId || primaryDetection.id)
  
  const finalResult = {
    // Estrutura compatível com ImageUpload.jsx
    pestName: primaryDetection.name || SUGARCANE_PESTS[primaryDetection.pestId]?.name || 'Praga Detectada',
    scientificName: primaryDetection.scientificName || SUGARCANE_PESTS[primaryDetection.pestId]?.scientificName || 'Espécie não identificada',
    description: `${primaryDetection.scientificName || SUGARCANE_PESTS[primaryDetection.pestId]?.scientificName || 'Praga'} - ${primaryDetection.characteristics?.habitat?.join(', ') || 'Praga de cana-de-açúcar'}`,
    confidence: primaryDetection.confidence || 0.7,
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



/**
 * Análise visual avançada da imagem para detectar pragas
 */
function analyzeImageVisually(imageData, canvas, imageFile) {
  console.log('👁️ Iniciando análise visual avançada...')
  
  try {
    const detections = []
    const width = canvas.width
    const height = canvas.height
    const data = imageData.data
    
    // Análise de cores características de pragas
    const colorAnalysis = analyzeColors(data, width, height)
    console.log('🎨 Análise de cores:', colorAnalysis)
    
    // Análise de padrões e formas
    const patternAnalysis = analyzePatterns(data, width, height)
    console.log('🔍 Análise de padrões:', patternAnalysis)
    
    // Detecta cores características de lagartas (amarelo/laranja)
    if (colorAnalysis.yellowOrange > 0.05) {
      detections.push({
        pestId: 'broca-da-cana',
        confidence: Math.min(0.8, colorAnalysis.yellowOrange * 10),
        boundingBox: findColorRegion(data, width, height, 'yellowOrange'),
        source: 'visual-color',
        characteristics: SUGARCANE_PESTS['broca-da-cana'].characteristics
      })
      console.log('🐛 Detectada possível lagarta por cor amarela/laranja')
    }
    
    // Detecta cores características de cigarrinhas (verde/marrom)
    if (colorAnalysis.greenBrown > 0.03) {
      detections.push({
        pestId: 'cigarrinha-das-raizes',
        confidence: Math.min(0.7, colorAnalysis.greenBrown * 12),
        boundingBox: findColorRegion(data, width, height, 'greenBrown'),
        source: 'visual-color',
        characteristics: SUGARCANE_PESTS['cigarrinha-das-raizes'].characteristics
      })
      console.log('🦗 Detectada possível cigarrinha por cor verde/marrom')
    }
    
    // Detecta padrões de danos na cana (buracos, galerias)
    if (patternAnalysis.holes > 0.02) {
      detections.push({
        pestId: 'broca-da-cana',
        confidence: Math.min(0.9, patternAnalysis.holes * 15),
        boundingBox: findDamageRegion(data, width, height),
        source: 'visual-damage',
        characteristics: SUGARCANE_PESTS['broca-da-cana'].characteristics
      })
      console.log('🕳️ Detectados danos característicos de broca')
    }
    
    console.log(`👁️ Análise visual encontrou ${detections.length} possíveis detecções`)
    return detections
    
  } catch (error) {
    console.error('❌ Erro na análise visual:', error)
    return []
  }
}

/**
 * Analisa cores características na imagem
 */
function analyzeColors(data, width, height) {
  let yellowOrange = 0
  let greenBrown = 0
  let totalPixels = 0
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    
    // Detecta tons amarelo/laranja (lagartas)
    if (r > 150 && g > 100 && b < 100 && r > g && g > b) {
      yellowOrange++
    }
    
    // Detecta tons verde/marrom (cigarrinhas)
    if ((g > r && g > b && g > 80) || (r > 100 && g > 80 && b < 80)) {
      greenBrown++
    }
    
    totalPixels++
  }
  
  return {
    yellowOrange: yellowOrange / (totalPixels / 4),
    greenBrown: greenBrown / (totalPixels / 4)
  }
}

/**
 * Analisa padrões e formas na imagem
 */
function analyzePatterns(data, width, height) {
  let holes = 0
  let edges = 0
  
  // Detecta bordas e buracos usando diferenças de luminosidade
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4
      const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3
      
      // Verifica pixels vizinhos
      const neighbors = [
        ((y-1) * width + x) * 4,
        ((y+1) * width + x) * 4,
        (y * width + (x-1)) * 4,
        (y * width + (x+1)) * 4
      ]
      
      let maxDiff = 0
      neighbors.forEach(nIdx => {
        if (nIdx >= 0 && nIdx < data.length) {
          const neighbor = (data[nIdx] + data[nIdx + 1] + data[nIdx + 2]) / 3
          maxDiff = Math.max(maxDiff, Math.abs(current - neighbor))
        }
      })
      
      if (maxDiff > 50) edges++
      if (current < 50 && maxDiff > 80) holes++
    }
  }
  
  const totalPixels = width * height
  return {
    holes: holes / totalPixels,
    edges: edges / totalPixels
  }
}

/**
 * Encontra região com cor específica
 */
function findColorRegion(data, width, height, colorType) {
  let minX = width, minY = height, maxX = 0, maxY = 0
  let found = false
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      
      let isTarget = false
      if (colorType === 'yellowOrange') {
        isTarget = r > 150 && g > 100 && b < 100 && r > g && g > b
      } else if (colorType === 'greenBrown') {
        isTarget = (g > r && g > b && g > 80) || (r > 100 && g > 80 && b < 80)
      }
      
      if (isTarget) {
        minX = Math.min(minX, x)
        minY = Math.min(minY, y)
        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
        found = true
      }
    }
  }
  
  if (!found) {
    return { x: width * 0.3, y: height * 0.3, width: width * 0.4, height: height * 0.4 }
  }
  
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  }
}

/**
 * Encontra região com danos
 */
function findDamageRegion(data, width, height) {
  // Simplificado: retorna região central
  return {
    x: width * 0.2,
    y: height * 0.2,
    width: width * 0.6,
    height: height * 0.6
  }
}

