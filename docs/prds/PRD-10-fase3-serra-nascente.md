# PRD 10 - Fase 3: A Serra da Nascente

## Dependencia
- PRD 09 (Fase 2 - como referencia e prerequisito de progressao)

## Objetivo
Criar a terceira e ultima fase do jogo, combinando todas as mecanicas em terreno vertical desafiador, culminando na cutscene final. Ao final, o jogo deve ser completavel do inicio ao fim.

---

## Requisitos Funcionais

### 1. Contexto da Fase
- **Nome**: A Serra da Nascente
- **Ambiente**: Terreno montanhoso, subida verticalizada, nascente no topo
- **Narrativa**: Ze escala a serra para encontrar a Nascente Cristalina e salvar sua vila
- **Foco educativo**: Importancia das nascentes, preservacao hidrica
- **Dificuldade**: Dificil
- **Duracao alvo**: 7-10 minutos

### 2. Estrutura do Level Design

#### Secao A - Base da Serra (0-1.5min)
- Entrada ascendente - terreno comeca a subir
- Vegetacao mista (seca e verde parcialmente - mais proxima de agua)
- Introducao ao terreno vertical: plataformas em escada
- Combinacao imediata de mecanicas: espinhos + solo rachado em subida
- Calango em ladeira (corre ladeira abaixo, mais ameacador)
- Umbus guiando caminho de subida

#### Secao B - Paredao Rochoso (1.5-3min)
- Parede vertical com plataformas pequenas
- Pedra lisa em superficies inclinadas (desliza, exige precisao)
- Asa-Branca voando em padrao vertical (sobe/desce em vez de horizontal)
- Montar na Asa-Branca para subir trecho impossivel de pular
- Primeira Gota de Orvalho: plataforma isolada acessivel apenas com Asa-Branca + desvio
- Checkpoint #1

#### Secao C - Gruta da Chuva (3-5min)
- Caverna/gruta horizontal dentro da montanha
- Totem de chuva dentro da gruta
- Ativar chuva: agua brota das paredes da gruta (efeito visual unico)
- Rio subterraneo enche: natacao em corrente mais forte que Fase 2
- Tatu-Bola em area estreita: puzzle de empurrar Tatu em plataforma movel
- Galhos secos em teto da gruta (viram plataformas com chuva)
- Subida por galhos verdes + natacao combinadas
- Segunda Gota de Orvalho: camara secreta na gruta, acessivel apenas nadando contra corrente forte

#### Secao D - Crista da Serra (5-7min)
- Saida da gruta para area aberta no topo
- Vento forte: efeito visual (particulas) + leve empurrao horizontal (30px/s)
- Plataformas pequenas e espacadas (pulos de precisao)
- Solo rachado em sequencia rapida (sem tempo para hesitar)
- Calango + espinhos em combinacao
- 3 Asa-Brancas em sequencia (montar uma, pular para outra)
- Totem de chuva: galhos secos criam atalho (jogador pode pular se for habilidoso)
- Fruto do Mandacaru: essencial para travessia de gap impossivel sem pulo duplo
- Checkpoint #2

#### Secao E - A Nascente (7-10min)
- Sequencia final intensa
- Todos os animais: Tatu (puzzle final), Asa-Branca (ultimo voo), Calango (timing)
- Puzzle final: Tatu em botao que abre passagem + chuva que ativa galhos + Asa-Branca para chegar ao topo
- Terceira Gota de Orvalho: no caminho mais dificil, exige execucao perfeita de todos os mecanismos
- Ponto de chegada: nascente de agua no topo da montanha

### 3. Cutscene Final
**Trigger**: Ze chega ao ponto da nascente

**Sequencia**:
1. Camera faz zoom out, mostrando Ze no topo (2s)
2. Ze interage com a nascente (animacao de tocar a agua) (2s)
3. Agua comeca a brotar com mais forca (particulas de agua, brilho) (3s)
4. Camera pan down mostrando agua descendo a serra (3s)
5. Camera pan ate a vila (nova area visual, casas simples do sertao) (2s)
6. Pessoas da vila celebram (sprites placeholder pulando) (3s)
7. Tela escurece suavemente (2s)
8. Texto: "Ze encontrou a Nascente Cristalina. A agua voltou a correr pelo sertao." (4s)
9. Texto: "A Caatinga agradece quem cuida dela." (3s)
10. Fade para tela de creditos/vitoria final

