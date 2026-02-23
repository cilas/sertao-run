# PRD 02 - Plataformas e Terreno

## Dependencia
- PRD 01 (Player: Ze e Movimentacao)

## Objetivo
Implementar todos os tipos de plataformas e terreno do jogo, criando variedade mecanica e preparando a infraestrutura para a mecanica da chuva. Ao final, um mapa de teste deve demonstrar todos os tipos de terreno funcionando.

---

## Requisitos Funcionais

### 1. Solo Firme (Plataforma Estatica)
- Tile solido padrao
- Colisao por todos os lados
- Referencia: terreno pedregoso da caatinga
- Tile placeholder: marrom escuro 32x32

### 2. Solo Rachado (Desmorona)
- Aparencia: tiles com rachaduras visiveis
- Ao pisar: timer de 1.5s inicia, tiles tremem levemente
- Apos 1.5s: tiles desaparecem com animacao de queda (4 pedacos caem com gravidade)
- Respawn: tiles regeneram apos 5s (fade in)
- Aviso visual: rachaduras mais escuras que solo firme
- Tile placeholder: marrom claro com linhas pretas

### 3. Pedra Lisa (Menor Atrito)
- Atrito reduzido: friction = 0.2 (normal = 1.0)
- Ze desliza ao parar (desaceleracao gradual em vez de parada imediata)
- Velocidade maxima no deslizamento: mantém velocidade atual, decelera a 40px/s²
- Tile placeholder: cinza claro com brilho

### 4. Cacto Grande (Plataforma Segura)
- Sprite maior: 64x96px
- Colisao apenas no topo (one-way platform por cima)
- Laterais e base nao tem colisao
- Nao causa dano ao pular em cima
- Tile placeholder: verde escuro com formato cilindrico

### 5. Espinhos: Unha-de-Gato
- Sprite: 32x16px no chao
- Causa 1 vida de dano ao tocar
- Dano apenas por colisao lateral ou por cima (nao por baixo de plataformas)
- Protegido pelo Gibao de Couro (PRD 03)
- Tile placeholder: linhas vermelhas pontiagudas

### 6. Espinhos: Cacto Pequeno
- Sprite: 32x32px
- Causa 1 vida de dano ao tocar lateralmente
- Topo: tambem causa dano (diferente do cacto grande)
- Protegido pelo Gibao de Couro (PRD 03)
- Tile placeholder: verde com espinhos vermelhos

### 7. Zona de Sol Escaldante
- Area visual (overlay semitransparente amarelo/laranja)
- Efeito: dreno lento de "resistencia" - indicador visual pisca
- Implementacao: apos 8s na zona, perde 1 vida
- Timer reseta ao sair da zona
- Indicador visual: borda da tela pulsa em vermelho dentro da zona
- Preparacao: desativada pela chuva (PRD 05)

### 8. Galho Seco (Plataforma Inativa)
- Estado seco (padrao): visualmente presente mas sem colisao (Ze passa atraves)
- Aparencia seca: marrom, sem folhas, semi-transparente (alpha 0.5)
- Estado molhado (pos-chuva, PRD 05): colisao ativa, verde, alpha 1.0
- Neste PRD: implementar apenas estado seco + sistema de flag para ativar/desativar
- Tile placeholder: linha marrom horizontal tracejada

### 9. Leito de Rio Seco (Buraco Mortal)
- Estado seco (padrao): buraco sem fundo, queda = morte instantanea
- Aparencia: fundo bege com rachaduras, bordas irregulares
- Estado molhado (pos-chuva, PRD 05): agua nadavel
- Neste PRD: implementar apenas estado seco (morte por queda)
- Tile placeholder: bege com linhas onduladas

---

## Configuracao no Tiled

Cada tipo de terreno deve ser configuravel via custom properties no Tiled:

| Property | Tipo | Valores |
|----------|------|---------|
| `terrainType` | string | `solid`, `cracked`, `slippery`, `cactusLarge`, `thorns`, `cactusSmall`, `sunZone`, `dryBranch`, `dryRiver` |
| `respawnTime` | float | Tempo em segundos para regenerar (solo rachado) |
| `frictionMultiplier` | float | Multiplicador de atrito (pedra lisa) |
| `damageAmount` | int | Quantidade de dano |
| `sunDrainTime` | float | Tempo em segundos ate causar dano (zona de sol) |
| `rainActivated` | bool | Se muda de estado com chuva |

---

## Arquitetura Sugerida

```
src/
  entities/
    platforms/
      Platform.ts           # Classe base
      CrackedPlatform.ts    # Solo rachado com timer
      SlipperyPlatform.ts   # Pedra lisa
      CactusLarge.ts        # Cacto grande (one-way)
      DryBranch.ts          # Galho seco (inativo/ativo)
      DryRiver.ts           # Leito de rio seco
    hazards/
      Thorns.ts             # Espinhos (unha-de-gato + cacto pequeno)
      SunZone.ts            # Zona de sol escaldante
  systems/
    TerrainManager.ts       # Gerencia tipos de terreno e propriedades do Tiled
```

---

## Mapa de Teste

Mapa dedicado (3200x800px) com secoes para cada tipo:
1. **Secao 1**: Solo firme + buracos (baseline)
2. **Secao 2**: Solo rachado em sequencia (testar timing)
3. **Secao 3**: Pedra lisa em descida (testar deslizamento)
4. **Secao 4**: Cactos grandes como plataformas
5. **Secao 5**: Corredor de espinhos (unha-de-gato + cacto pequeno)
6. **Secao 6**: Zona de sol escaldante (area aberta)
7. **Secao 7**: Galhos secos (visiveis mas intangiveis)
8. **Secao 8**: Leito de rio seco (buraco mortal)

---

## Criterios de Aceite
- [ ] Solo firme: colisao funcional em todos os lados
- [ ] Solo rachado: desmorona em 1.5s, regenera em 5s
- [ ] Solo rachado: feedback visual de tremor antes de cair
- [ ] Pedra lisa: Ze desliza ao parar de andar
- [ ] Cacto grande: Ze pula em cima sem dano, passa pelos lados
- [ ] Unha-de-gato: causa dano ao tocar, responde a invencibilidade
- [ ] Cacto pequeno: causa dano por todos os lados
- [ ] Zona de sol: dreno apos 8s, indicador visual, reseta ao sair
- [ ] Galho seco: visivel mas sem colisao (estado seco)
- [ ] Galho seco: tem flag para alternar estado (preparacao para chuva)
- [ ] Leito de rio seco: queda = morte
- [ ] Propriedades configuraveis via Tiled custom properties
- [ ] Mapa de teste com todas as secoes funcionando

---

## Entregavel
Mapa de teste com todos os tipos de terreno funcionando.
