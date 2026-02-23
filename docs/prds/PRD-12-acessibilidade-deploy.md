# PRD 12 - Acessibilidade, Deploy e Analytics

## Dependencia
- PRD 11 (Audio e Polish)

## Objetivo
Garantir acessibilidade, publicar o jogo na web com CI/CD e implementar analytics para monitorar uso. Ao final, o jogo deve estar publicado, acessivel e monitorado.

---

## Requisitos Funcionais

### 1. Acessibilidade

#### Comunicacao Visual (Daltonismo)
- **Regra**: nunca usar APENAS cor para comunicar informacao
- Todos os elementos criticos usam forma + cor:
  | Elemento | Cor | Forma adicional |
  |----------|-----|----------------|
  | Dano | Vermelho | Icone de "!" + screen shake |
  | Coleta | Amarelo/verde | Icone de "+" + animacao |
  | Agua | Azul | Ondulacao animada |
  | Perigo | Vermelho | Triangulo de perigo |
  | Seguro | Verde | Circulo/checkmark |
- Testar com simuladores de daltonismo (protanopia, deuteranopia, tritanopia)

#### Tipografia
- Fonte legivel: pixel font com boa legibilidade em tamanho pequeno
- Tamanho minimo: 16px equivalente (escalado com canvas)
- Contraste minimo: 4.5:1 ratio (WCAG AA)
- Sombra/outline em texto sobre fundos variados
- Texto em portugues claro, frases curtas

#### Opcoes de Acessibilidade (Tela de Opcoes)
| Opcao | Default | Descricao |
|-------|---------|-----------|
| Screen shake | Ligado | Desativar efeitos de trepidacao |
| Flash de dano | Ligado | Reduzir/desativar flash vermelho |
| Velocidade do jogo | Normal | Opcao de 75% speed (mais tempo de reacao) |
| Tamanho do HUD | Normal | Opcao de HUD maior |
| Subtitulos | Ligado | Textos em cutscenes/dialogos |

#### Subtitulos
- Todas as cutscenes com texto
- Texto da danca da chuva (se houver narracão)
- Fundo semi-transparente atras do texto
- Posicao: parte inferior da tela

#### Controles
- **Remapeamento**: jogador pode alterar teclas de acao
- **Teclas padrao**: preservadas como fallback
- **Interface de remapeamento**: tela dedicada nas opcoes
  - Mostra acao + tecla atual + "Pressione nova tecla"
  - Detecta conflitos e avisa
  - Botao "Restaurar padrao"
- **Touch controls**: tamanho dos botoes virtuais adequado (minimo 44x44px)
- **Persistencia**: mapeamento salvo no LocalStorage

### 2. Deploy (Vercel)

#### Configuracao
- **Plataforma**: Vercel (free tier)
- **Dominio**: vercel.app por padrao (custom domain opcional)
- **Build command**: `npm run build` (Vite)
- **Output directory**: `dist/`
- **Node version**: 20.x

#### CI/CD Pipeline (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
Trigger: push to main
Steps:
  1. Checkout
  2. Setup Node 20
  3. Install dependencies (npm ci)
  4. Lint (eslint)
  5. Type check (tsc --noEmit)
  6. Run tests
  7. Build (vite build)
  8. Deploy to Vercel (vercel --prod)
