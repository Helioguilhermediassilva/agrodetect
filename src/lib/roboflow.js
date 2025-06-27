// Configuração da API Roboflow
const ROBOFLOW_CONFIG = {
  apiKey: import.meta.env.VITE_ROBOFLOW_API_KEY || 'EYpWDjnS6TX6DRCsgmfK',
  modelId: import.meta.env.VITE_ROBOFLOW_MODEL_ID || 'pest-detection',
  version: import.meta.env.VITE_ROBOFLOW_VERSION || '1',
  baseUrl: 'https://detect.roboflow.com'
}

/**
 * Converte arquivo de imagem para base64
 * @param {File} file - Arquivo de imagem
 * @returns {Promise<string>} - String base64 da imagem
 */
export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      // Remove o prefixo "data:image/...;base64," 
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Faz a detecção de pragas usando a API Roboflow
 * @param {File} imageFile - Arquivo de imagem para análise
 * @returns {Promise<Object>} - Resultado da detecção
 */
export const detectPest = async (imageFile) => {
  try {
    // Converte imagem para base64
    const base64Image = await convertImageToBase64(imageFile)
    
    // Monta URL da API
    const apiUrl = `${ROBOFLOW_CONFIG.baseUrl}/${ROBOFLOW_CONFIG.modelId}/${ROBOFLOW_CONFIG.version}?api_key=${ROBOFLOW_CONFIG.apiKey}`
    
    // Faz a requisição para a API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: base64Image
    })

    if (!response.ok) {
      throw new Error(`Erro na API Roboflow: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    
    // Processa o resultado da API
    return processRoboflowResult(result)
    
  } catch (error) {
    console.error('Erro na detecção de pragas:', error)
    throw new Error('Falha na análise da imagem. Verifique sua conexão e tente novamente.')
  }
}

/**
 * Processa o resultado da API Roboflow para o formato esperado pela aplicação
 * @param {Object} roboflowData - Dados retornados pela API Roboflow
 * @returns {Object} - Resultado processado
 */
const processRoboflowResult = (roboflowData) => {
  const predictions = roboflowData.predictions || []
  
  if (predictions.length === 0) {
    throw new Error('Nenhuma praga foi detectada na imagem. Tente com uma imagem mais clara ou com melhor iluminação.')
  }

  // Pega a predição com maior confiança
  const topPrediction = predictions.reduce((prev, current) => 
    (prev.confidence > current.confidence) ? prev : current
  )

  const pestName = topPrediction.class || 'Praga não identificada'
  const confidence = topPrediction.confidence || 0

  return {
    pestName: formatPestName(pestName),
    confidence: confidence,
    infestationLevel: getInfestationLevel(confidence),
    description: getPestDescription(pestName),
    recommendations: getRecommendations(pestName),
    boundingBox: {
      x: topPrediction.x,
      y: topPrediction.y,
      width: topPrediction.width,
      height: topPrediction.height
    },
    allPredictions: predictions // Mantém todas as predições para análise avançada
  }
}

/**
 * Formata o nome da praga para exibição
 * @param {string} pestName - Nome da praga retornado pela API
 * @returns {string} - Nome formatado
 */
const formatPestName = (pestName) => {
  const pestNames = {
    'armyworm': 'Lagarta-do-cartucho',
    'aphid': 'Pulgão',
    'thrips': 'Tripes',
    'whitefly': 'Mosca-branca',
    'spider_mite': 'Ácaro-rajado',
    'caterpillar': 'Lagarta',
    'beetle': 'Besouro',
    'leafhopper': 'Cigarrinha',
    'scale_insect': 'Cochonilha',
    'mealybug': 'Cochonilha-farinhenta'
  }
  
  return pestNames[pestName.toLowerCase()] || pestName
}

/**
 * Determina o nível de infestação baseado na confiança
 * @param {number} confidence - Nível de confiança (0-1)
 * @returns {string} - Nível de infestação
 */
const getInfestationLevel = (confidence) => {
  if (confidence >= 0.8) return 'Alta'
  if (confidence >= 0.6) return 'Moderada'
  if (confidence >= 0.4) return 'Baixa'
  return 'Incerta'
}

/**
 * Retorna descrição da praga
 * @param {string} pestName - Nome da praga
 * @returns {string} - Descrição da praga
 */
const getPestDescription = (pestName) => {
  const descriptions = {
    'armyworm': 'Spodoptera frugiperda - Uma das principais pragas do milho, causa danos significativos às folhas e espigas.',
    'aphid': 'Pequenos insetos sugadores que se alimentam da seiva das plantas, causando amarelecimento e deformação.',
    'thrips': 'Insetos minúsculos que causam danos por raspagem e sucção, deixando manchas prateadas nas folhas.',
    'whitefly': 'Mosca-branca que suga a seiva das plantas e pode transmitir vírus, causando amarelecimento das folhas.',
    'spider_mite': 'Ácaros que causam pontuações amareladas nas folhas e podem formar teias finas.',
    'caterpillar': 'Larvas de lepidópteros que se alimentam das folhas, causando desfolhamento.',
    'beetle': 'Besouros que podem atacar folhas, frutos ou raízes dependendo da espécie.',
    'leafhopper': 'Cigarrinhas que sugam seiva e podem transmitir doenças às plantas.',
    'scale_insect': 'Insetos que se fixam nas plantas e sugam seiva, enfraquecendo a planta.',
    'mealybug': 'Cochonilhas cobertas por cera branca que sugam seiva e enfraquecem a planta.'
  }
  
  return descriptions[pestName.toLowerCase()] || 'Praga identificada que pode causar danos às culturas agrícolas.'
}

/**
 * Retorna recomendações de controle para a praga
 * @param {string} pestName - Nome da praga
 * @returns {Array} - Array de recomendações
 */
const getRecommendations = (pestName) => {
  const recommendations = {
    'armyworm': [
      {
        type: 'Controle Biológico',
        products: ['Bacillus thuringiensis', 'Trichogramma pretiosum', 'Telenomus remus'],
        description: 'Uso de inimigos naturais específicos para controle sustentável da lagarta-do-cartucho'
      },
      {
        type: 'Controle Químico',
        products: ['Clorantraniliprole', 'Flubendiamide', 'Spinosad'],
        description: 'Inseticidas seletivos para aplicação quando o nível de dano econômico for atingido'
      },
      {
        type: 'Manejo Integrado',
        products: ['Rotação de culturas', 'Plantas armadilha', 'Monitoramento com armadilhas'],
        description: 'Práticas preventivas para reduzir a população e resistência da praga'
      }
    ],
    'aphid': [
      {
        type: 'Controle Biológico',
        products: ['Chrysoperla carnea', 'Aphidius colemani', 'Coccinelídeos'],
        description: 'Predadores e parasitoides naturais para controle eficiente de pulgões'
      },
      {
        type: 'Controle Químico',
        products: ['Imidacloprido', 'Acetamiprido', 'Pirimicarbe'],
        description: 'Inseticidas sistêmicos para controle rápido em altas infestações'
      },
      {
        type: 'Controle Cultural',
        products: ['Plantas repelentes', 'Reflective mulch', 'Eliminação de hospedeiros'],
        description: 'Métodos preventivos para reduzir a colonização por pulgões'
      }
    ]
  }
  
  return recommendations[pestName.toLowerCase()] || [
    {
      type: 'Controle Integrado',
      products: ['Monitoramento regular', 'Controle biológico', 'Aplicação seletiva'],
      description: 'Abordagem integrada combinando métodos biológicos, culturais e químicos'
    },
    {
      type: 'Controle Preventivo',
      products: ['Plantas resistentes', 'Rotação de culturas', 'Manejo do solo'],
      description: 'Práticas preventivas para reduzir a incidência de pragas'
    }
  ]
}

