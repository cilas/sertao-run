# PRD 01 - Player: Ze e Movimentacao

## Dependencia
- Setup concluido (issues #1-9)

## Objetivo
Implementar o personagem principal Ze com movimentacao completa, fisica basica e sistema de vidas. Ao final, Ze deve andar, correr, pular e colidir em um mapa de teste.

---

## Requisitos Funcionais

### 1. Sprite do Ze
- Sprite placeholder (retangulo colorido 32x48px ou sprite basico)
- Cores distintas para cada estado (normal, dano, gibao - preparacao futura)
- Hitbox retangular menor que o sprite visual (80% largura, 90% altura)

### 2. Movimentacao
| Acao | Teclado | Comportamento |
|------|---------|---------------|
| Andar | Setas / A-D | Velocidade: 160px/s |
| Correr | Shift + direcao | Velocidade: 240px/s |
| Pular | Espaco / W | Impulso vertical: -330px/s, so no chao |
| Agachar | S / Seta baixo | Hitbox reduz 50% altura, velocidade 0 |

### 3. Fisica
- Gravidade: 800px/s²
- Colisao com chao (plataforma estatica)
- Colisao com paredes laterais
- Sem pular no ar (single jump apenas neste PRD)
- Coyote time: 80ms apos sair da borda permite pular
- Jump buffering: 100ms antes de tocar o chao registra pulo

### 4. Estados do Personagem
| Estado | Comportamento |
|--------|---------------|
| Idle | Ze parado, animacao de respiracao (placeholder: sprite estatico) |
| Walking | Movimentacao normal |
| Running | Movimentacao rapida com Shift |
| Jumping | No ar (subindo ou descendo) |
| Crouching | Agachado, sem movimento horizontal |
| Hurt | Pisca (alpha toggle 0.3/1.0 a cada 100ms) por 2 segundos |
| Dead | Sem controle, cai da tela ou fade out |

### 5. Sistema de Vidas
- 3 vidas representadas por chapeus de couro
- Ao tomar dano: perde 1 vida, entra em estado Hurt (invencivel 2s)
- Knockback ao tomar dano: empurrado na direcao oposta (200px/s, 200ms)
- 0 vidas: estado Dead, reinicia no ultimo checkpoint (ou inicio do mapa)
- Vidas exibidas como placeholder no canto superior esquerdo (3 retangulos)

### 6. Camera
- Camera segue o Ze com lerp suave (lerp factor: 0.1)
- Limites da camera: nao ultrapassa bordas do mapa
- Deadzone central: 100x50px (Ze se move no centro sem mover camera)

### 7. Mapa de Teste
- Tilemap basico criado no Tiled (ou inline no codigo)
- Dimensoes: 3200x600px (4 telas de largura)
- Elementos:
  - Chao continuo com buracos para testar pulo
  - Plataformas em alturas variadas
  - Paredes para testar colisao lateral
  - Area de queda (morte por queda)
- Tileset placeholder: quadrados coloridos 32x32
  - Marrom: chao solido
  - Preto: vazio/buraco
  - Cinza: plataforma

---

## Requisitos Nao-Funcionais
- 60fps estavel
- Input lag < 16ms (1 frame)
- Fisica deterministica (mesma entrada = mesmo resultado)

---

## Arquitetura Sugerida

```
src/
  entities/
    Player.ts          # Classe principal do Ze
    PlayerStates.ts    # State machine para estados
  systems/
    InputManager.ts    # Abstrai teclado (futuro: touch)
  scenes/
    TestScene.ts       # Cena de teste com mapa basico
  config/
    PlayerConfig.ts    # Constantes de balanceamento
```

### PlayerConfig.ts (constantes)
```typescript
export const PLAYER_CONFIG = {
  speed: 160,
  runSpeed: 240,
  jumpVelocity: -330,
  gravity: 800,
  maxLives: 3,
  hurtDuration: 2000,    // ms
  hurtBlinkRate: 100,    // ms
  knockbackSpeed: 200,
  knockbackDuration: 200, // ms
  coyoteTime: 80,        // ms
  jumpBuffer: 100,       // ms
  cameraLerp: 0.1,
  cameraDeadzone: { width: 100, height: 50 },
} as const
```

---

## Criterios de Aceite
- [ ] Ze aparece no mapa de teste
- [ ] Ze anda para esquerda e direita com velocidade correta
- [ ] Ze corre ao segurar Shift
- [ ] Ze pula apenas quando no chao
- [ ] Coyote time funciona (pular ate 80ms apos sair da borda)
- [ ] Ze agacha e hitbox reduz
- [ ] Ze colide com chao e paredes
- [ ] Ze morre ao cair em buracos
- [ ] Sistema de 3 vidas funciona
- [ ] Dano causa piscar + invencibilidade de 2s
- [ ] Camera segue Ze com suavidade
- [ ] Camera nao ultrapassa limites do mapa
- [ ] Mapa de teste tem chao, buracos e plataformas

---

## Entregavel
Ze anda, pula e colide em um mapa de teste.
