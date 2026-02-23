# PRD 03 - Power-ups e Coletaveis

## Dependencia
- PRD 02 (Plataformas e Terreno)

## Objetivo
Implementar o sistema de power-ups e coletaveis, incluindo Gibao de Couro, Fruto do Mandacaru, Umbu e Gotas de Orvalho. Ao final, Ze deve coletar itens, vestir gibao e usar pulo duplo em mapa de teste.

---

## Requisitos Funcionais

### 1. Gibao de Couro (Protecao)
- **Aparencia**: item flutuando com animacao de bob (sobe/desce 4px, ciclo 2s)
- **Sprite placeholder**: retangulo marrom 24x32 com contorno
- **Coleta**: Ze toca o item, som de coleta, item desaparece
- **Efeito**: imunidade a espinhos (unha-de-gato e cacto pequeno)
- **Visual no Ze**: cor do sprite muda (overlay marrom) indicando gibao equipado
- **Duracao**: permanente ate tomar 1 hit de qualquer outra fonte de dano
- **Ao perder**: animacao de flash + som de quebra, Ze volta ao visual normal
- **Nao acumula**: se ja tem gibao, novo gibao nao faz nada (nao coleta)
- **Licao educativa**: adaptacao cultural do sertanejo ao ambiente hostil

### 2. Fruto do Mandacaru (Pulo Duplo)
- **Aparencia**: item flutuando com brilho (particulas verdes simples)
- **Sprite placeholder**: circulo verde 16x16 com brilho
- **Coleta**: Ze toca o item, som de coleta, item desaparece
- **Efeito**: pulo duplo - Ze pode pular uma segunda vez no ar
- **Segundo pulo**: impulso = 80% do pulo normal (-264px/s)
- **Visual no Ze**: aura verde (circulo semitransparente ao redor)
- **Duracao**: 15 segundos apos coleta
- **Timer visual**: aura vai diminuindo gradualmente (shrink de 100% a 0%)
- **Ao expirar**: aura some com fade out
- **Pode coletar novo**: reseta o timer para 15s
- **Licao educativa**: energia armazenada nas plantas da caatinga

### 3. Umbu (Moeda/Coletavel)
- **Aparencia**: item pequeno flutuando com bob suave (2px, ciclo 1s)
- **Sprite placeholder**: circulo amarelo 12x12
- **Coleta**: Ze toca, som curto de "plim", item desaparece com scale down
- **Contagem**: acumula no HUD (placeholder: numero no canto superior)
- **100 umbus = 1 vida extra**: ao atingir 100, flash na tela + som especial
- **Contador reseta**: apos ganhar vida extra, contador volta a 0
- **Distribuicao**: espalhados pelo mapa, em linhas guia e locais exploraveis
- **Magnetismo**: quando Ze esta a 48px de distancia, umbu e atraido (velocidade 200px/s)

### 4. Gota de Orvalho (Segredo)
- **Aparencia**: gota azul brilhante, flutuando com brilho pulsante
- **Sprite placeholder**: gota azul 16x20 com glow pulsante (alpha 0.6-1.0, ciclo 1.5s)
- **Coleta**: Ze toca, som especial (mais longo que umbu), particulas de agua
- **Quantidade**: 3 por fase, escondidas em locais dificeis de acessar
- **Feedback**: mensagem breve na tela "Gota 1/3 encontrada!"
- **Persistencia**: uma vez coletada, nao reaparece (salvo no save)
- **Desbloqueia**: entrada correspondente no Diario de Bordo (PRD 07)
- **Brilho sutil**: emite luz suave (point light, raio 64px) para dar dica visual

---

## Sistema de Coleta (Base)

```typescript
interface Collectible {
  type: 'gibao' | 'mandacaru' | 'umbu' | 'gota'
  position: { x: number, y: number }
  collected: boolean
  onCollect(player: Player): void
}
```

### Feedback ao Coletar
| Item | Som | Visual | Duracao |
|------|-----|--------|---------|
| Gibao | "equip" medio | Flash branco + overlay marrom no Ze | 500ms |
| Mandacaru | "power-up" ascendente | Aura verde aparece | 300ms |
| Umbu | "plim" curto | Scale down + fade | 200ms |
| Gota | "cristal" longo | Particulas de agua + texto | 1000ms |

> **Nota**: Sons serao placeholders (beeps sintetizados) neste PRD. Audio final no PRD 11.

---

## Configuracao no Tiled

| Property | Tipo | Valores |
|----------|------|---------|
| `collectibleType` | string | `gibao`, `mandacaru`, `umbu`, `gota` |
| `gotaIndex` | int | 1, 2 ou 3 (para gotas, indica qual entrada do diario) |
| `faseId` | int | ID da fase (para persistencia das gotas) |

---

## Arquitetura Sugerida

```
src/
  entities/
    collectibles/
      Collectible.ts       # Classe base com bob animation
      Gibao.ts             # Gibao de Couro
      Mandacaru.ts         # Fruto do Mandacaru
      Umbu.ts              # Umbu (moeda)
      GotaOrvalho.ts       # Gota de Orvalho
  systems/
    CollectibleManager.ts  # Spawn, coleta, persistencia
    PowerUpManager.ts      # Gerencia efeitos ativos (gibao, mandacaru timer)
```

---

## Mapa de Teste

Mapa dedicado ou extensao do mapa PRD 02:
1. **Secao Gibao**: corredor com espinhos + gibao no inicio (testar protecao)
2. **Secao Mandacaru**: plataforma alta acessivel apenas com pulo duplo
3. **Secao Umbu**: trilha de umbus guiando caminho + cluster de 100 (testar vida extra)
4. **Secao Gotas**: 3 gotas em locais escondidos (area secreta, plataforma alta, apos puzzle simples)

---

## Criterios de Aceite
- [ ] Gibao: coleta equipa protecao contra espinhos
- [ ] Gibao: perde ao tomar dano de outra fonte
- [ ] Gibao: visual do Ze muda quando equipado
- [ ] Mandacaru: coleta ativa pulo duplo por 15s
- [ ] Mandacaru: aura visual diminui com o tempo
- [ ] Mandacaru: segundo pulo funciona apenas 1 vez no ar
- [ ] Umbu: coleta incrementa contador
- [ ] Umbu: 100 umbus = 1 vida extra
- [ ] Umbu: magnetismo funciona a 48px de distancia
- [ ] Gota: 3 por mapa, brilho pulsante visivel
- [ ] Gota: feedback especial ao coletar (texto + particulas)
- [ ] Gota: persistencia (nao reaparece apos coletada)
- [ ] Todos os itens flutuam com animacao de bob
- [ ] Sons placeholder funcionam para cada tipo

---

## Entregavel
Ze coleta itens, veste gibao, usa pulo duplo em mapa de teste.
