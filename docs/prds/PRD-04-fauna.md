# PRD 04 - Fauna

## Dependencia
- PRD 01 (Player: Ze e Movimentacao)

## Objetivo
Implementar os 3 animais do jogo (Tatu-Bola, Asa-Branca, Calango) com comportamentos distintos e padroes de patrulha configuraveis. Ao final, um mapa de teste deve demonstrar os 3 animais funcionando.

---

## Requisitos Funcionais

### 1. Tatu-Bola
**Referencia real**: Tatu-bola (Tolypeutes tricinctus), unico no Brasil, se enrola para se proteger.

**Sprite placeholder**: Circulo cinza 32x32 (aberto) / circulo perfeito (fechado)

**Comportamento**:
- **Patrulha**: anda lentamente entre 2 pontos (velocidade: 60px/s)
- **Detecao**: ao avistar Ze (distancia < 200px na horizontal, mesma plataforma), enrola-se e rola na direcao dele
- **Rolagem**: velocidade 180px/s, em linha reta
- **Colisao lateral com Ze**: Ze toma 1 vida de dano + knockback
- **Pular na cabeca**: Tatu para, se fecha em bola (nao morre)
- **Tatu parado (em bola)**: pode ser empurrado por Ze (andar contra ele)
  - Velocidade de empurrar: 80px/s
  - Tatu empurrado ativa botoes de pressao ao colidir
- **Recuperacao**: apos 10s parado, tatu abre e volta a patrulhar
- **Gravidade**: afetado por gravidade, nao cai de plataformas durante patrulha (edge detection)

**Interacao com botoes de pressao** (puzzle):
- Botao de pressao: tile no chao que ativa mecanismo quando peso esta sobre ele
- Mecanismo: abre porta/barreira proxima
- Tatu em bola sobre botao = botao ativado
- Preparacao para puzzles nas fases

### 2. Asa-Branca
**Referencia real**: Asa-branca (Patagioenas picazuro), ave que migra quando a seca aperta. Referencia a musica de Luiz Gonzaga.

**Sprite placeholder**: Triangulo branco 48x24 (formato de ave)

**Comportamento**:
- **Voo**: padrao senoidal (amplitude: 40px, frequencia: 0.5Hz)
- **Trajetoria**: voa entre ponto A e ponto B horizontalmente
- **Velocidade**: 80px/s horizontal
- **Ze pula nas costas**: serve como plataforma movel
  - Colisao one-way (apenas por cima)
  - Ze fica "grudado" na ave (move junto)
  - Timer: maximo 4 segundos sobre a ave
  - Apos 4s: ave desce suavemente (velocidade Y: 60px/s) ate Ze cair
  - Visual: ave pisca nos ultimos 1.5s (aviso)
- **Sem dano**: nao causa dano ao Ze em nenhuma circunstancia
- **Nao e afetada por pulo na cabeca**: apenas serve como plataforma

**Estado pos-chuva** (preparacao para PRD 05):
- Flag `rainActive`: quando true, amplitude do voo aumenta para 80px
- Neste PRD: implementar a flag, mas manter `rainActive = false`

### 3. Calango
**Referencia real**: Calango (lagartos do genero Tropidurus), muito rapidos no sertao.

**Sprite placeholder**: Retangulo verde 40x16 (formato de lagarto)

**Comportamento**:
- **Oculto**: comeca fora da tela ou atras de elemento
- **Aviso**: 1s antes de aparecer, particulas de poeira surgem na posicao de spawn
- **Corrida**: corre em linha reta a alta velocidade (300px/s)
- **Direcao**: sempre horizontal, direcao configuravel (esquerda ou direita)
- **Colisao com Ze**: knockback forte (300px/s, 300ms) mas SEM dano
- **Atravessa terreno**: nao colide com plataformas (corre por cima de tudo)
- **Ciclo**: apos sair da tela, espera cooldown (5s) e repete
- **Spawn trigger**: ativado quando Ze entra em zona de trigger (Tiled region)

---

## Padroes de Patrulha (Tiled Config)

Cada animal configurado via custom properties no Tiled:

### Tatu-Bola
| Property | Tipo | Descricao |
|----------|------|-----------|
| `faunaType` | string | `tatuBola` |
| `patrolPointA` | point | Ponto inicial de patrulha |
| `patrolPointB` | point | Ponto final de patrulha |
| `detectionRange` | float | Raio de detecao (default: 200) |
| `rollSpeed` | float | Velocidade de rolagem (default: 180) |

### Asa-Branca
| Property | Tipo | Descricao |
|----------|------|-----------|
| `faunaType` | string | `asaBranca` |
| `flightPointA` | point | Ponto A do voo |
| `flightPointB` | point | Ponto B do voo |
| `amplitude` | float | Amplitude senoidal (default: 40) |
| `frequency` | float | Frequencia do voo (default: 0.5) |
| `rideMaxTime` | float | Tempo maximo sobre a ave (default: 4) |

### Calango
| Property | Tipo | Descricao |
|----------|------|-----------|
| `faunaType` | string | `calango` |
| `direction` | string | `left` ou `right` |
| `runSpeed` | float | Velocidade (default: 300) |
| `cooldown` | float | Tempo entre corridas (default: 5) |
| `triggerZone` | rect | Area que ativa o calango |

---

## Arquitetura Sugerida

```
src/
  entities/
    fauna/
      Fauna.ts            # Classe base (sprite, hitbox, estado)
      TatuBola.ts         # Patrulha, rolagem, empurrar
      AsaBranca.ts        # Voo senoidal, plataforma movel
      Calango.ts          # Corrida rapida, trigger
    interactables/
      PressurePlate.ts    # Botao de pressao (ativado por peso)
      Barrier.ts          # Barreira que abre com botao
  systems/
    FaunaManager.ts       # Spawn e gerencia de fauna por mapa
```

---

## Mapa de Teste

Mapa dedicado (4000x800px) com secoes:
1. **Secao Tatu**: plataforma plana com Tatu patrulhando, botao de pressao + barreira
2. **Secao Asa-Branca**: gap grande que so pode ser cruzado montando na ave
3. **Secao Calango**: corredor com multiplos calangos, timing para passar
4. **Secao Mista**: todos os animais juntos em cenario mini-fase

---

## Criterios de Aceite
- [ ] Tatu-Bola: patrulha entre 2 pontos
- [ ] Tatu-Bola: detecta Ze e rola na direcao dele
- [ ] Tatu-Bola: dano ao colidir lateralmente
- [ ] Tatu-Bola: pulo na cabeca o fecha em bola (para)
- [ ] Tatu-Bola: pode ser empurrado quando em bola
- [ ] Tatu-Bola: empurrado sobre botao de pressao ativa mecanismo
- [ ] Tatu-Bola: volta a patrulhar apos 10s
- [ ] Asa-Branca: voa em padrao senoidal
- [ ] Asa-Branca: Ze monta e viaja como plataforma movel
- [ ] Asa-Branca: desce apos 4s, aviso visual nos ultimos 1.5s
- [ ] Asa-Branca: flag rainActive implementada (inativa)
- [ ] Calango: aviso de poeira 1s antes
- [ ] Calango: corre rapido em linha reta
- [ ] Calango: knockback sem dano ao colidir com Ze
- [ ] Calango: repete apos cooldown
- [ ] Todos configuraveis via Tiled custom properties

---

## Entregavel
3 animais com comportamentos distintos em mapa de teste.
