# AgroDetect - Identificação Inteligente de Pragas

![AgroDetect](https://img.shields.io/badge/AgroDetect-Agricultura%20Tecnol%C3%B3gica-green)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF)

## 🌱 Sobre o Projeto

O **AgroDetect** é uma plataforma web moderna para identificação inteligente de pragas agrícolas usando visão computacional. O sistema permite que agricultores façam upload de imagens de pragas encontradas em suas lavouras e recebam identificação automática junto com recomendações personalizadas de controle.

### ✨ Funcionalidades Principais

- 📸 **Upload Inteligente**: Interface drag & drop para envio de imagens
- 🤖 **IA Avançada**: Integração preparada para API Roboflow
- 📊 **Análise Detalhada**: Identificação com nível de confiança e infestação
- 💡 **Recomendações**: Sistema automático de controle e manejo integrado
- 📋 **Histórico**: Acompanhamento de consultas anteriores
- 📄 **Relatórios**: Download de relatórios detalhados em PDF
- 📱 **Responsivo**: Funciona perfeitamente em mobile, tablet e desktop

## 🎨 Design

- **Paleta de Cores**: Verde (sustentabilidade), Branco (clareza), Cinza (tecnologia)
- **Tipografia**: Legível e amigável
- **Interface**: Moderna, clean e profissional
- **UX**: Intuitiva com feedback em tempo real

## 🚀 Tecnologias

- **Frontend**: React 18 + Vite
- **Estilização**: Tailwind CSS
- **Componentes**: shadcn/ui
- **Ícones**: Lucide React
- **Build**: Vite
- **Deploy**: Vercel

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Helioguilhermediassilva/agrodetect.git

# Entre no diretório
cd agrodetect

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🔧 Configuração da API Roboflow

Para integrar com a API real do Roboflow:

1. Crie uma conta em [roboflow.com](https://roboflow.com)
2. Treine um modelo de detecção de pragas
3. Configure as variáveis de ambiente:

```env
VITE_ROBOFLOW_API_KEY=sua_api_key
VITE_ROBOFLOW_MODEL_ID=seu_modelo_id
```

4. Substitua a simulação pela integração real no arquivo `src/components/ImageUpload.jsx`

## 📱 Como Usar

1. **Fotografe**: Tire uma foto clara da praga na plantação
2. **Envie**: Faça upload da imagem na plataforma
3. **Analise**: A IA identifica a praga automaticamente
4. **Aja**: Receba recomendações de controle personalizadas

## 🌐 Demo

**Site em Produção**: [AgroDetect](https://mjqbnjbb.manus.space)

## 📊 Estrutura do Projeto

```
agrodetect/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui
│   │   └── ImageUpload.jsx  # Componente principal de upload
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos customizados
│   └── main.jsx             # Ponto de entrada
├── public/                  # Arquivos estáticos
├── dist/                    # Build de produção
└── docs/                    # Documentação
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Hélio Guilherme Dias Silva**
- GitHub: [@Helioguilhermediassilva](https://github.com/Helioguilhermediassilva)

## 🙏 Agradecimentos

- [Roboflow](https://roboflow.com) pela tecnologia de visão computacional
- [shadcn/ui](https://ui.shadcn.com) pelos componentes elegantes
- [Tailwind CSS](https://tailwindcss.com) pelo sistema de design
- [Lucide](https://lucide.dev) pelos ícones modernos

---

**Potencialize sua lavoura com inteligência artificial: detecte pragas e aja rápido! 🌾**