```

#### Preview Deployments
- Pull requests geram preview automatico na Vercel
- URL de preview postada como comentario no PR
- Permite QA visual antes de merge

#### Build Optimization
- **Code splitting**: Phaser carregado como chunk separado
- **Asset optimization**:
  - Imagens: comprimidas com sharp/imagemin
  - Audio: OGG primario, MP3 fallback
  - Tilemaps: JSON minificado
- **Cache headers**: assets com hash no nome (long-term cache)
- **Gzip/Brotli**: habilitado na Vercel por padrao

### 3. Performance

#### Metas
| Metrica | Meta | Como Medir |
|---------|------|------------|
| FPS | 60fps estavel | Phaser debug overlay + Chrome DevTools |
| First Contentful Paint | < 2s | Lighthouse |
| Time to Interactive | < 3s | Lighthouse |
| Bundle total | < 5MB | Build output |
| Memoria | < 200MB RAM | Chrome Task Manager |

#### Otimizacoes
- **Texture atlas**: sprites combinados em spritesheet (reduz draw calls)
- **Object pooling**: particulas e projeteis reutilizados (evita GC)
- **Culling**: objetos fora da camera nao sao renderizados
- **Audio sprites**: SFX combinados em arquivo unico
- **Lazy loading**: fases carregadas sob demanda (nao tudo no boot)

### 4. Analytics (Plausible)

#### Setup
- **Servico**: Plausible Analytics (LGPD-friendly, sem cookies)
- **Integracao**: script no index.html + eventos custom via API
- **Dominio**: configurar no dashboard Plausible

#### Eventos Trackeados
| Evento | Quando | Dados |
|--------|--------|-------|
| `game_started` | Clica "Jogar" | `{ newGame: boolean }` |
| `level_started` | Inicia uma fase | `{ level: number }` |
| `level_completed` | Completa uma fase | `{ level: number, time: seconds, lives: number, gotas: number }` |
| `game_over` | Perde todas as vidas | `{ level: number, section: string, deaths: number }` |
| `game_completed` | Completa Fase 3 | `{ totalTime: seconds, totalGotas: number, totalUmbus: number }` |
| `gota_collected` | Coleta gota | `{ level: number, gotaIndex: number }` |
| `rain_activated` | Ativa totem | `{ level: number, totemId: string }` |
| `diary_opened` | Abre diario | `{ entriesUnlocked: number }` |
| `checkpoint_reached` | Ativa checkpoint | `{ level: number, checkpointId: string }` |
| `settings_changed` | Muda opcao | `{ setting: string, value: any }` |

#### Dashboard
- Metricas principais:
  - Jogadores unicos / dia
  - Taxa de conclusao por fase
  - Ponto de desistencia mais comum
  - Tempo medio de sessao
  - Gotas coletadas (engajamento com conteudo educativo)

### 5. Testes Cross-Browser

#### Browsers Alvo
| Browser | Versao | Prioridade |
|---------|--------|-----------|
| Chrome | Ultimas 2 | Alta |
| Firefox | Ultimas 2 | Alta |
| Safari | Ultimas 2 | Alta |
| Edge | Ultimas 2 | Media |
| Samsung Internet | Ultima | Media |

#### Checklist de Testes
- [ ] Canvas renderiza corretamente
- [ ] Audio inicia apos interacao do usuario (autoplay policy)
- [ ] Touch controls funcionam em mobile
- [ ] LocalStorage funciona (save/load)
- [ ] Performance 60fps em desktop
- [ ] Performance 30fps+ em mobile mid-range
- [ ] Orientacao landscape forcada
- [ ] Fontes carregam corretamente

### 6. Testes em Dispositivos Mobile

#### Dispositivos Alvo
- iPhone 12+ (Safari)
- Samsung Galaxy S21+ (Chrome)
- Pixel 6+ (Chrome)
- iPad (Safari) - tablet

#### Checklist Mobile
- [ ] Touch controls responsivos
- [ ] Tamanho dos botoes adequado (44x44px minimo)
- [ ] Canvas escala corretamente
- [ ] Nao ha overflow/scroll indesejado
- [ ] Audio funciona apos primeiro toque
- [ ] Orientacao landscape detectada

---

## Arquitetura Sugerida

```
src/
  systems/
    AnalyticsManager.ts    # Wrapper para Plausible events
    AccessibilityManager.ts # Gerencia opcoes de acessibilidade
  ui/
    KeyRemapper.ts          # Interface de remapeamento de teclas
    AccessibilityOptions.ts # Opcoes na tela de settings
.github/
  workflows/
    deploy.yml              # CI/CD pipeline
    test.yml                # Testes automatizados
vercel.json                 # Configuracao Vercel
```

---

## Criterios de Aceite
- [ ] Acessibilidade: formas + cores em todos os elementos criticos
- [ ] Acessibilidade: fonte legivel, contraste 4.5:1+
- [ ] Acessibilidade: opcao de desativar screen shake e flash
- [ ] Acessibilidade: opcao de velocidade reduzida
- [ ] Acessibilidade: subtitulos em cutscenes
- [ ] Controles: remapeamento funcional com persistencia
- [ ] Controles: botoes touch 44x44px minimo
- [ ] Deploy: jogo acessivel via URL Vercel
- [ ] Deploy: CI/CD com lint, type check, testes e build
- [ ] Deploy: preview deployments em PRs
- [ ] Performance: 60fps desktop, 30fps+ mobile
- [ ] Performance: < 3s load, < 5MB bundle
- [ ] Analytics: Plausible integrado, 10+ eventos trackeados
- [ ] Analytics: dashboard com metricas principais
- [ ] Testes: funciona em Chrome, Firefox, Safari, Edge
- [ ] Testes: funciona em 3+ dispositivos mobile reais
- [ ] Audio: autoplay policy respeitada (inicia apos interacao)

---

## Entregavel
Jogo publicado, acessivel e monitorado.
