# PRD 09 - Fase 2: O Leito do Rio

## Dependencia
- PRD 05 (Mecanica da Chuva)
- PRD 08 (Fase 1 - como referencia de estrutura)

## Objetivo
Criar a segunda fase do jogo, introduzindo a mecanica da chuva como elemento central de puzzle. Ao final, a fase deve ser jogavel com chuva integrada e duracao de 5-7 minutos.

---

## Requisitos Funcionais

### 1. Contexto da Fase
- **Nome**: O Leito do Rio
- **Ambiente**: Vale com rio seco, vegetacao mais densa, terreno variado
- **Narrativa**: Ze chega a um grande rio seco que bloqueia sua passagem
- **Foco educativo**: Rios intermitentes, ciclo da agua na caatinga
- **Dificuldade**: Media
- **Duracao alvo**: 5-7 minutos

### 2. Estrutura do Level Design

#### Secao A - Chegada ao Vale (0-1min)
- Entrada por trilha descendente (vindo da Fase 1)
- Vegetacao mais presente que Fase 1 (arbustos secos, arvores sem folha)
- Introducao de galhos secos (visiveis mas intangiveis - jogador nota)
- Umbus guiando pelo caminho
- Primeiro leito de rio seco visivel (gap mortal, jogador precisa contornar)

#### Secao B - Primeiro Totem (1-2min)
- Totem de chuva #1 em area acessivel
- Placa de madeira com icone "E" + icone de gota
- Ao ativar: chuva transforma a area
  - Galhos secos viram plataformas verdes
  - Leito de rio menor enche (nadavel)
- Caminho abre: galhos verdes permitem avancar para area antes inacessivel
- Tutorial natural da mecanica de chuva
- Primeira Gota de Orvalho: em galho seco que so vira plataforma com chuva

#### Secao C - Puzzle do Tatu-Bola (2-3.5min)
- Tatu-Bola patrulhando em area com botao de pressao
- Puzzle: pular na cabeca do Tatu, empurrar ate botao, abrir barreira
- Area apos barreira tem Asa-Branca voando sobre gap
- Montar na Asa-Branca para cruzar gap largo
- Checkpoint #1

#### Secao D - Rio Grande (3.5-5min)
- Grande leito de rio seco (impossivel pular, impossivel contornar)
- Totem de chuva #2 obrigatorio
- Ativar chuva: rio enche, Ze nada ate o outro lado
- Na agua: corrente leve empurra Ze para um lado (adiciona desafio)
- Saida da agua: plataformas escalonadas
- Segunda Gota de Orvalho: no fundo do rio (precisa nadar para baixo durante chuva)
- Timing: jogador tem 60s de chuva para nadar, coletar gota e sair

#### Secao E - Galhos e Asa-Branca (5-6min)
- Sequencia vertical de galhos secos
- Precisa planejar: ativar totem #3, subir rapido antes da chuva acabar
- Asa-Branca em padrao alterado pela chuva (voa mais alto)
- Combinacao: galhos verdes + Asa-Branca para alcancar area alta
- Checkpoint #2

#### Secao F - Corredor Final (6-7min)
- Combinacao de todos os elementos: natacao + galhos + Tatu + Asa-Branca
- Terceira Gota de Orvalho: atras de puzzle que exige ativar chuva em momento exato
  - Galho seco sobre buraco + Tatu precisa ser empurrado durante chuva ativa
- Ponto de chegada: beira do rio que agora flui (visual de transicao para Fase 3)

### 3. Mecanica de Corrente (Agua)
- Quando Ze nada, corrente de agua empurra em uma direcao (configuravel por rio)
- Forca da corrente: 40px/s (Ze pode nadar contra, mas mais lento)
- Visual: particulas de espuma na direcao da corrente
- Corrente configuravel via Tiled property `currentDirection` (left/right) e `currentForce`

### 4. Distribuicao de Coletaveis

| Item | Quantidade | Localizacao |
|------|-----------|-------------|
| Umbu | ~100 | Trilhas, agua, plataformas |
| Gibao de Couro | 1 | Secao D (antes de nadar, protege na saida) |
| Fruto do Mandacaru | 1 | Secao E (ajuda na subida de galhos) |
| Gota de Orvalho #1 | 1 | Secao B - galho seco apos chuva |
| Gota de Orvalho #2 | 1 | Secao D - fundo do rio durante chuva |
| Gota de Orvalho #3 | 1 | Secao F - puzzle de timing chuva + Tatu |
| Totens de Chuva | 3 | Secoes B, D, E |
| Checkpoints | 2 | Apos Secao C, apos Secao E |

### 5. Fauna na Fase

| Animal | Quantidade | Funcao |
|--------|-----------|--------|
| Tatu-Bola | 3 | Puzzle de botao de pressao (Secoes C, F) |
| Asa-Branca | 3 | Plataforma movel para cruzar gaps (Secoes C, E) |
| Calango | 2 | Obstaculo de timing (Secao F) |

### 6. Tilemap

**Dimensoes**: 8000x1000px (250x31 tiles de 32x32) - maior que Fase 1, mais vertical

**Paleta visual**:
- Mais vegetacao que Fase 1 (arbustos, arvores secas)
- Leitos de rio com margem distinta
- Tons de bege/marrom para rio seco
- Tons de azul para agua
- Verde para vegetacao pos-chuva

### 7. Elementos Narrativos
- Inicio: placa "Leito do Rio Sao Francisco" (nome ficticio)
- Durante chuva: sons de agua e animais
- Final: visual de rio fluindo, transicao para serra

---

## Puzzles Ambientais

### Puzzle 1: Passagem pelo Galho (Secao B)
1. Jogador ve gap com galho seco sobre ele (nao funciona)
2. Totem de chuva proximo
3. Ativa chuva -> galho fica verde/firme
4. Cruza usando o galho como plataforma

### Puzzle 2: Tatu no Botao (Secao C)
1. Barreira bloqueia caminho
2. Tatu patrulha na area
3. Pula na cabeca -> Tatu se fecha
4. Empurra Tatu ate botao de pressao
5. Barreira abre

### Puzzle 3: Nadar no Rio (Secao D)
1. Grande rio seco bloqueia passagem
2. Ativa chuva -> rio enche
3. Nada ate o outro lado (contra corrente)
4. Gota no fundo - precisa desviar da rota

### Puzzle 4: Subida Temporal (Secao E)
1. Galhos secos em sequencia vertical
2. Ativa chuva -> galhos ficam firmes
3. Sobe rapido antes da chuva acabar (60s)
4. Asa-Branca ajuda nos trechos mais altos

---

## Criterios de Aceite
- [ ] Fase carrega e funciona na sequencia do jogo
- [ ] 3 totens de chuva ativaveis com transformacao do ambiente
- [ ] Rios enchem e permitem natacao
- [ ] Galhos secos viram plataformas com chuva
- [ ] Corrente de agua funcional
- [ ] Tatu-Bola: puzzle de botao de pressao funciona
- [ ] Asa-Branca: plataforma movel funcional
- [ ] 3 Gotas de Orvalho em locais que exigem uso da mecanica de chuva
- [ ] ~100 umbus distribuidos
- [ ] 2 checkpoints funcionais
- [ ] Duracao: 5-7 minutos para jogador medio
- [ ] Dificuldade media: desafio presente mas justo
- [ ] Todos os 4 puzzles ambientais funcionais

---

## Entregavel
Fase 2 jogavel com mecanica da chuva integrada.
