# PRD: Sertao Run

## 1. Problema e Contexto

### O Problema
Criancas brasileiras em idade escolar (8 anos) tem pouco contato ludico com o bioma Caatinga - o unico bioma exclusivamente brasileiro. A maioria dos jogos de plataforma populares utiliza referencias culturais estrangeiras, desperdicando a oportunidade de ensinar sobre a biodiversidade, os desafios hidricos e as estrategias de sobrevivencia do sertao nordestino.

### Por que agora?
- Educacao ambiental e tema obrigatorio na BNCC (Base Nacional Comum Curricular)
- Professores carecem de ferramentas digitais interativas sobre biomas brasileiros
- O genero plataforma 2D vive um renascimento na web com tecnologias como Phaser.js e PixiJS
- A crise hidrica continua sendo pauta relevante no Brasil

### Publico-Alvo
- **Primario**: Criancas de 7-10 anos (foco em 8 anos)
- **Secundario**: Professores do ensino fundamental que buscam ferramentas educativas
- **Terciario**: Pais interessados em jogos educativos brasileiros

---

## 2. Visao do Produto

**Um jogo de plataforma 2D web que ensina sobre a Caatinga atraves da diversao.** Cada salto, item e mecanica do jogo reforca conhecimento real sobre o bioma, sem sacrificar a experiencia frenetica e envolvente de um platformer classico.

> "Ze, um jovem vaqueiro, precisa atravessar o sertao para encontrar a lendaria Nascente Cristalina e salvar sua vila da pior seca ja vista."

---

## 3. Metricas de Sucesso

| Metrica | Meta | Como Medir |
|---------|------|------------|
| Taxa de conclusao da Fase 1 | > 70% dos jogadores | Analytics in-game |
| Tempo medio de sessao | 10-20 min | Analytics in-game |
| Retencao D7 | > 30% | Analytics in-game |
| Acertos no quiz do diario | > 60% apos jogar | Quiz integrado |
| NPS com professores | > 50 | Pesquisa pos-uso |

---

## 4. Escopo e Fases

### Fase 1 - MVP (escopo deste PRD)
- 3 fases jogaveis (Sertao Seco, Leito do Rio, Serra da Nascente)
- Personagem Ze com movimentacao basica (andar, pular, agachar)
- 2 power-ups (Gibao de Couro, Fruto do Mandacaru)
- 3 tipos de fauna (Tatu-Bola, Asa-Branca, Calango)
- Mecanica da Chuva em 1 fase
- Coletaveis: Umbu + Gotas de Orvalho
- Diario de Bordo com curiosidades desbloqueaveis
- Roda na web (desktop e mobile responsivo)

### Fase 2 - Pos-MVP
- 3 fases adicionais
- Novos animais (Jiboia, Arara-azul-de-lear, Mocó)
- Boss: "O Grande Calor" (fase especial de sobrevivencia)
- Modo professor (painel com progresso dos alunos)
- Trilha sonora com forró/baião original
- Localizacao em ingles

### Fora de Escopo
- Multiplayer
- Monetizacao / microtransacoes
- App nativo (iOS/Android)
- Editor de fases
- Sistema de ranking online

---

## 5. Design do Jogo

### 5.1 Personagem Principal: Ze

**Aparencia**: Menino sertanejo ~12 anos, chapeu de couro, camisa de algodao, sandalia de couro. Expressivo e simpatico.

**Controles**:
| Acao | Teclado | Touch (Mobile) |
|------|---------|-----------------|
| Mover | Setas / A-D | Joystick virtual |
| Pular | Espaco / W | Botao A |
| Agachar | S / Seta baixo | Botao B |
| Interagir | E | Botao contextual |

**Estados**:
- Normal (camisa simples)
- Com Gibao (armadura de couro - protegido)
- Tomou dano (pisca e invencibilidade temporaria 2s)
- Nadando (quando rios enchem com chuva)

**Vida**: 3 chapeus de couro (como coracoes). Perder todos = reinicia no ultimo checkpoint.

### 5.2 Plataformas e Terreno

