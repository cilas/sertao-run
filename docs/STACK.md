# Stack Tecnica - Sertao Run

## Visao Geral

Jogo de plataforma 2D educativo rodando na web. A stack prioriza performance em dispositivos mid-range, developer experience e compatibilidade cross-browser.

---

## Game Engine: Phaser 3

- **Versao**: 3.80+ (ultima estavel)
- **Por que Phaser**: Engine 2D madura com 10+ anos de ecossistema. Suporte nativo a tilemaps, spritesheets, fisica arcade, sistema de cenas e input touch/teclado. Comunidade ativa com milhares de exemplos.
- **Alternativas descartadas**:
  - *PixiJS*: Renderer puro, exigiria construir sistemas de fisica e cena do zero
  - *Kaboom.js*: Mais simples, porem menos controle e comunidade menor
  - *Unity WebGL*: Bundle muito pesado (>20MB) para um jogo educativo web

### Modulos do Phaser utilizados
| Modulo | Uso no Jogo |
|--------|------------|
| Arcade Physics | Colisoes, gravidade, movimentacao do Ze e fauna |
| Tilemap | Carregamento de mapas criados no Tiled |
| Sprite / Animation | Spritesheets do Ze, fauna e efeitos |
| Scene Manager | Transicao entre fases, HUD, menus |
| Input | Teclado (desktop) e touch (mobile) |
| Camera | Seguir o Ze, shake em dano, zoom em cutscenes |
| Loader | Carregamento assincrono de assets com barra de progresso |

---

## Linguagem: TypeScript

- **Versao**: 5.4+
- **Por que TypeScript**: Type safety previne bugs comuns em jogos (propriedades undefined em entidades, parametros trocados em colisoes). Autocompletar do Phaser funciona perfeitamente com os tipos oficiais (`@types/phaser` nao necessario - Phaser 3 ja inclui tipos).
- **Config relevante**:
  - `strict: true`
  - `target: ES2020`
  - `moduleResolution: bundler`

---

## Build: Vite

- **Versao**: 6+
- **Por que Vite**: HMR instantaneo durante desenvolvimento (critico para iterar game design). Build de producao com tree-shaking e code splitting por fase. Suporte nativo a TypeScript sem config extra.
- **Plugins**:
  - `vite-plugin-static-copy` - copia tilemaps e assets para o build
- **Config relevante**:
  - Chunk splitting por cena/fase (lazy loading)
  - Asset inlining para sprites pequenos (<4KB)
  - Gzip/Brotli no output de producao

---

## Criacao de Assets

### Sprites e Animacoes: Aseprite

