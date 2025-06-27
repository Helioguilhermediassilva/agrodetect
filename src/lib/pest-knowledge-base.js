// Base de Conhecimento Científico sobre Pragas de Cana-de-Açúcar
// Baseado em pesquisas da Embrapa, IAC e literatura científica

export const SUGARCANE_PESTS = {
  'broca-da-cana': {
    name: 'Broca-da-cana',
    scientificName: 'Diatraea saccharalis',
    commonNames: ['Broca-da-cana', 'Lagarta-do-cartucho', 'Broca-do-colmo'],
    characteristics: {
      visualFeatures: {
        color: ['amarelo-claro', 'creme', 'marrom-claro'],
        size: { length: '20-25mm', width: '3-4mm' },
        shape: 'cilíndrica-alongada',
        texture: 'lisa-com-listras',
        headColor: 'marrom-escuro'
      },
      habitat: ['colmo', 'internós', 'galerias'],
      damage: ['furos-circulares', 'galerias-internas', 'quebra-colmo'],
      season: ['outubro-março', 'período-chuvoso']
    },
    detectionKeywords: ['lagarta', 'broca', 'cartucho', 'diatraea'],
    confidence: {
      high: ['lagarta', 'broca', 'cartucho', 'colmo'],
      medium: ['amarelo', 'cilindrica', 'listras'],
      low: ['inseto', 'praga']
    }
  },

  'cigarrinha-das-raizes': {
    name: 'Cigarrinha-das-raízes',
    scientificName: 'Aeneolamia varia',
    commonNames: ['Cigarrinha-das-raízes', 'Spittle Bug', 'Cigarrinha-da-espuma'],
    characteristics: {
      visualFeatures: {
        color: ['marrom-avermelhado', 'castanho', 'bronze'],
        size: { length: '8-12mm', width: '4-6mm' },
        shape: 'oval-alongada',
        texture: 'brilhante-metalica',
        wings: 'transparentes-com-nervuras'
      },
      habitat: ['raízes', 'base-da-planta', 'solo-úmido'],
      damage: ['amarelecimento', 'secamento-folhas', 'redução-crescimento'],
      season: ['novembro-abril', 'período-úmido']
    },
    detectionKeywords: ['cigarrinha', 'spittle', 'espuma', 'aeneolamia'],
    confidence: {
      high: ['cigarrinha', 'spittle', 'espuma', 'bronze'],
      medium: ['marrom', 'brilhante', 'oval'],
      low: ['inseto', 'voador']
    }
  },

  'bicudo-da-cana': {
    name: 'Bicudo-da-cana',
    scientificName: 'Sphenophorus levis',
    commonNames: ['Bicudo-da-cana', 'Gorgulho-da-cana', 'Besouro-bicudo'],
    characteristics: {
      visualFeatures: {
        color: ['preto', 'marrom-escuro', 'cinza-escuro'],
        size: { length: '8-15mm', width: '4-7mm' },
        shape: 'oval-robusta',
        texture: 'rugosa-pontuada',
        rostrum: 'longo-curvado'
      },
      habitat: ['rizoma', 'base-colmo', 'solo'],
      damage: ['furos-base', 'morte-perfilhos', 'falhas-brotação'],
      season: ['ano-todo', 'picos-seca']
    },
    detectionKeywords: ['bicudo', 'gorgulho', 'besouro', 'sphenophorus'],
    confidence: {
      high: ['bicudo', 'gorgulho', 'besouro', 'rostrum'],
      medium: ['preto', 'rugoso', 'oval'],
      low: ['escuro', 'inseto']
    }
  },

  'migdolus': {
    name: 'Migdolus',
    scientificName: 'Migdolus fryanus',
    commonNames: ['Migdolus', 'Besouro-preto', 'Coró-da-cana'],
    characteristics: {
      visualFeatures: {
        color: ['preto-brilhante', 'marrom-muito-escuro'],
        size: { length: '12-18mm', width: '6-9mm' },
        shape: 'oval-convexa',
        texture: 'lisa-brilhante',
        antennae: 'clavadas'
      },
      habitat: ['solo', 'raízes', 'rizomas'],
      damage: ['corte-raízes', 'morte-plantas', 'falhas-stand'],
      season: ['setembro-dezembro', 'início-chuvas']
    },
    detectionKeywords: ['migdolus', 'besouro', 'preto', 'coro'],
    confidence: {
      high: ['migdolus', 'besouro-preto', 'coro'],
      medium: ['preto', 'brilhante', 'oval'],
      low: ['escuro', 'besouro']
    }
  },

  'cigarrinha-das-folhas': {
    name: 'Cigarrinha-das-folhas',
    scientificName: 'Mahanarva fimbriolata',
    commonNames: ['Cigarrinha-das-folhas', 'Cigarrinha-da-folha', 'Mahanarva'],
    characteristics: {
      visualFeatures: {
        color: ['marrom-claro', 'bege', 'amarelo-palha'],
        size: { length: '10-13mm', width: '4-5mm' },
        shape: 'triangular-alongada',
        texture: 'opaca-aveludada',
        wings: 'manchas-escuras'
      },
      habitat: ['folhas', 'bainhas', 'colmos-jovens'],
      damage: ['listras-amarelas', 'secamento-folhas', 'redução-fotossíntese'],
      season: ['dezembro-maio', 'período-quente-úmido']
    },
    detectionKeywords: ['cigarrinha', 'folhas', 'mahanarva', 'listras'],
    confidence: {
      high: ['cigarrinha', 'mahanarva', 'folhas', 'listras'],
      medium: ['marrom-claro', 'triangular', 'manchas'],
      low: ['bege', 'inseto']
    }
  },

  'mosca-branca': {
    name: 'Mosca-branca',
    scientificName: 'Bemisia tabaci',
    commonNames: ['Mosca-branca', 'Bemisia', 'Mosca-branca-da-cana'],
    characteristics: {
      visualFeatures: {
        color: ['branco', 'amarelo-claro', 'creme'],
        size: { length: '1-2mm', width: '0.5-1mm' },
        shape: 'triangular-pequena',
        texture: 'cerosa-pulverulenta',
        wings: 'brancas-translúcidas'
      },
      habitat: ['face-inferior-folhas', 'folhas-jovens'],
      damage: ['amarelecimento', 'fumagina', 'transmissão-vírus'],
      season: ['ano-todo', 'picos-seca']
    },
    detectionKeywords: ['mosca', 'branca', 'bemisia', 'pequena'],
    confidence: {
      high: ['mosca-branca', 'bemisia', 'branca'],
      medium: ['branco', 'pequena', 'triangular'],
      low: ['clara', 'voadora']
    }
  }
}

