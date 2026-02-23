# PRD 06 - HUD, Menus e Save

## Dependencia
- PRD 03 (Power-ups e Coletaveis)

## Objetivo
Implementar toda a interface do jogo: HUD in-game, telas de menu, sistema de save com checkpoints e fluxo completo de navegacao. Ao final, o jogo deve ter fluxo completo menu -> jogo -> vitoria/game over -> menu.

---

## Requisitos Funcionais

### 1. HUD Overlay (In-Game)

Elementos fixos na tela durante gameplay:

| Elemento | Posicao | Visual |
|----------|---------|--------|
| Vidas (chapeus) | Topo esquerdo | 3 icones de chapeu (cheio = ativo, vazio = perdido) |
| Umbus coletados | Topo esquerdo, abaixo das vidas | Icone umbu + "x 42" |
| Gotas da fase | Topo direito | 3 icones de gota (colorida = coletada, cinza = nao) |
| Power-up ativo | Abaixo das gotas | Icone + barra de timer (Mandacaru) |
| Indicador de chuva | Centro topo | Barra de timer quando chuva ativa |

**Specs do HUD**:
- Margem: 16px de cada borda
- Tamanho dos icones: 24x24px
- Fonte: sistema monospace, tamanho 16px, cor branca com sombra preta 1px
- Alpha do HUD: 0.9 (levemente transparente)
- HUD nao interfere com gameplay (camada fixa acima do jogo)
- Animacao ao ganhar/perder vida: icone pulsa (scale 1.0 -> 1.3 -> 1.0, 300ms)
- Animacao ao coletar umbu: contador faz bump (+1 aparece e sobe)

### 2. Tela Titulo
- **Nome do jogo**: "Sertao Run" em pixel font grande (centro da tela)
- **Subtitulo**: "A Jornada da Agua" menor abaixo
- **Background**: imagem estatica ou parallax simples do sertao
- **Opcoes**:
  - "Jogar" (destaque, selecao padrao)
  - "Continuar" (aparece apenas se save existe)
  - "Opcoes"
  - "Diario" (aparece apenas se alguma gota coletada)
- **Navegacao**: setas + Enter (teclado) ou click/tap
- **Animacao**: Ze idle animado no canto, elementos com fade in ao carregar

### 3. Selecao de Fase
- **Layout**: 3 blocos horizontais representando as fases
- **Fase 1**: sempre desbloqueada
- **Fase 2**: desbloqueada ao completar Fase 1
- **Fase 3**: desbloqueada ao completar Fase 2
- **Visual por fase**:
  - Desbloqueada: thumbnail colorido + nome da fase + estrelas de gotas (0-3)
  - Bloqueada: thumbnail cinza + icone de cadeado
- **Selecao**: setas + Enter ou click/tap
- **Transicao**: fade to black -> carrega fase -> fade from black

### 4. Tela de Game Over
- **Trigger**: Ze perde todas as vidas
- **Visual**: tela escurece, texto "Fim de Jogo" com efeito de queda
- **Estatisticas**: umbus coletados, gotas encontradas na tentativa
- **Opcoes**:
  - "Tentar Novamente" (reinicia no ultimo checkpoint)
  - "Voltar ao Menu"
- **Delay**: 1.5s antes de mostrar opcoes (evitar click acidental)

### 5. Tela de Vitoria (Fase Completa)
- **Trigger**: Ze atinge o ponto final da fase
- **Visual**: tela com fundo alegre, "Fase Completa!" grande
- **Estatisticas**:
  - Gotas coletadas: X/3 (icones)
  - Umbus coletados na fase
  - Vidas restantes
- **Opcoes**:
  - "Proxima Fase" (se houver)
  - "Replay" (jogar novamente a mesma fase)
  - "Menu"
- **Animacao**: Ze comemora (placeholder: pula no lugar)

### 6. Tela de Opcoes
- **Volume Musica**: slider 0-100% (default 70%)
- **Volume SFX**: slider 0-100% (default 100%)
- **Voltar**: botao ou Escape
- **Persistencia**: salva em LocalStorage
- **Acessivel do menu e durante gameplay** (pausa o jogo se acessada in-game)

