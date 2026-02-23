# PRD 05 - Mecanica da Chuva

## Dependencia
- PRD 02 (Plataformas e Terreno)
- PRD 04 (Fauna)

## Objetivo
Implementar a mecanica core do jogo: o sistema de chuva que transforma o ambiente em tempo real. Inclui totem de chuva, efeitos visuais, transicao do mundo seco/molhado e natacao. Ao final, ativar o totem deve transformar o mapa visivelmente.

---

## Requisitos Funcionais

### 1. Totem de Chuva
- **Sprite placeholder**: Coluna vertical 32x96px com simbolos ondulados (agua)
- **Posicao**: fixo no mapa, configuravel via Tiled
- **Interacao**: Ze fica proximo (distancia < 48px) e pressiona E
- **Indicador**: icone "E" flutuante aparece quando Ze esta no alcance
- **Uso unico**: cada totem so pode ser ativado uma vez por tentativa da fase
- **Cooldown global**: nao pode ativar outro totem enquanto chuva esta ativa

### 2. Animacao de Danca da Chuva
- Ze para e executa animacao especial (placeholder: Ze pula 3x no lugar, 2s total)
- Jogador perde controle durante animacao
- Camera faz leve zoom out (10%) para mostrar area ao redor
- Transicao: tela escurece levemente (overlay cinza alpha 0.2) indicando nuvens

### 3. Efeito de Chuva (Particulas)
- **Particulas de chuva**: linhas branco-azuladas caindo do topo da tela
  - Quantidade: 200 particulas ativas
  - Velocidade Y: 400-600px/s (variacao aleatoria)
  - Velocidade X: -20 a -40px/s (leve angulo)
  - Tamanho: 2x8px
  - Alpha: 0.4-0.7
- **Inicio**: particulas comecam gradualmente (0 a 200 em 3s)
- **Fim**: particulas diminuem gradualmente (200 a 0 em 5s nos ultimos 5s)
- **Overlay de ceu**: cor do fundo muda de azul claro para cinza (tween 3s)
- **Sons**: placeholder de chuva (ruido branco leve)

### 4. Transicao do Mundo: Seco -> Molhado

**Timeline da chuva**:
```
0s     - Totem ativado, danca do Ze
2s     - Chuva comeca (particulas crescem)
5s     - Chuva maxima, transformacoes do mundo iniciam
5-10s  - Todas as transformacoes completam
60s    - Chuva para de cair
60-90s - Agua recua gradualmente, mundo volta ao seco
90s    - Mundo totalmente seco novamente
```

### 5. Transformacoes Ambientais

#### Rios Secos -> Agua Nadavel
- Leito de rio seco (PRD 02) preenche com agua
- Animacao: agua sobe de baixo, preenchendo o espaco (tween 3s)
- Agua tem visual azul semi-transparente com ondulacao (shader simples ou sprite animado)
- Buraco mortal -> area nadavel
- Recuo: agua desce gradualmente nos ultimos 30s

#### Galhos Secos -> Plataformas Verdes
- Galhos secos (PRD 02) ganham colisao e ficam verdes
- Animacao: cor muda de marrom para verde (tint tween 2s), alpha 0.5 -> 1.0
- Colisao ativa instantaneamente quando animacao completa
- Recuo: cor volta a marrom, colisao desativa

#### Cactos Florescem (Visual)
- Cactos grandes ganham flores coloridas no topo
- Efeito puramente visual (sem impacto mecanico)
- Animacao: flores brotam (scale 0 -> 1 em 1s)
- Recuo: flores murcham (scale 1 -> 0)

#### Asa-Branca Muda Padrao
- Flag `rainActive` (PRD 04) ativada
- Amplitude do voo: 40px -> 80px
- Comportamento: voa mais alto, mais util como plataforma
- Recuo: volta ao padrao normal

### 6. Sistema de Natacao

**Ativacao**: Ze entra em area de agua (rio preenchido pela chuva)