| Elemento | Comportamento | Referencia Real |
|----------|--------------|-----------------|
| Solo firme | Plataforma estatica padrao | Terreno pedregoso da caatinga |
| Solo rachado | Desmorona 1.5s apos pisar | Aridez extrema do solo |
| Cacto grande | Plataforma estatica (pular em cima e seguro) | Mandacaru / Xique-xique |
| Galho seco | Plataforma que so funciona APOS chuva (fica verde e firme) | Resiliencia da vegetacao |
| Leito de rio seco | Buraco mortal que vira agua nadavel apos chuva | Rios intermitentes |
| Pedra lisa | Plataforma com deslizamento (menor atrito) | Lajedo do sertao |

### 5.3 Obstaculos

| Obstaculo | Dano | Comportamento |
|-----------|------|---------------|
| Unha-de-gato (espinhos) | 1 chapeu | Estatico no chao; Gibao protege |
| Cacto pequeno | 1 chapeu | Estatico; Gibao protege |
| Sol escaldante (zonas) | Dreno lento | Areas sem sombra reduzem timer de resistencia |

### 5.4 Fauna (Sem Combate Letal)

**Tatu-Bola**
- Rola na direcao do Ze como uma bola
- Pular por cima: Ze passa ileso
- Pular na cabeca: Tatu se fecha em bola e para (nao morre)
- Tatu parado pode ser empurrado para ativar botoes de pressao

**Asa-Branca**
- Voa em padrao senoidal previsivel
- Ze pode pular nas costas e usar como plataforma movel
- Desce suavemente se Ze ficar muito tempo (maximo 4s)
- Referencia direta a musica de Luiz Gonzaga

**Calango**
- Corre muito rapido pelo chao em linha reta
- Derruba Ze se colidir (sem dano, so knockback)
- Aparece com aviso visual (poeira no chao)

### 5.5 Power-ups

**Gibao de Couro (Protecao)**
- Funcao: Imunidade a espinhos e obstaculos de vegetacao
- Duracao: Permanente ate tomar 1 hit de outra fonte
- Visual: Ze veste gibao marrom com detalhes
- Licao: Adaptacao cultural ao ambiente hostil

**Fruto do Mandacaru (Habilidade)**
- Funcao: Pulo duplo OU impulso de velocidade (alterna por fase)
- Duracao: 15 segundos
- Visual: Aura verde ao redor do Ze + particulas
- Licao: Energia armazenada nas plantas da caatinga

### 5.6 Mecanica da Chuva (Core Mechanic)

**Ativacao**: Ze encontra "Totens de Chuva" em pontos especificos do mapa. Ao interagir (botao E), uma animacao de danca da chuva toca e a chuva comeca.

**Efeitos em Tempo Real**:
1. Rios secos enchem de agua (buracos mortais viram areas nadaveis)
2. Galhos secos ficam verdes e firmes (novas plataformas)
3. Alguns cactos florescem (efeito visual)
4. Animais mudam comportamento (Asa-Branca voa mais alto)

**Duracao**: 60 segundos. Apos isso, a agua recua gradualmente (30s de transicao).

**Implicacao de Game Design**: O jogador precisa planejar QUANDO ativar a chuva para abrir caminhos, coletar itens e avancar. Cria puzzles ambientais naturais.

### 5.7 Coletaveis

**Umbu (Moeda)**
- Espalhados por toda fase
- 100 umbus = 1 vida extra (chapeu de couro)
- Indicador visual no HUD

**Gotas de Orvalho (Segredo)**
- 3 por fase, escondidas em locais dificeis
- Desbloqueia entrada no Diario de Bordo
- Brilham suavemente para dar dica visual
- Coletar todas de uma fase desbloqueia curiosidade especial

### 5.8 Diario de Bordo

Menu acessivel a qualquer momento com curiosidades desbloqueadas:
- Cada Gota de Orvalho revela um fato sobre a Caatinga
- Ilustracoes em pixel art dos animais/plantas com texto curto
- Exemplos:
  - "O mandacaru guarda ate 600 litros de agua dentro dele!"
  - "O tatu-bola so existe no Brasil e se enrola para se proteger"
  - "Asa-Branca e uma ave que migra quando a seca aperta"