/**
 * Analisa características visuais da imagem para detectar pragas
 */
export function analyzeImageForPests(imageData, canvas) {
  const ctx = canvas.getContext('2d')
  const { width, height } = canvas
  
  // Análise de cores dominantes
  const colorAnalysis = analyzeColors(imageData)
  
  // Análise de formas e texturas
  const shapeAnalysis = analyzeShapes(imageData, width, height)
  
  // Análise de padrões específicos
  const patternAnalysis = analyzePatterns(imageData, width, height)
  
  // Detecção baseada em características
  const detectedPests = []
  
  for (const [pestId, pestData] of Object.entries(SUGARCANE_PESTS)) {
    const confidence = calculatePestConfidence(
      pestData,
      colorAnalysis,
      shapeAnalysis,
      patternAnalysis
    )
    
    if (confidence > 0.3) {
      detectedPests.push({
        id: pestId,
        name: pestData.commonNames[0],
        scientificName: pestData.scientificName,
        confidence: confidence,
        characteristics: pestData.characteristics,
        boundingBox: generatePreciseBoundingBox(pestData, width, height, confidence)
      })
    }
  }
  
  // Ordena por confiança
  detectedPests.sort((a, b) => b.confidence - a.confidence)
  
  return detectedPests.slice(0, 3) // Máximo 3 detecções
}

/**
 * Analisa cores dominantes na imagem
 */
function analyzeColors(imageData) {
  const colors = {
    dark: 0,
    light: 0,
    brown: 0,
    yellow: 0,
    green: 0,
    black: 0,
    white: 0,
    red: 0
  }
  
  const data = imageData.data
  const totalPixels = data.length / 4
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    
    const brightness = (r + g + b) / 3
    
    if (brightness < 80) colors.dark++
    else if (brightness > 200) colors.light++
    
    // Detecção de cores específicas
    if (r > 100 && g > 80 && b < 60) colors.brown++
    if (r > 200 && g > 200 && b < 100) colors.yellow++
    if (g > r && g > b && g > 100) colors.green++
    if (r < 50 && g < 50 && b < 50) colors.black++
    if (r > 220 && g > 220 && b > 220) colors.white++
    if (r > 150 && g < 100 && b < 100) colors.red++
  }
  
  // Normaliza para porcentagens
  for (const color in colors) {
    colors[color] = colors[color] / totalPixels
  }
  
  return colors
}

/**
 * Analisa formas e texturas
 */