- **Formato de saida**: Spritesheet PNG + JSON (atlas)
- **Resolucao**: Sprites em 16x16 ou 32x32 pixels, escalados 2x-4x no render
- **Workflow**: Aseprite exporta spritesheet -> Phaser carrega via `this.load.atlas()`
- **Paleta de cores**:
  - Seco: marrom (#8B6914), ocre (#C4A35A), verde seco (#6B8E23), ceu (#87CEEB)
  - Pos-chuva: verde vivo (#228B22), azul rio (#4169E1), terra umida (#654321)

### Mapas de Fase: Tiled Map Editor

- **Formato de saida**: JSON (Tiled JSON format)
- **Tile size**: 16x16 pixels
- **Layers utilizadas**:
  | Layer | Tipo | Conteudo |
  |-------|------|----------|
  | ground | Tile Layer | Solo firme, solo rachado, pedra lisa |
  | vegetation | Tile Layer | Cactos, galhos secos/vivos, espinhos |
  | water | Tile Layer | Leitos de rio (seco e cheio) |
  | entities | Object Layer | Spawn do Ze, fauna, power-ups, totens de chuva |
  | collectibles | Object Layer | Umbus, Gotas de Orvalho |
  | triggers | Object Layer | Checkpoints, transicoes, zonas de sol |
- **Custom Properties no Tiled**: tipo de solo, comportamento pos-chuva, direcao de patrulha da fauna

---

## Audio: Howler.js (via Phaser Sound Manager)

- **Formatos**: MP3 (compatibilidade) + OGG (qualidade/tamanho)
- **Categorias de audio**:
  | Categoria | Controle | Exemplos |
  |-----------|---------|----------|
  | Musica | Volume independente, loop | Tema do sertao, tema pos-chuva |
  | SFX | Volume independente, one-shot | Pulo, coleta, dano |
  | Ambiente | Volume independente, loop | Vento seco, chuva, rio correndo |
- **Consideracoes mobile**: Audio so inicia apos primeira interacao do usuario (politica de autoplay dos browsers)

---

## Testes

### Unitarios e Integracao: Vitest

- **Por que Vitest**: Mesma config do Vite, rapido, API compativel com Jest
- **O que testar**:
  - Logica de mecanicas (timer da chuva, degradacao do solo rachado)
  - Sistema de save/load (serializar e deserializar estado)
  - Calculo de coletaveis (100 umbus = 1 vida)
  - Comportamento da fauna (padroes de movimento)
  - Transicoes de estado do Ze (normal -> gibao -> dano)

### E2E: Playwright

- **O que testar**:
  - Fluxo completo: menu -> fase 1 -> vitoria
  - Input de teclado movimenta o Ze
  - Coleta de itens atualiza HUD
  - Save persiste apos reload
  - Touch controls funcionam em viewport mobile

---

## Hospedagem e Deploy

### Opcao primaria: Vercel

- Deploy automatico via push no `main`
- CDN global (bom para escolas em regioes remotas)
- Preview deploys por PR
- Gratis para projetos open source

### Opcao alternativa: GitHub Pages

- Zero custo, zero dependencia externa
- Build via GitHub Actions
- Limitacao: sem server-side, mas nao precisamos

### CI/CD: GitHub Actions

```
push -> lint + typecheck -> testes unitarios -> build -> deploy preview
merge main -> testes e2e -> deploy producao
```

---

## Analytics: Plausible (self-hosted ou cloud)

- **Por que Plausible**: Leve (<1KB script), sem cookies, LGPD-compliant por padrao. Critico para uso em escolas onde privacidade de menores e obrigatoria.
- **Eventos customizados rastreados**:
  | Evento | Dados |
  |--------|-------|
  | `fase_iniciada` | numero da fase |
  | `fase_concluida` | numero da fase, tempo, vidas restantes |
  | `game_over` | fase, causa da morte |
  | `gota_coletada` | fase, qual gota (1-3) |
  | `diario_aberto` | qual entrada visualizada |
  | `chuva_ativada` | fase, momento (timestamp relativo) |

---

## Dependencias do Projeto

### Producao
| Pacote | Versao | Uso |
|--------|--------|-----|
| `phaser` | ^3.80 | Game engine |

### Desenvolvimento
| Pacote | Versao | Uso |
|--------|--------|-----|
| `typescript` | ^5.4 | Linguagem |
| `vite` | ^6.0 | Bundler e dev server |
| `vitest` | ^3.0 | Testes unitarios |
| `@playwright/test` | ^1.50 | Testes E2E |
| `eslint` | ^9.0 | Linting |
| `prettier` | ^3.0 | Formatacao |

> Principio: minimo de dependencias. Phaser ja inclui fisica, audio, input e rendering. Nao adicionar libs extras sem justificativa clara.

---

## Estrutura de Diretorios

```
caatinga_game/
  src/
    main.ts                 # Entry point, config do Phaser
    scenes/
      BootScene.ts          # Carregamento inicial de assets
      MenuScene.ts          # Tela titulo e selecao de fase
      HUDScene.ts           # Overlay com vidas, umbus, timer
      DiarioScene.ts        # Diario de Bordo
      phases/
        SertaoSecoScene.ts  # Fase 1
        LeitoDoRioScene.ts  # Fase 2
        SerraNascenteScene.ts # Fase 3
    entities/
      Player.ts             # Ze e seus estados
      fauna/
        TatuBola.ts
        AsaBranca.ts
        Calango.ts
      powerups/
        Gibao.ts
        FrutoMandacaru.ts
      collectibles/
        Umbu.ts
        GotaOrvalho.ts
    mechanics/
      RainSystem.ts         # Mecanica da chuva e transicao
      CrackedGround.ts      # Solo rachado com timer
      WaterBody.ts          # Rios intermitentes
      Checkpoint.ts         # Sistema de checkpoints
    systems/
      InputManager.ts       # Abstrai teclado e touch
      SaveManager.ts        # LocalStorage save/load
      AudioManager.ts       # Musica, SFX, ambiente
    config/
      constants.ts          # Velocidades, timers, balanceamento
      animations.ts         # Definicoes de animacoes
  public/
    assets/
      sprites/              # Spritesheets PNG + JSON
      tilemaps/             # Mapas do Tiled (JSON + tilesets)
      audio/
        music/              # Trilha sonora (MP3 + OGG)
        sfx/                # Efeitos sonoros
        ambient/            # Sons ambiente
      fonts/                # Fontes bitmap para HUD
  tests/
    unit/                   # Testes Vitest
    e2e/                    # Testes Playwright
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  .eslintrc.js
  .prettierrc
```

---

## Requisitos de Ambiente de Desenvolvimento

- **Node.js**: 20 LTS+
- **Gerenciador de pacotes**: npm
- **Editor recomendado**: VSCode com extensoes Phaser Editor 2D, ESLint, Prettier
- **Ferramentas de arte**: Aseprite (sprites), Tiled (mapas)
- **Sistema operacional**: Qualquer (Linux, macOS, Windows)
