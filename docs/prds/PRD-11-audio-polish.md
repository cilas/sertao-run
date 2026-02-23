# PRD 11 - Audio e Polish

## Dependencia
- PRD 10 (Fase 3 - jogo completavel)

## Objetivo
Adicionar trilha sonora, efeitos sonoros, sons ambiente e "juice" visual ao jogo completo. Ao final, o jogo deve ter audio completo e feedback visual polido.

---

## Requisitos Funcionais

### 1. Trilha Sonora (Chiptune)

Melodias inspiradas em baiao/xote em estilo 8-bit/chiptune.

| Track | Cena | Mood | BPM | Duracao | Loop |
|-------|------|------|-----|---------|------|
| Menu Theme | Tela titulo | Alegre, convidativo | 120 | 60s | Sim |
| Sertao Seco | Fase 1 | Melancolico, zabumba sutil | 100 | 90s | Sim |
| Leito do Rio | Fase 2 | Misterioso, expectativa | 90 | 90s | Sim |
| Pos-Chuva | Durante chuva (todas as fases) | Esperancoso, triangulo | 110 | 60s | Sim |
| Serra da Nascente | Fase 3 | Epico, determinado, sanfona | 130 | 120s | Sim |
| Gruta | Secao C da Fase 3 | Cavernoso, ecoante | 80 | 60s | Sim |
| Vitoria | Tela de vitoria | Celebracao, forro | 140 | 30s | Nao |
| Game Over | Tela de game over | Triste, breve | 70 | 10s | Nao |
| Cutscene Final | Cutscene da nascente | Emocional, grandioso | 100 | 30s | Nao |

**Especificacoes tecnicas**:
- Formato: OGG (primario) + MP3 (fallback)
- Bitrate: 128kbps
- Crossfade entre tracks: 1s
- Volume base: 70% (configuravel)
- Ferramentas sugeridas: BeepBox, FamiTracker, ou Bosca Ceoil

### 2. Efeitos Sonoros (SFX)

#### Acoes do Ze
| SFX | Trigger | Duracao | Descricao |
|-----|---------|---------|-----------|
| Pulo | Ao pular | 200ms | "Whoosh" ascendente |
| Pouso | Ao aterrissar (queda > 2 tiles) | 150ms | Impacto suave |
| Dano | Ao tomar hit | 300ms | "Ouch" sintetizado |
| Morte | Ao perder ultima vida | 500ms | Descendente triste |
| Nadar | Ao entrar na agua | 300ms | Splash |
| Nadar movimento | A cada braçada | 200ms | Agua movendo |

#### Coletaveis
| SFX | Trigger | Duracao | Descricao |
|-----|---------|---------|-----------|
| Umbu | Coletar umbu | 100ms | "Plim" agudo curto |
| Gota | Coletar gota | 800ms | Cristal magico |
| Gibao equip | Vestir gibao | 400ms | Armadura/equip |
| Gibao break | Perder gibao | 300ms | Quebra/crack |
| Mandacaru | Coletar fruto | 400ms | Power-up ascendente |
| Vida extra | 100 umbus | 1000ms | Fanfarra curta |

#### Ambiente e Mecanicas
| SFX | Trigger | Duracao | Descricao |
|-----|---------|---------|-----------|
| Chuva inicio | Chuva comeca | 2s (fade in) | Chuva crescente |
| Chuva loop | Durante chuva | Loop | Chuva constante |
| Chuva fim | Chuva para | 2s (fade out) | Chuva diminuindo |
| Rio enchendo | Agua subindo | 3s | Agua correndo crescente |
| Checkpoint | Ativar bandeirola | 500ms | Sino/sino de festa |
| Solo rachado | Solo comeca a rachar | 1s | Rachaduras |
| Solo caindo | Solo desmorona | 500ms | Pedras caindo |
| Totem | Interagir com totem | 1s | Magico/mistico |
| Danca chuva | Ze dancando | 2s | Ritmo de baiao |

#### Fauna
| SFX | Trigger | Duracao | Descricao |
|-----|---------|---------|-----------|
| Tatu rolando | Tatu em rolagem | Loop (durante rolo) | Rolamento pesado |
| Tatu fechando | Pular na cabeca | 300ms | Clank metalico |
| Asa-Branca | Proximo da ave | Loop suave | Batida de asas |
| Asa-Branca descendo | Apos 4s | 500ms | Asas rapidas |
| Calango poeira | 1s antes do calango | 500ms | Areia/poeira |
| Calango corrida | Calango passando | 300ms | Rapido/whoosh |

**Especificacoes tecnicas**:
- Formato: OGG (primario) + MP3 (fallback)
- Bitrate: 64kbps (SFX sao curtos)
- Volume base: 100% (configuravel)
- Simultaneidade: maximo 8 SFX simultaneos (evitar cacofonia)

