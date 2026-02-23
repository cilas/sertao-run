# PRD 08 - Fase 1: O Sertao Seco

## Dependencia
- PRD 02 (Plataformas e Terreno)
- PRD 03 (Power-ups e Coletaveis)
- PRD 04 (Fauna)

## Objetivo
Criar a primeira fase completa do jogo com level design, onboarding integrado e todos os elementos mecanicos introduzidos gradualmente. Ao final, a fase deve ser jogavel do inicio ao fim em 3-5 minutos.

---

## Requisitos Funcionais

### 1. Contexto da Fase
- **Nome**: O Sertao Seco
- **Ambiente**: Planicie arida, cactos, solo rachado, ceu limpo
- **Narrativa**: Ze inicia sua jornada saindo da vila em direcao ao sertao
- **Foco educativo**: Flora da caatinga, adaptacao ao clima seco
- **Dificuldade**: Facil (tutorial integrado)
- **Duracao alvo**: 3-5 minutos

### 2. Estrutura do Level Design

O mapa deve ser linear com areas de exploracao opcionais. Divisao em secoes:

#### Secao A - Corredor de Onboarding (0-30s)
- **Objetivo**: ensinar andar e pular sem texto
- Corredor reto e seguro (sem inimigos, sem buracos)
- Umbus posicionados em arco guiando o pulo
- Placa de madeira no cenario com icone de setas (movimento)
- Primeiro buraco pequeno (1 tile) para ensinar pulo
- Placa com icone de espaco (pulo) antes do buraco

#### Secao B - Primeiros Desafios (30s-1min)
- Solo rachado introduzido (1 plataforma, queda nao-letal - chao logo abaixo)
- Placa de madeira com icone de "!" (perigo)
- Espinho de unha-de-gato em local visivel e evitavel
- Primeiro Gibao de Couro no caminho (testar protecao nos espinhos seguintes)
- Corredor com espinhos que exige gibao ou pulo cuidadoso

#### Secao C - Plataformas Verticais (1-2min)
- Secao de plataformas em alturas variadas
- Cactos grandes como plataformas seguras
- Solo rachado em sequencia (timing)
- Primeira Gota de Orvalho: escondida em plataforma alta, fora do caminho principal
- Umbus em trilha guiando para area secreta

#### Secao D - Calango Zone (2-3min)
- Primeiro Calango introduzido
- Area aberta com aviso de poeira antes do calango aparecer
- Sequencia de 3 calangos com timing para passar
- Segunda Gota de Orvalho: atras de barreira que exige timing perfeito com calango
- Checkpoint #1 (bandeirola) apos esta secao

#### Secao E - Zona de Sol + Pedra Lisa (3-4min)
- Zona de sol escaldante (area aberta sem sombra)
- Pedra lisa em descida (deslizamento + controle)
- Combinacao: pedra lisa levando a espinhos (exige frenagem cuidadosa)
- Fruto do Mandacaru: item de pulo duplo para alcancar plataforma alta
- Terceira Gota de Orvalho: acessivel apenas com pulo duplo do Mandacaru

#### Secao F - Corredor Final (4-5min)
- Checkpoint #2 (bandeirola)
- Sequencia intensa: solo rachado + calango + espinhos
- Combina todas as mecanicas aprendidas
- Corredor final com umbus em abundancia
- Ponto de chegada: area aberta com visual de "fim de caminho"

### 3. Placas de Madeira (Dicas Visuais)
- **Sprite placeholder**: retangulo marrom 48x32 com icone
- **Tipos de icone**:
  | Icone | Significado |
  |-------|-------------|
  | Setas | Mova-se |
  | Espaco | Pule |
  | "!" | Perigo |
  | Seta baixo | Agache |
  | "E" | Interaja |
- **Sem texto**: apenas icones (acessivel para todas as idades)
- **Posicao**: fixas no cenario, nao interativas

### 4. Distribuicao de Coletaveis

| Item | Quantidade | Localizacao |
|------|-----------|-------------|
| Umbu | ~80 | Trilhas guia, arcos de pulo, areas secretas |
| Gibao de Couro | 2 | Secao B (obrigatorio), Secao E (opcional) |
| Fruto do Mandacaru | 1 | Secao E (necessario para Gota #3) |
| Gota de Orvalho #1 | 1 | Secao C - plataforma alta escondida |
| Gota de Orvalho #2 | 1 | Secao D - atras de barreira de calango |
| Gota de Orvalho #3 | 1 | Secao E - acessivel com pulo duplo |
| Checkpoints | 2 | Apos Secao D, apos Secao E |

### 5. Tilemap (Tiled)

**Dimensoes**: 6400x800px (200x25 tiles de 32x32)

**Layers**:
| Layer | Tipo | Conteudo |
|-------|------|----------|
| Background | Tile | Ceu, montanhas distantes |
| Terrain | Tile | Solo, plataformas, cactos |
| Decorations | Tile | Pedras, arbustos, rachaduras |
| Objects | Object | Coletaveis, fauna, checkpoints, placas |
| Collision | Tile | Colisao invisivel |

**Paleta de tiles (placeholder ou arte basica)**:
- Ceu azul claro
- Solo: marrom/bege com variacao
- Cacto grande: verde com espinhos
- Cacto pequeno: verde menor
- Pedras: cinza variado
- Espinhos: vermelho/marrom

### 6. Background/Parallax
- **Layer 1** (fundo): ceu com nuvens esparsas (scroll 0.1x)
- **Layer 2** (meio): serras/montanhas distantes (scroll 0.3x)
- **Layer 3** (proximo): arbustos e pedras decorativas (scroll 0.7x)
- **Layer 4** (frente): gameplay layer (scroll 1.0x)

---

## Balanceamento

| Parametro | Valor | Justificativa |
|-----------|-------|---------------|
| Vidas iniciais | 3 | Padrao do jogo |
| Calangos na secao D | 3 | Introducao gradual |
| Distancia entre checkpoints | ~1600px | ~2 minutos de jogo |
| Espinhos evitaveis | 80%+ | Fase facil, maioria evitavel |
| Buracos mortais | Poucos, rasos | Fase de aprendizado |

---

## Criterios de Aceite
- [ ] Fase carrega corretamente via selecao de fase
- [ ] Onboarding: primeiros 30s ensinam andar e pular sem texto
- [ ] Placas de madeira com icones claros
- [ ] Todas as mecanicas do PRD 02 presentes e funcionais
- [ ] Calango funciona conforme PRD 04
- [ ] Gibao e Mandacaru funcionam conforme PRD 03
- [ ] 3 Gotas de Orvalho em locais escondidos mas alcancaveis
- [ ] ~80 umbus distribuidos coerentemente
- [ ] 2 checkpoints salvam progresso
- [ ] Duracao alvo: 3-5 minutos para jogador medio
- [ ] Dificuldade: completavel sem game over por jogador atento
- [ ] Parallax background funcional
- [ ] Ponto de chegada funcional (trigger de vitoria)
- [ ] Fase completavel do inicio ao fim

---

## Entregavel
Fase 1 jogavel do inicio ao fim.
