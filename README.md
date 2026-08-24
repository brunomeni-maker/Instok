# Instok

O **Instok** é uma solução mobile-first para consumidores que desejam encontrar produtos disponíveis em lojas físicas antes de sair de casa.

## Problema

Consumidores precisam pesquisar em diferentes canais para descobrir se um produto está disponível em uma loja física. Isso pode gerar perda de tempo e deslocamentos sem sucesso.

O Instok centraliza a consulta de disponibilidade, distância e localização em uma experiência simples.

## Objetivo

Permitir que o usuário:

1. Pesquise um produto.
2. Veja lojas com o produto disponível.
3. Compare a distância.
4. Consulte o endereço.
5. Escolha onde comprar.

## MVP

- Pesquisa de produtos.
- Consulta de disponibilidade.
- Lista de lojas.
- Endereço das lojas.
- Filtro por distância.

## Fora do escopo

- Compras dentro do aplicativo.
- Pagamentos.
- Entregas.
- Gestão de estoque das lojas.

## Fluxo principal

```text
Pesquisar produto
       ↓
Ver lojas disponíveis
       ↓
Comparar distância
       ↓
Ver endereço
       ↓
Escolher a loja
```

## Telas

### Busca

Permite pesquisar o produto desejado.

### Resultados

Apresenta lojas, disponibilidade, distância e endereço.

### Detalhes da loja

Apresenta informações da loja selecionada e ação para visualizar sua localização.

## Tecnologia

- **Frontend:** React
- **Estilização:** CSS
- **Backend:** Node.js
- **Banco de dados:** PostgreSQL

A stack foi escolhida para permitir desenvolvimento rápido do MVP e uma arquitetura simples para consulta de produtos, lojas e disponibilidade.

## Dados

### Produto

`id`, `nome`, `marca`, `categoria`, `preco`

### Loja

`id`, `nome`, `endereco`, `latitude`, `longitude`

### Estoque

`produto_id`, `loja_id`, `disponibilidade`, `ultima_atualizacao`

### Marca

`id`, `nome`

## Design

A interface utiliza:

- Azul como cor principal.
- Fundo claro.
- Cards brancos.
- Cantos arredondados.
- Sombras suaves.
- Tipografia sans-serif.
- Destaque visual para disponibilidade.

Mais detalhes estão em [`design.md`](./design.md).

## Documentação

- [`PRD.md`](./PRD.md)
- [`design.md`](./design.md)

## Status

**MVP em desenvolvimento.**

## Próximos passos

- Conectar a fonte de dados de estoque.
- Definir lojas participantes.
- Validar atualização da disponibilidade.
- Testar o fluxo com usuários.
- Preparar o MVP para o Demo Day.

## Equipe

**Grupo Instok**
