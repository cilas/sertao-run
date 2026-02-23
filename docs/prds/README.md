# PRDs de Desenvolvimento - Sertao Run

Lista de PRDs independentes para desenvolvimento pos-setup do jogo.

## PRDs

| # | Nome | Dependencia | Entregavel |
|---|------|-------------|------------|
| [01](PRD-01-player.md) | Player: Ze e Movimentacao | Setup (#1-9) | Ze anda, pula e colide em mapa de teste |
| [02](PRD-02-plataformas-terreno.md) | Plataformas e Terreno | PRD 01 | Mapa com todos os tipos de terreno |
| [03](PRD-03-powerups-coletaveis.md) | Power-ups e Coletaveis | PRD 02 | Ze coleta itens, veste gibao, usa pulo duplo |
| [04](PRD-04-fauna.md) | Fauna | PRD 01 | 3 animais com comportamentos distintos |
| [05](PRD-05-mecanica-chuva.md) | Mecanica da Chuva | PRD 02, 04 | Totem transforma o mapa, Ze nada |
| [06](PRD-06-hud-menus-save.md) | HUD, Menus e Save | PRD 03 | Fluxo completo menu -> jogo -> menu |
| [07](PRD-07-diario-bordo.md) | Diario de Bordo | PRD 03, 06 | Diario com curiosidades desbloqueaveis |
| [08](PRD-08-fase1-sertao-seco.md) | Fase 1: O Sertao Seco | PRD 02, 03, 04 | Fase 1 jogavel do inicio ao fim |
| [09](PRD-09-fase2-leito-rio.md) | Fase 2: O Leito do Rio | PRD 05, 08 | Fase 2 com mecanica da chuva |
| [10](PRD-10-fase3-serra-nascente.md) | Fase 3: A Serra da Nascente | PRD 09 | Jogo completavel do inicio ao fim |
| [11](PRD-11-audio-polish.md) | Audio e Polish | PRD 10 | Audio completo e feedback visual polido |
| [12](PRD-12-acessibilidade-deploy.md) | Acessibilidade, Deploy e Analytics | PRD 11 | Jogo publicado, acessivel e monitorado |

## Grafo de Dependencias

```
Setup (#1-9)
  |
  v
PRD 01 (Player)
  |         \
  v          v
PRD 02     PRD 04
(Terreno)  (Fauna)
  |    \      |
  v     v     |
PRD 03  PRD 05 (Chuva) <-- PRD 02 + PRD 04
(Items)    |
  |        |
  v        |
PRD 06     |
(HUD/Save) |
  |        |
  v        |
PRD 07     |
(Diario)   |
  |        |
  v        v
PRD 08 (Fase 1) <-- PRD 02 + PRD 03 + PRD 04
  |
  v
PRD 09 (Fase 2) <-- PRD 05
  |
  v
PRD 10 (Fase 3)
  |
  v
PRD 11 (Audio/Polish)
  |
  v
PRD 12 (Acessibilidade/Deploy)
```