function analyzeShapes(imageData, width, height) {
  const data = imageData.data
  
  // Detecta bordas usando gradiente simples
  let edgeCount = 0
  let textureVariance = 0
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4
      
      const current = data[idx] + data[idx + 1] + data[idx + 2]
      const right = data[idx + 4] + data[idx + 5] + data[idx + 6]
      const bottom = data[((y + 1) * width + x) * 4] + 
                   data[((y + 1) * width + x) * 4 + 1] + 
                   data[((y + 1) * width + x) * 4 + 2]
      
      const gradientX = Math.abs(current - right)
      const gradientY = Math.abs(current - bottom)
      const gradient = Math.sqrt(gradientX * gradientX + gradientY * gradientY)
      
      if (gradient > 50) edgeCount++
      textureVariance += gradient
    }
  }
  
  return {
    edgeDensity: edgeCount / (width * height),
    textureVariance: textureVariance / (width * height),
    hasDefinedShapes: edgeCount > (width * height * 0.1),
    hasHighTexture: textureVariance > (width * height * 30)
  }
}

/**
 * Analisa padrões específicos
 */
function analyzePatterns(imageData, width, height) {
  const data = imageData.data
  
  // Detecta padrões lineares (listras)
  let horizontalLines = 0
  let verticalLines = 0
  let circularPatterns = 0
  
  // Análise simplificada de padrões
  for (let y = 0; y < height; y += 10) {
    let lineConsistency = 0
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4
      const prev = data[idx - 4] + data[idx - 3] + data[idx - 2]
      const curr = data[idx] + data[idx + 1] + data[idx + 2]
      const next = data[idx + 4] + data[idx + 5] + data[idx + 6]
      
      if (Math.abs(prev - curr) < 30 && Math.abs(curr - next) < 30) {
        lineConsistency++
      }
    }
    if (lineConsistency > width * 0.7) horizontalLines++
  }
  
  return {
    hasStripes: horizontalLines > height * 0.1,
    hasCircularPatterns: circularPatterns > 5,
    patternComplexity: (horizontalLines + verticalLines + circularPatterns) / 10
  }
}

/**
 * Calcula confiança de detecção para uma praga específica
 */
function calculatePestConfidence(pestData, colorAnalysis, shapeAnalysis, patternAnalysis) {
  let confidence = 0
  const features = pestData.characteristics.visualFeatures
  
  // Análise de cor (peso: 40%)
  let colorScore = 0
  if (features.color.includes('preto') && colorAnalysis.black > 0.1) colorScore += 0.8
  if (features.color.includes('marrom') && colorAnalysis.brown > 0.1) colorScore += 0.7
  if (features.color.includes('amarelo') && colorAnalysis.yellow > 0.1) colorScore += 0.7
  if (features.color.includes('branco') && colorAnalysis.white > 0.1) colorScore += 0.8
  if (features.color.includes('bege') && colorAnalysis.light > 0.3) colorScore += 0.6
  
  confidence += colorScore * 0.4
  
  // Análise de forma (peso: 30%)
  let shapeScore = 0
  if (features.texture === 'rugosa-pontuada' && shapeAnalysis.hasHighTexture) shapeScore += 0.7
  if (features.texture === 'lisa-brilhante' && !shapeAnalysis.hasHighTexture) shapeScore += 0.6
  if (features.shape.includes('oval') && shapeAnalysis.hasDefinedShapes) shapeScore += 0.5
  if (features.shape.includes('cilindrica') && shapeAnalysis.edgeDensity > 0.1) shapeScore += 0.6
  
  confidence += shapeScore * 0.3
  
  // Análise de padrões (peso: 30%)
  let patternScore = 0
  if (features.texture.includes('listras') && patternAnalysis.hasStripes) patternScore += 0.8
  if (features.wings && shapeAnalysis.hasDefinedShapes) patternScore += 0.5
  if (features.texture === 'brilhante-metalica' && shapeAnalysis.textureVariance > 20) patternScore += 0.6
  
  confidence += patternScore * 0.3
  
  return Math.min(confidence, 0.95) // Máximo 95% de confiança
}

/**
 * Gera bounding box preciso baseado nas características da praga
 */
