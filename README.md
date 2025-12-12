# Sistema Solar AR - App Educativo WebAR

App educativo em WebAR (A-Frame + AR.js) sobre o Sistema Solar, desenvolvido para crianças. O conteúdo só aparece quando a câmara reconhece um marcador AR.

## 🌟 Características

- **Reconhecimento de Marcador AR**: O Sistema Solar aparece apenas quando o marcador é detectado
- **Interação com Planetas**: Toque/clique nos planetas para aprender sobre cada um
- **Áudio Educativo**: Cada planeta tem um áudio explicativo (com fallback para Speech Synthesis)
- **Interface Infantil**: Cores vivas, planetas grandes e texto legível
- **Compatível Mobile e Desktop**: Funciona em Android, iOS e desktop com webcam

## 📁 Estrutura do Projeto

```
projetorva/
├── index.html          # HTML principal com A-Frame e AR.js
├── app.js              # Lógica JavaScript do aplicativo
├── README.md           # Este ficheiro
└── assets/
    ├── audio/          # Áudios dos planetas
    │   ├── mercurio.mp3
    │   ├── venus.mp3
    │   ├── terra.mp3
    │   ├── marte.mp3
    │   ├── jupiter.mp3
    │   ├── saturno.mp3
    │   ├── urano.mp3
    │   └── neptuno.mp3
    ├── textures/       # Texturas opcionais
    └── marker/         # Marcador AR
        └── hiro.patt   # Ficheiro de padrão do marcador
```

## 🚀 Como Executar

### Opção 1: Servidor HTTP Python (Recomendado)

1. Abra um terminal na pasta do projeto
2. Execute um dos seguintes comandos:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

3. Abra o navegador e aceda a:
   ```
   http://localhost:8000
   ```

### Opção 2: Servidor HTTP Node.js

Se tiver Node.js instalado:

```bash
npx http-server -p 8000
```

### Opção 3: Live Server (VS Code)

Se usar VS Code, instale a extensão "Live Server" e clique em "Go Live".

## 📱 Como Usar

1. **Imprima o Marcador AR**:
   - Aceda ao link abaixo para imprimir o marcador Hiro
   - Ou use o ficheiro `assets/marker/hiro.patt` como referência
   - Imprima em papel branco, tamanho A4

