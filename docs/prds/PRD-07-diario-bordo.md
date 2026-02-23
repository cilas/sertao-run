# PRD 07 - Diario de Bordo

## Dependencia
- PRD 03 (Power-ups e Coletaveis - sistema de Gotas de Orvalho)
- PRD 06 (HUD, Menus e Save - sistema de save e navegacao)

## Objetivo
Implementar o Diario de Bordo, tela acessivel do menu que exibe curiosidades educativas sobre a Caatinga desbloqueadas ao coletar Gotas de Orvalho. Ao final, o diario deve funcionar com entradas desbloqueaveis.

---

## Requisitos Funcionais

### 1. Tela do Diario
- **Acesso**: botao "Diario" no menu titulo (visivel apenas se >= 1 gota coletada)
- **Acesso in-game**: botao no menu de pausa
- **Layout**: grid 3x3 representando as 9 entradas (3 fases x 3 gotas)
- **Organizacao**:
  - Linha 1: Fase 1 - O Sertao Seco (3 entradas)
  - Linha 2: Fase 2 - O Leito do Rio (3 entradas)
  - Linha 3: Fase 3 - A Serra da Nascente (3 entradas)
- **Navegacao**: setas/click para selecionar entrada, Enter/click para abrir

### 2. Entrada do Diario (Desbloqueada)
- **Visual**: card com ilustracao pixel art (placeholder: retangulo colorido 160x120) + texto
- **Conteudo**:
  - Titulo da curiosidade (1 linha)
  - Ilustracao (sprite placeholder)
  - Texto educativo (2-4 frases, linguagem acessivel para 8 anos)
- **Animacao de abertura**: card faz flip horizontal (180° em 400ms)

### 3. Entrada do Diario (Bloqueada)
- **Visual**: card cinza com icone de gota + "?" no centro
- **Ao clicar**: mensagem "Encontre a Gota de Orvalho na Fase X!"
- **Dica sutil**: nome da fase aparece abaixo do card

### 4. Conteudo Educativo (9 entradas)

#### Fase 1 - O Sertao Seco
| # | Titulo | Curiosidade |
|---|--------|-------------|
| 1 | O Mandacaru Gigante | "O mandacaru pode guardar ate 600 litros de agua dentro dele! Ele e como uma caixa d'agua natural do sertao. Seus espinhos protegem essa agua dos animais sedentos." |
| 2 | O Tatu-Bola Brasileiro | "O tatu-bola so existe no Brasil! Quando se sente ameacado, ele se enrola como uma bolinha perfeita. E o mascote da Copa de 2014 e esta ameacado de extincao." |
| 3 | O Gibao do Vaqueiro | "O gibao de couro e a roupa tradicional do vaqueiro nordestino. Feito de couro curtido, protege contra espinhos e galhos secos da caatinga. E a armadura do sertao!" |

#### Fase 2 - O Leito do Rio
| # | Titulo | Curiosidade |
|---|--------|-------------|
| 4 | Rios que Somem | "Na Caatinga, muitos rios sao intermitentes - eles secam completamente em epocas de seca e voltam a correr quando chove. A vida no sertao gira em torno desse ciclo." |
| 5 | A Asa-Branca | "A asa-branca e uma ave que migra quando a seca aperta demais. Luiz Gonzaga fez uma musica famosa sobre ela: quando a asa-branca foi embora, a seca era tao forte que ate a terra rachou." |
| 6 | Plantas Ressuscitadas | "Muitas plantas da caatinga parecem mortas na seca, mas estao apenas dormindo! Quando a chuva chega, elas ficam verdes em poucos dias. Essa capacidade se chama dormencia." |

#### Fase 3 - A Serra da Nascente
| # | Titulo | Curiosidade |
|---|--------|-------------|
| 7 | Nascentes Sagradas | "As nascentes de agua sao os pontos onde a agua brota da terra. Na Caatinga, proteger as nascentes e essencial para a sobrevivencia de comunidades inteiras." |
| 8 | O Calango Veloz | "Os calangos da caatinga sao lagartos super rapidos! Eles correm sobre a areia quente para nao queimar as patas. Alguns podem correr em apenas duas patas traseiras!" |
| 9 | Caatinga: Mata Branca | "Caatinga vem do tupi e significa 'mata branca'. Na seca, as plantas perdem as folhas e os troncos brancos dominam a paisagem. Mas basta uma chuva para tudo ficar verde!" |

### 5. Animacao de Desbloqueio
- **Trigger**: ao coletar Gota de Orvalho durante gameplay
- **In-game**: miniatura do card aparece no canto da tela (slide in da direita)
- **Texto**: "Nova entrada no Diario!" por 3s, depois slide out
- **Nao interrompe gameplay**: notificacao nao-intrusiva

### 6. Progresso Visual
- **Contador**: "X/9 descobertas" no topo da tela do diario
- **Barra de progresso**: barra horizontal preenchida proporcionalmente
- **Bonus**: ao desbloquear todas as 9, mensagem especial:
  "Voce descobriu todos os segredos da Caatinga! Ze agradece sua curiosidade!"

---

## Persistencia
- Entradas desbloqueadas salvas no `SaveData.diaryEntries` (PRD 06)
- Formato: array de IDs (`["fase1_gota1", "fase1_gota2", ...]`)
- Sincronizado com `SaveData.gotasCollected`

---

## Arquitetura Sugerida

```
src/
  scenes/
    DiaryScene.ts          # Tela principal do diario
  ui/
    DiaryCard.ts           # Componente card (bloqueado/desbloqueado)
    DiaryNotification.ts   # Notificacao in-game ao desbloquear
  data/
    DiaryContent.ts        # Dados das 9 entradas (titulo, texto, spriteKey)
```

### DiaryContent.ts
```typescript
interface DiaryEntry {
  id: string           // "fase1_gota1"
  faseId: number       // 1, 2 ou 3
  gotaIndex: number    // 1, 2 ou 3
  title: string
  content: string
  spriteKey: string    // Chave do sprite placeholder
}
```

---

## Criterios de Aceite
- [ ] Diario acessivel do menu titulo (quando ha gotas)
- [ ] Diario acessivel do menu de pausa
- [ ] Grid 3x3 exibindo 9 entradas organizadas por fase
- [ ] Entradas bloqueadas: visual cinza com "?" e dica da fase
- [ ] Entradas desbloqueadas: flip animation ao abrir
- [ ] Conteudo: 9 textos educativos reais sobre a Caatinga
- [ ] Textos adequados para criancas de 8 anos
- [ ] Notificacao in-game ao desbloquear (nao-intrusiva)
- [ ] Progresso: contador X/9 e barra de progresso
- [ ] Mensagem especial ao completar 9/9
- [ ] Persistencia: entradas salvas e carregadas corretamente

---

## Entregavel
Diario funcional com curiosidades desbloqueaveis.