**Movimentacao na agua**:
| Acao | Comportamento |
|------|---------------|
| Mover horizontal | Velocidade: 100px/s (mais lento que andar) |
| Subir | W / Espaco: impulso para cima 120px/s |
| Descer | S: desce a 80px/s |
| Idle | Ze flutua (gravidade reduzida a 100px/s²) |
| Sair da agua | Pular na borda: impulso normal de pulo |

**Visual na agua**:
- Sprite do Ze muda (placeholder: azul mais escuro)
- Particulas de bolhas ao se mover
- Ondulacao na superficie da agua onde Ze esta

**Restricoes na agua**:
- Nao pode correr
- Nao pode agachar
- Nao pode usar pulo duplo (Mandacaru)
- Gibao funciona normalmente

---

## Gerenciamento de Estado

```typescript
interface RainState {
  active: boolean
  timeRemaining: number    // ms
  phase: 'inactive' | 'starting' | 'active' | 'receding' | 'ending'
  totemUsed: Map<string, boolean>  // totemId -> usado
}
```

**Fases**:
| Fase | Duracao | Descricao |
|------|---------|-----------|
| inactive | - | Sem chuva |
| starting | 5s | Particulas crescem, transformacoes iniciam |
| active | 55s | Chuva maxima, mundo molhado |
| receding | 25s | Chuva diminui, agua comeca a recuar |
| ending | 5s | Ultimas particulas, mundo quase seco |

---

## Configuracao no Tiled

| Property | Tipo | Descricao |
|----------|------|-----------|
| `objectType` | string | `rainTotem` |
| `totemId` | string | ID unico do totem |
| `rainDuration` | float | Duracao da chuva em segundos (default: 60) |
| `recedeDuration` | float | Duracao do recuo em segundos (default: 30) |
| `waterLevel` | float | Nivel maximo da agua nos rios (em pixels) |

---

## Arquitetura Sugerida

```
src/
  mechanics/
    RainSystem.ts          # Estado da chuva, timeline, fases
    RainParticles.ts       # Sistema de particulas de chuva
    WaterBody.ts           # Agua nadavel (rios preenchidos)
    SwimmingController.ts  # Controle do Ze na agua
  entities/
    interactables/
      RainTotem.ts         # Totem interativo
  systems/
    EnvironmentTransition.ts  # Gerencia transicoes seco/molhado
```

---

## Mapa de Teste

Mapa dedicado (3200x800px):
1. **Area inicial**: chao firme com totem de chuva acessivel
2. **Rio seco**: grande gap com leito de rio (mortal antes da chuva, nadavel depois)
3. **Galhos secos**: sequencia de galhos que viram plataformas com chuva
4. **Asa-Branca**: ave com padrao que muda com chuva
5. **Area final**: alcancavel apenas usando chuva (rio + galhos + ave)

---

## Criterios de Aceite
- [ ] Totem: interacao com E quando proximo
- [ ] Totem: indicador visual de proximidade
- [ ] Totem: uso unico por tentativa
- [ ] Danca: animacao placeholder do Ze (2s)
- [ ] Danca: jogador sem controle durante animacao
- [ ] Particulas: chuva comeca gradualmente e para gradualmente
- [ ] Particulas: visual convincente de chuva (quantidade, velocidade, angulo)
- [ ] Rios: agua sobe e preenche leito em 3s
- [ ] Rios: agua desce nos ultimos 30s
- [ ] Galhos: ficam verdes e ganham colisao
- [ ] Galhos: voltam a marrom e perdem colisao no recuo
- [ ] Cactos: florescem visualmente durante chuva
- [ ] Asa-Branca: muda amplitude de voo
- [ ] Natacao: Ze se move na agua com controles adaptados
- [ ] Natacao: visual diferente (sprite + bolhas)
- [ ] Natacao: restricoes aplicadas (sem correr, agachar, pulo duplo)
- [ ] Timeline: fases corretamente temporizadas (5s start, 55s active, 30s recede)
- [ ] Mapa de teste: area final so acessivel apos ativar chuva

---

## Entregavel
Ativar totem transforma o mapa em tempo real, Ze nada nos rios.