### 3. Sons Ambiente

| Som | Cena | Volume | Descricao |
|-----|------|--------|-----------|
| Vento seco | Fases (sem chuva) | 20% | Vento leve constante |
| Cigarras | Fase 1, 2 | 15% | Cigarras distantes |
| Agua correndo | Pos-chuva, nascente | 30% | Rio correndo |
| Gotas caverna | Gruta (Fase 3) | 25% | Gotas pingando |
| Vento forte | Crista (Fase 3) | 35% | Vento uivando |

- Sons ambiente fazem crossfade com transicoes de area
- Ducking: volume ambiente reduz 50% durante SFX importantes

### 4. Juice Visual

#### Screen Shake
| Trigger | Intensidade | Duracao |
|---------|------------|---------|
| Tomar dano | 4px offset | 200ms |
| Solo desmoronando | 2px offset | 500ms |
| Totem ativado | 3px offset | 300ms |
| Cutscene (nascente) | 5px offset | 1000ms |

- Implementacao: offset aleatorio X/Y dentro da intensidade
- Decai linearmente ate 0
- **Opcao de desativar** nas configuracoes (acessibilidade)

#### Particulas
| Efeito | Trigger | Quantidade | Duracao |
|--------|---------|-----------|---------|
| Poeira ao pousar | Aterrissar | 5 particulas | 300ms |
| Folhas ao correr | Correr | 2/s | Continuo |
| Brilho ao coletar | Qualquer coleta | 8 particulas | 400ms |
| Bolhas nadar | Nadar | 3/s | Continuo |
| Flores chuva | Cacto florescendo | 10 | 1s |
| Confete vitoria | Tela de vitoria | 50 | 3s |

#### Squash & Stretch
| Animacao | Quando | Efeito |
|----------|--------|--------|
| Pulo (preparo) | Frame antes do pulo | Scale Y: 0.8, X: 1.2 (50ms) |
| Pulo (ar) | No ar subindo | Scale Y: 1.2, X: 0.8 |
| Pouso | Ao aterrissar | Scale Y: 0.7, X: 1.3 (100ms), retorna |
| Coleta | Ao coletar item | Item: Scale 1.3 -> 0 (200ms) |
| Dano | Ao tomar hit | Scale X: 1.3, Y: 0.8 (100ms), retorna |

#### Outros Efeitos
- **Flash de dano**: tela inteira pulsa vermelho (alpha 0.2, 100ms)
- **Slow motion**: ao morrer, 0.5x speed por 500ms antes de game over
- **Trail de pulo duplo**: 3 afterimages (alpha decrescente) durante pulo duplo
- **Glow items**: itens com point light animado (pulsa suavemente)

### 5. Transicoes Suaves
- **Entre fases**: fade to black (500ms) -> loading -> fade in (500ms)
- **Menu -> jogo**: slide lateral (800ms) + fade
- **Morte -> respawn**: tela escurece (300ms) -> respawn com flash branco (200ms)
- **Pausar**: blur gradual do jogo (300ms) + overlay

### 6. Tela "Gire o Celular"
- Detectar orientacao portrait em dispositivos mobile
- Exibir tela com icone de celular + seta circular
- Texto: "Gire o celular para jogar!"
- Jogo pausa automaticamente
- Remove overlay ao girar para landscape

---

## Arquitetura Sugerida

```
src/
  systems/
    AudioManager.ts       # Musica, SFX, ambiente
    JuiceManager.ts       # Screen shake, particulas, tweens
  effects/
    ScreenShake.ts        # Sistema de screen shake
    ParticlePresets.ts    # Presets de particulas
    SquashStretch.ts      # Sistema de squash/stretch
  ui/
    OrientationGuard.ts   # Detecta portrait e mostra overlay
  assets/
    audio/
      music/             # Tracks .ogg + .mp3
      sfx/               # Efeitos .ogg + .mp3
      ambient/           # Sons ambiente .ogg + .mp3
```

---

## Criterios de Aceite
- [ ] 9 tracks de musica (podem ser placeholders chiptune basicos)
- [ ] Crossfade suave entre tracks
- [ ] 25+ SFX implementados e associados aos triggers corretos
- [ ] Sons ambiente por area
- [ ] Volume configuravel (musica e SFX separados)
- [ ] Screen shake em todos os triggers listados
- [ ] Screen shake desativavel nas opcoes
- [ ] Particulas de poeira, brilho, bolhas funcionais
- [ ] Squash & stretch no pulo e pouso do Ze
- [ ] Flash de dano, slow motion na morte
- [ ] Transicoes suaves entre todas as cenas
- [ ] Tela "gire o celular" funcional em mobile
- [ ] Performance: 60fps mantido com todos os efeitos

---

## Entregavel
Jogo com audio completo e feedback visual polido.