- Total: 9 entradas no MVP (3 fases x 3 gotas)

---

## 6. Design das Fases

### Fase 1: O Sertao Seco
- **Ambiente**: Planicie arida, cactos, solo rachado
- **Foco educativo**: Flora da caatinga, adaptacao ao clima
- **Mecanicas introduzidas**: Movimentacao basica, solo rachado, espinhos, Gibao
- **Fauna**: Calango (tutorial de obstaculos moveis)
- **Dificuldade**: Facil (tutorial integrado)
- **Duracao estimada**: 3-5 minutos

### Fase 2: O Leito do Rio
- **Ambiente**: Vale com rio seco, vegetacao mais densa
- **Foco educativo**: Rios intermitentes, ciclo da agua
- **Mecanicas introduzidas**: Mecanica da Chuva, natacao, galhos secos/vivos
- **Fauna**: Tatu-Bola (puzzle de pressao), Asa-Branca (plataformas moveis)
- **Dificuldade**: Media
- **Duracao estimada**: 5-7 minutos

### Fase 3: A Serra da Nascente
- **Ambiente**: Terreno montanhoso, nascente no topo
- **Foco educativo**: Importancia das nascentes, preservacao
- **Mecanicas introduzidas**: Verticalizacao, combina todas as mecanicas
- **Fauna**: Todos os 3 animais
- **Dificuldade**: Dificil
- **Duracao estimada**: 7-10 minutos
- **Final**: Cutscene da nascente voltando a jorrar, vila celebrando

---

## 7. Arquitetura Tecnica

### Stack
| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Game Engine | **Phaser 3** | Madura, boa docs, 2D nativo, grande comunidade |
| Linguagem | **TypeScript** | Type safety, melhor DX, refactoring seguro |
| Build | **Vite** | HMR rapido, bundle otimizado |
| Assets | **Aseprite** (sprites) + **Tiled** (mapas) | Padrao industria para pixel art e tilemaps |
| Audio | **Howler.js** (via Phaser) | Suporte cross-browser robusto |
| Hospedagem | **Vercel** ou **GitHub Pages** | Deploy simples, CDN global, gratis |
| Analytics | **Plausible** ou custom | Leve, LGPD-friendly, sem cookies |

### Estrutura do Projeto
```
caatinga_game/
  src/
    scenes/           # Cenas do Phaser (Menu, Fases, HUD, Diario)
    entities/          # Ze, Fauna, Power-ups
    mechanics/         # Chuva, Solo rachado, Coletaveis
    systems/           # Input, Physics, Save
    config/            # Constantes, balanceamento
    assets/            # Sprites, tilemaps, audio
  public/
  tests/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
```

### Requisitos de Performance
| Metrica | Meta |
|---------|------|
| FPS | 60fps estavel em dispositivos mid-range |
| Tempo de carregamento | < 3s na primeira fase |
| Tamanho do bundle | < 5MB total (todas as fases) |
| Memoria | < 200MB RAM |
| Compatibilidade | Chrome, Firefox, Safari, Edge (ultimas 2 versoes) |

### Responsividade
- Canvas escala proporcionalmente ao viewport
- Resolucao base: 800x600 (escala 2x para 1600x1200)
- Touch controls aparecem automaticamente em dispositivos moveis
- Orientacao: landscape obrigatorio (prompt para girar em portrait)

---

## 8. Arte e Audio

### Estilo Visual
- **Pixel art 16-bit** com paleta terrosa (marrom, ocre, verde seco, azul ceu)
- Pos-chuva: paleta muda para tons mais vivos e saturados
- Inspiracao: Celeste + Shovel Knight, com identidade visual sertaneja
- Tiles de 16x16 ou 32x32

### Animacoes do Ze
| Acao | Frames |
|------|--------|
| Idle | 4 frames (respirando) |
| Andar | 6 frames |
| Correr | 8 frames |
| Pular | 3 frames (subida, apice, queda) |
| Agachar | 2 frames |
| Dano | 2 frames + piscar |
| Nadar | 4 frames |
| Danca da chuva | 8 frames (animacao especial) |