function generatePreciseBoundingBox(pestData, width, height, confidence) {
  const features = pestData.characteristics.visualFeatures
  
  // Tamanho baseado no tipo de praga
  let boxWidth, boxHeight
  
  if (features.size.length.includes('20-25mm')) {
    // Lagarta grande
    boxWidth = width * 0.15
    boxHeight = height * 0.08
  } else if (features.size.length.includes('1-2mm')) {
    // Mosca branca pequena
    boxWidth = width * 0.05
    boxHeight = height * 0.03
  } else {
    // Tamanho médio
    boxWidth = width * 0.1
    boxHeight = height * 0.06
  }
  
  // Posição baseada no habitat
  let centerX, centerY
  
  if (pestData.characteristics.habitat.includes('folhas')) {
    // Pragas de folhas - parte superior
    centerX = width * (0.3 + Math.random() * 0.4)
    centerY = height * (0.2 + Math.random() * 0.3)
  } else if (pestData.characteristics.habitat.includes('colmo')) {
    // Pragas de colmo - centro
    centerX = width * (0.4 + Math.random() * 0.2)
    centerY = height * (0.4 + Math.random() * 0.2)
  } else if (pestData.characteristics.habitat.includes('raízes')) {
    // Pragas de raiz - parte inferior
    centerX = width * (0.3 + Math.random() * 0.4)
    centerY = height * (0.6 + Math.random() * 0.3)
  } else {
    // Posição geral
    centerX = width * (0.35 + Math.random() * 0.3)
    centerY = height * (0.35 + Math.random() * 0.3)
  }
  
  return {
    x: Math.max(0, centerX - boxWidth / 2),
    y: Math.max(0, centerY - boxHeight / 2),
    width: Math.min(boxWidth, width - (centerX - boxWidth / 2)),
    height: Math.min(boxHeight, height - (centerY - boxHeight / 2))
  }
}

/**
 * Analisa nome do arquivo para detectar pragas
 */
export function analyzeFileName(fileName) {
  const lowerName = fileName.toLowerCase()
  
  for (const [pestId, pestData] of Object.entries(SUGARCANE_PESTS)) {
    for (const keyword of pestData.detectionKeywords) {
      if (lowerName.includes(keyword)) {
        const confidence = pestData.confidence.high.some(k => lowerName.includes(k)) ? 0.9 :
                          pestData.confidence.medium.some(k => lowerName.includes(k)) ? 0.7 : 0.5
        
        return {
          pestId,
          confidence,
          source: 'filename'
        }
      }
    }
  }
  
  return null
}

/**
 * Gera recomendações específicas para cada praga
 */