### 7. Sistema de Pausa (In-Game)
- **Ativar**: Escape ou botao de pausa (mobile)
- **Visual**: overlay escuro (alpha 0.6) + "Pausado" + opcoes
- **Opcoes**:
  - "Continuar"
  - "Opcoes"
  - "Voltar ao Menu" (confirmacao: "Progresso nao salvo sera perdido?")
- **Gameplay para**: fisica, animacoes, timers todos pausam
- **Audio**: musica baixa volume para 20%, SFX mudo

### 8. Sistema de Save (LocalStorage)

**Dados persistidos**:
```typescript
interface SaveData {
  version: number              // Versao do formato de save
  currentLevel: number         // 1, 2 ou 3
  checkpoint: string | null    // ID do checkpoint ou null (inicio)
  lives: number                // Vidas atuais
  totalUmbus: number           // Total de umbus (acumulado)
  gotasCollected: {            // Gotas por fase
    fase1: boolean[]           // [gota1, gota2, gota3]
    fase2: boolean[]
    fase3: boolean[]
  }
  diaryEntries: string[]       // IDs de entradas desbloqueadas
  settings: {
    musicVolume: number
    sfxVolume: number
  }
  lastSaved: string            // ISO timestamp
}
```

**Auto-save**:
- Salva ao passar por checkpoint
- Salva ao completar fase
- Salva ao coletar gota de orvalho

**Checkpoints** (Bandeirolas de Festa Junina):
- Sprite placeholder: mastro com bandeirolas coloridas 32x64
- Ativacao: Ze toca o checkpoint
- Visual: bandeirolas balancam + flash dourado
- Posicao: configuravel via Tiled
- Cada fase tem 2-3 checkpoints

### 9. Transicao entre Cenas
- **Fade to black**: 500ms
- **Loading**: minimo 200ms (evitar flash)
- **Fade from black**: 500ms
- Total: ~1.2s de transicao

---

## Arquitetura Sugerida

```
src/
  scenes/
    BootScene.ts           # Carrega assets essenciais
    TitleScene.ts          # Tela titulo
    LevelSelectScene.ts    # Selecao de fase
    GameScene.ts           # Gameplay (ja existe parcialmente)
    PauseScene.ts          # Overlay de pausa
    GameOverScene.ts       # Game over
    VictoryScene.ts        # Vitoria
    OptionsScene.ts        # Opcoes
  ui/
    HUD.ts                 # Overlay do gameplay
    Button.ts              # Componente botao reutilizavel
    Slider.ts              # Componente slider (volume)
    TransitionManager.ts   # Fade in/out entre cenas
  systems/
    SaveManager.ts         # LocalStorage CRUD
  entities/
    interactables/
      Checkpoint.ts        # Bandeirola de checkpoint
```

---

## Criterios de Aceite
- [ ] HUD: vidas, umbus, gotas e power-ups visiveis durante gameplay
- [ ] HUD: animacoes ao ganhar/perder vida e coletar itens
- [ ] Menu: tela titulo com opcoes funcionais
- [ ] Menu: "Continuar" aparece apenas com save existente
- [ ] Selecao de fase: 3 fases, bloqueio por progresso
- [ ] Game Over: estatisticas + retry/menu
- [ ] Vitoria: estatisticas + proxima fase/replay/menu
- [ ] Opcoes: sliders de volume funcionais e persistentes
- [ ] Pausa: gameplay para completamente, opcoes acessiveis
- [ ] Save: auto-save em checkpoints e completar fase
- [ ] Save: dados carregam corretamente ao "Continuar"
- [ ] Checkpoints: visual de bandeirola, ativacao por toque
- [ ] Transicoes: fade suave entre todas as telas
- [ ] Fluxo: menu -> selecao -> jogo -> vitoria/game over -> menu funciona

---

## Entregavel
Fluxo completo menu -> jogo -> vitoria/game over -> menu.