### Audio
- **Musica**: Melodias inspiradas em baiao/xote (8-bit/chiptune)
  - Tema do menu (alegre)
  - Tema sertao seco (melancolico, zabumba sutil)
  - Tema pos-chuva (esperancoso, triangulo)
  - Tema da nascente (epico, sanfona)
- **SFX**: Pulo, coleta de umbu, gota de orvalho, chuva, rio enchendo, tatu rolando

---

## 9. UX e Acessibilidade

### Fluxo de Telas
```
Tela Titulo -> Selecao de Fase -> Gameplay -> Tela de Vitoria
                                           -> Tela de Game Over (retry)
       |-> Diario de Bordo
       |-> Opcoes (volume, controles)
```

### Acessibilidade
- Daltonismo: usar formas + cores (nunca so cor para comunicar)
- Texto: fonte legivel, tamanho minimo 16px equivalente
- Controles remapeáveis
- Opcao de desativar screen shake
- Subtitulos em dialogos/cutscenes

### Onboarding (Fase 1)
- Sem tela de tutorial separada
- Primeiros 30 segundos: corredor reto para aprender andar/pular
- Placa de madeira no cenario com dicas visuais (sem texto pesado)
- Cada mecanica nova e introduzida em area segura antes de area de risco

---

## 10. Sistema de Save

- **Auto-save** no inicio de cada fase e em checkpoints (bandeirolas de festa junina)
- **LocalStorage** para persistencia no navegador
- Dados salvos:
  - Fase atual + checkpoint
  - Vidas restantes
  - Umbus coletados (total)
  - Gotas de Orvalho por fase
  - Entradas desbloqueadas no Diario

---

## 11. Decisoes em Aberto

| Decisao | Opcoes | Impacto |
|---------|--------|---------|
| Controles mobile | Joystick virtual vs Swipe gestures | UX mobile |
| Cutscenes | Dialogo in-game vs Telas ilustradas | Custo de arte |
| Localizacao de assets | Bundled vs CDN lazy-load | Performance vs complexidade |
| Ferramenta de analytics | Plausible vs custom events | Privacidade vs insights |

---

## 12. Riscos e Mitigacoes

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|--------------|---------|-----------|
| Performance ruim em mobile | Media | Alto | Otimizar sprites, testar em devices reais cedo |
| Arte pixel art lenta de produzir | Alta | Medio | Comecar com placeholder, iterar |
| Mecanica da chuva complexa | Media | Alto | Prototipar isoladamente primeiro |
| Criancas nao engajam com educativo | Baixa | Alto | Testar com publico-alvo, diversao primeiro |
| Scope creep nas fases | Alta | Medio | MVP rigido de 3 fases, cortar antes de adicionar |

---

## 13. Cronograma Sugerido (Fases de Desenvolvimento)

| Sprint | Foco | Entregavel |
|--------|------|-----------|
| 1 | Setup + Prototipo | Projeto Phaser rodando, Ze andando e pulando em tela |
| 2 | Mecanicas Core | Solo rachado, espinhos, Gibao, coleta de Umbu |
| 3 | Fauna | Tatu-Bola, Asa-Branca, Calango com comportamentos |
| 4 | Mecanica da Chuva | Totem, transicao seco/molhado, natacao |
| 5 | Fase 1 Completa | Level design, arte, polish da primeira fase |
| 6 | Fases 2 e 3 | Level design e arte das fases restantes |
| 7 | HUD + Diario + Save | Interface, sistema de save, curiosidades |
| 8 | Audio + Polish | Musica, SFX, animacoes, juice |
| 9 | Testes + Acessibilidade | QA, testes com criancas, ajustes |
| 10 | Deploy + Analytics | Publicacao, monitoramento |

---

*Este PRD define o MVP de Sertao Run. Cada mecanica foi desenhada para que a diversao venha primeiro e o aprendizado seja consequencia natural da jogabilidade.*