**Total**: ~24 segundos de cutscene

**Implementacao**:
- Sequencia scriptada (timeline de eventos)
- Camera controlada programaticamente (tweens)
- Sprites de vila: assets extras simples (casas 64x48, pessoas 16x32)
- Musica: tema da nascente (placeholder ou silencio + SFX de agua)

### 4. Efeito de Vento (Nova mecanica)
- Presente apenas na Secao D (crista da serra)
- Forca: 30px/s empurrando Ze em uma direcao
- Visual: particulas de folhas/poeira voando
- Direcao configuravel via Tiled (`windDirection`, `windForce`)
- Ze pode andar contra o vento (velocidade reduzida)
- Pulos afetados: deriva horizontal durante o pulo

### 5. Distribuicao de Coletaveis

| Item | Quantidade | Localizacao |
|------|-----------|-------------|
| Umbu | ~120 | Trilhas verticais, gruta, crista |
| Gibao de Couro | 2 | Secao A, Secao D |
| Fruto do Mandacaru | 2 | Secao C (gruta), Secao D (crista) |
| Gota de Orvalho #1 | 1 | Secao B - desvio com Asa-Branca |
| Gota de Orvalho #2 | 1 | Secao C - camara secreta na gruta |
| Gota de Orvalho #3 | 1 | Secao E - caminho mais dificil |
| Totens de Chuva | 2 | Secao C (gruta), Secao D (crista) |
| Checkpoints | 2 | Apos Secao B, apos Secao D |

### 6. Fauna na Fase

| Animal | Quantidade | Funcao |
|--------|-----------|--------|
| Tatu-Bola | 3 | Puzzle na gruta + puzzle final |
| Asa-Branca | 5 | Subida vertical, sequencia na crista |
| Calango | 4 | Obstaculos em ladeira e crista |

### 7. Tilemap

**Dimensoes**: 6400x1600px (200x50 tiles de 32x32) - mais vertical que as outras fases

**Paleta visual**:
- Rocha cinza e marrom (montanha)
- Gruta: tons escuros, musgo verde
- Crista: rocha exposta, ceu aberto
- Nascente: agua cristalina, verde exuberante
- Vila (cutscene): casas simples, terreno fértil

---

## Tela de Vitoria Final

Diferente da vitoria de fase normal (PRD 06):
- **Visual especial**: fundo com cena da nascente fluindo
- **Texto**: "Parabens! Voce completou Sertao Run!"
- **Estatisticas totais**:
  - Gotas coletadas: X/9 (todas as fases)
  - Umbus totais
  - Tentativas totais
- **Opcoes**:
  - "Ver Diario" (incentiva completar gotas faltantes)
  - "Jogar Novamente"
  - "Menu"
- **Se 9/9 gotas**: mensagem extra + animacao especial

---

## Criterios de Aceite
- [ ] Fase carrega na sequencia apos Fase 2
- [ ] Terreno vertical funcional (subida, plataformas em alturas variadas)
- [ ] Efeito de vento na crista (empurrao + visual)
- [ ] Gruta com efeitos visuais distintos
- [ ] Mecanica de chuva funcional (2 totens)
- [ ] Todos os 3 animais presentes com comportamentos corretos
- [ ] 3 Gotas de Orvalho em locais desafiadores
- [ ] ~120 umbus distribuidos
- [ ] 2 checkpoints funcionais
- [ ] Puzzle final combina Tatu + chuva + Asa-Branca
- [ ] Cutscene final: sequencia scriptada de ~24s
- [ ] Cutscene: camera controlada, sprites de vila, texto narrativo
- [ ] Tela de vitoria final com estatisticas totais
- [ ] Duracao: 7-10 minutos para jogador medio
- [ ] Dificuldade alta: desafiador mas justo
- [ ] Jogo completavel do inicio (Fase 1) ao fim (cutscene)

---

## Entregavel
Fase 3 jogavel. Jogo completavel do inicio ao fim.