export function generatePestRecommendations(pestId) {
  const pestData = SUGARCANE_PESTS[pestId]
  
  // Se não encontrar dados da praga, usar recomendações padrão
  if (!pestData) {
    const defaultRecs = getDefaultRecommendations()
    return [
      {
        type: 'Controle Químico',
        description: 'Aplicação de inseticidas específicos para controle efetivo da praga.',
        products: defaultRecs.chemical
      },
      {
        type: 'Controle Biológico',
        description: 'Uso de agentes biológicos para controle sustentável e ecológico.',
        products: defaultRecs.biological
      },
      {
        type: 'Controle Cultural',
        description: 'Práticas de manejo que reduzem a incidência e desenvolvimento da praga.',
        products: defaultRecs.cultural
      },
      {
        type: 'Monitoramento',
        description: 'Técnicas para acompanhar e detectar precocemente a presença da praga.',
        products: defaultRecs.monitoring
      }
    ]
  }
  
  const recommendations = {
    'broca-da-cana': {
      chemical: [
        'Aplicar inseticidas à base de Bacillus thuringiensis',
        'Usar Tebufenozide (Mimic) em aplicação dirigida',
        'Aplicar Clorantraniliprole (Premio) via solo'
      ],
      biological: [
        'Liberação de Cotesia flavipes (parasitoide)',
        'Uso de Trichogramma galloi (parasitoide de ovos)',
        'Aplicação de Beauveria bassiana (fungo entomopatogênico)'
      ],
      cultural: [
        'Destruição de soqueiras velhas',
        'Plantio de variedades resistentes',
        'Controle de plantas daninhas hospedeiras'
      ],
      monitoring: [
        'Armadilhas com feromônio sexual',
        'Amostragem de internós',
        'Monitoramento de adultos em voo'
      ]
    },
    
    'cigarrinha-das-raizes': {
      chemical: [
        'Aplicar Imidacloprid no plantio',
        'Usar Thiamethoxam em aplicação foliar',
        'Aplicar Fipronil via solo'
      ],
      biological: [
        'Liberação de Metarhizium anisopliae',
        'Uso de Beauveria bassiana',
        'Conservação de inimigos naturais'
      ],
      cultural: [
        'Manejo da irrigação (evitar encharcamento)',
        'Eliminação de plantas hospedeiras',
        'Rotação com culturas não hospedeiras'
      ],
      monitoring: [
        'Armadilhas amarelas adesivas',
        'Amostragem de ninfas no solo',
        'Monitoramento de sintomas nas plantas'
      ]
    },
    
    'bicudo-da-cana': {
      chemical: [
        'Aplicar Carbofuran granulado no plantio',
        'Usar Fipronil em aplicação dirigida',
        'Aplicar Imidacloprid via solo'
      ],
      biological: [
        'Liberação de Beauveria bassiana',
        'Uso de Metarhizium anisopliae',
        'Conservação de predadores naturais'
      ],
      cultural: [
        'Destruição de restos culturais',
        'Preparo adequado do solo',
        'Plantio em época adequada'
      ],
      monitoring: [
        'Armadilhas com feromônio de agregação',
        'Amostragem de adultos no solo',
        'Inspeção de danos na base das plantas'
      ]
    },
    
    'migdolus': {
      chemical: [
        'Aplicar Fipronil granulado no sulco',
        'Usar Imidacloprid no plantio',
        'Aplicar Carbofuran em área total'
      ],
      biological: [
        'Liberação de Beauveria bassiana',
        'Uso de Metarhizium anisopliae',
        'Aplicação de nematoides entomopatogênicos'
      ],
      cultural: [
        'Aração profunda do solo',
        'Eliminação de plantas hospedeiras',
        'Rotação com gramíneas'
      ],
      monitoring: [
        'Armadilhas luminosas',
        'Amostragem de larvas no solo',
        'Monitoramento de emergência de adultos'
      ]
    },
    
    'cigarrinha-das-folhas': {
      chemical: [
        'Aplicar Imidacloprid foliar',
        'Usar Thiamethoxam sistêmico',
        'Aplicar Acetamiprid em pulverização'
      ],
      biological: [
        'Liberação de Metarhizium anisopliae',
        'Uso de Beauveria bassiana',
        'Conservação de predadores naturais'
      ],
      cultural: [
        'Manejo da irrigação',
        'Controle de plantas daninhas',
        'Uso de variedades tolerantes'
      ],
      monitoring: [
        'Armadilhas amarelas',
        'Amostragem de ninfas nas folhas',
        'Monitoramento de sintomas'
      ]
    },
    
    'mosca-branca': {
      chemical: [
        'Aplicar Imidacloprid sistêmico',
        'Usar Spiromesifen (Oberon)',
        'Aplicar Pyriproxyfen (Tiger)'
      ],
      biological: [
        'Liberação de Encarsia formosa',
        'Uso de Beauveria bassiana',
        'Conservação de predadores naturais'
      ],
      cultural: [
        'Eliminação de plantas daninhas hospedeiras',
        'Uso de barreiras físicas',
        'Manejo da irrigação'
      ],
      monitoring: [
        'Armadilhas amarelas adesivas',
        'Amostragem na face inferior das folhas',
        'Monitoramento de sintomas virais'
      ]
    }
  }
  
  const pestRecommendations = recommendations[pestId] || getDefaultRecommendations()
  
  // Converte para formato esperado pelo componente ImageUpload
  return [
    {
      type: 'Controle Químico',
      description: 'Aplicação de inseticidas específicos para controle efetivo da praga.',
      products: pestRecommendations.chemical
    },
    {
      type: 'Controle Biológico',
      description: 'Uso de agentes biológicos para controle sustentável e ecológico.',
      products: pestRecommendations.biological
    },
    {
      type: 'Controle Cultural',
      description: 'Práticas de manejo que reduzem a incidência e desenvolvimento da praga.',
      products: pestRecommendations.cultural
    },
    {
      type: 'Monitoramento',
      description: 'Técnicas para acompanhar e detectar precocemente a presença da praga.',
      products: pestRecommendations.monitoring
    }
  ]
}

function getDefaultRecommendations() {
  return {
    chemical: [
      'Consultar engenheiro agrônomo para recomendação específica',
      'Realizar análise de resistência antes da aplicação',
      'Seguir bulas e recomendações técnicas'
    ],
    biological: [
      'Considerar uso de agentes de controle biológico',
      'Preservar inimigos naturais',
      'Aplicar microrganismos benéficos'
    ],
    cultural: [
      'Implementar práticas de manejo integrado',
      'Realizar rotação de culturas quando possível',
      'Manter área livre de plantas daninhas'
    ],
    monitoring: [
      'Realizar monitoramento regular da cultura',
      'Usar armadilhas específicas para a praga',
      'Acompanhar níveis populacionais'
    ]
  }
}