2. **Aceda à Aplicação**:
   - Abra `index.html` através do servidor HTTP local
   - **Importante**: Use HTTPS ou localhost (não funciona com file://)

3. **Permita Acesso à Câmara**:
   - O navegador pedirá permissão para aceder à câmara
   - Clique em "Permitir"

4. **Aponte para o Marcador**:
   - Aponte a câmara do dispositivo para o marcador AR impresso
   - O Sistema Solar aparecerá automaticamente

5. **Interaja com os Planetas**:
   - Toque/clique num planeta para aprender sobre ele
   - O áudio será reproduzido e os outros planetas desaparecerão
   - Toque novamente no mesmo planeta para voltar à vista completa

## 🎯 Marcador AR

### Marcador Hiro (Padrão)

O projeto usa o marcador Hiro padrão do AR.js. Pode imprimi-lo a partir de:

- **Link direto**: https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg
- **Alternativa**: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/HIRO.jpg

### Como Imprimir

1. Abra o link acima
2. Imprima a imagem em papel branco
3. Certifique-se de que o marcador está bem iluminado
4. Evite dobrar ou danificar o marcador

## 🔊 Áudios dos Planetas

O app espera os seguintes ficheiros de áudio na pasta `assets/audio/`:

- `mercurio.mp3`
- `venus.mp3`
- `terra.mp3`
- `marte.mp3`
- `jupiter.mp3`
- `saturno.mp3`
- `urano.mp3`
- `neptuno.mp3`

### Fallback Automático

Se algum ficheiro de áudio não existir, o app usa automaticamente **Speech Synthesis** (síntese de voz) em português (pt-PT) para ler as informações do planeta.

### Criar Áudios Personalizados

Pode criar os seus próprios áudios:
- Formato: MP3
- Duração recomendada: 10-30 segundos
- Linguagem: Português (pt-PT)
- Tom: Infantil e educativo

## 🛠️ Tecnologias Utilizadas

- **A-Frame 1.4.0**: Framework WebVR/WebAR
- **AR.js 3.4.5**: Biblioteca AR para A-Frame (marker-based)
- **HTML5**: Estrutura da aplicação
- **JavaScript Vanilla**: Lógica da aplicação
- **Web Speech API**: Fallback para síntese de voz

## 📱 Compatibilidade

### Navegadores Suportados

- ✅ Chrome/Chromium (Android, iOS, Desktop)
- ✅ Firefox (Android, Desktop)
- ✅ Safari (iOS 11+, macOS)
- ✅ Edge (Desktop)

### Requisitos

- **Câmara**: Webcam (desktop) ou câmara do dispositivo (mobile)
- **HTTPS ou localhost**: Necessário para acesso à câmara
- **Permissões**: Acesso à câmara deve ser permitido

### Dispositivos Testados

- ✅ Android (Chrome, Firefox)
- ✅ iOS (Safari)
- ✅ Desktop Windows/Mac/Linux (Chrome, Firefox, Edge)

## 🎮 Funcionalidades

### Detecção de Marcador

- ✅ Sistema Solar aparece quando o marcador é detectado
- ✅ Sistema Solar desaparece quando o marcador sai do campo de visão
- ✅ Áudio é interrompido automaticamente quando o marcador é perdido

### Interação com Planetas

- ✅ Toque/clique num planeta para selecioná-lo
- ✅ Áudio educativo é reproduzido
- ✅ Outros planetas são ocultados (exceto o Sol)
- ✅ Texto flutuante com informações aparece
- ✅ Toque novamente no mesmo planeta para deselecionar
- ✅ Todos os planetas voltam a aparecer
- ✅ Áudio atual é interrompido ao selecionar outro planeta

### Planetas Incluídos

1. **Sol** - Estrela central do Sistema Solar
2. **Mercúrio** - Planeta mais próximo do Sol
3. **Vénus** - Planeta mais quente
4. **Terra** - Nosso planeta
5. **Marte** - Planeta vermelho
6. **Júpiter** - Maior planeta
7. **Saturno** - Planeta com anéis
8. **Urano** - Planeta azul-verde
9. **Neptuno** - Planeta mais distante

## 🐛 Resolução de Problemas

### A câmara não abre

- Certifique-se de que está a usar HTTPS ou localhost
- Verifique as permissões do navegador para a câmara
- Tente recarregar a página

### O marcador não é detectado

- Certifique-se de que o marcador está bem iluminado
- Evite reflexos no marcador
- Mantenha o marcador estável e a uma distância adequada (30-50cm)
- Limpe a lente da câmara

### Os áudios não tocam

- Verifique se os ficheiros MP3 existem na pasta `assets/audio/`
- O app usará Speech Synthesis automaticamente se os ficheiros não existirem
- Verifique o console do navegador para erros

### O Sistema Solar não aparece

- Verifique se o marcador está completamente visível na câmara
- Certifique-se de que está a usar o marcador Hiro correto
- Verifique o console do navegador para erros

## 📝 Notas de Desenvolvimento

### Estrutura do Código

- `index.html`: Estrutura HTML com A-Frame e configuração AR
- `app.js`: Controlador de estado e lógica de interação
- `SolarSystemController`: Objeto principal que gerencia o estado da aplicação

### Funções Principais

- `onMarkerFound()`: Chamada quando o marcador é detectado
- `onMarkerLost()`: Chamada quando o marcador é perdido
- `selectPlanet(id)`: Seleciona um planeta e mostra informações
- `deselectPlanet()`: Deseleciona o planeta atual
- `playPlanetAudio(id)`: Reproduz áudio do planeta
- `stopAudio()`: Para o áudio atual
- `showOnlyPlanet(id)`: Mostra apenas um planeta
- `showAllPlanets()`: Mostra todos os planetas

## 📄 Licença

Este projeto é educativo e pode ser usado livremente para fins educacionais.

## 👨‍💻 Desenvolvido Para

- Crianças em idade escolar
- Professores e educadores
- Pais interessados em educação tecnológica
- Aprendizagem interativa do Sistema Solar

## 🔗 Links Úteis

- [A-Frame Documentation](https://aframe.io/docs/)
- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [Marcador Hiro](https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg)

---

**Divirta-se explorando o Sistema Solar em Realidade Aumentada! 🚀🌍**

"# rva" 
