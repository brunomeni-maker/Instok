# PRD — Instok

**Equipe:** Grupo Instok  
**Data:** 10/08/2026  
**Última atualização:** 10/08/2026

---

# 1. Header

**Time:** Grupo Instok

**Última atualização:** 10/08/2026

**Design / telas:** Protótipo mobile no Stitch

**Repositório:** GitHub — projeto Instok

---

# 2. Problem

## Quem é o cliente?

Consumidores que desejam comprar produtos em lojas físicas e querem verificar a disponibilidade antes de sair de casa utilizando um smartphone.

## Qual é o problema?

Os consumidores precisam pesquisar em diferentes canais para descobrir se um produto está disponível em uma loja física. Esse processo pode resultar em perda de tempo, deslocamentos desnecessários e frustração quando o produto não está disponível.

## Como sabemos que isso é um problema?

A hipótese do projeto é que consumidores enfrentam dificuldade para confirmar a disponibilidade de produtos em lojas físicas antes de se deslocarem. O Instok foi pensado para validar essa hipótese por meio de uma experiência simples de busca e consulta de estoque.

## Como resolvem hoje?

Atualmente, o consumidor pode pesquisar no site da loja, ligar para o estabelecimento, enviar uma mensagem ou visitar a loja pessoalmente. Essas alternativas são fragmentadas e nem sempre apresentam a disponibilidade de forma rápida.

---

# 3. Goals

## Métrica de output

Número de buscas que resultam na identificação de pelo menos uma loja com o produto disponível.

## Métricas de input

- Número de lojas cadastradas.
- Número de produtos disponíveis para consulta.
- Tempo até o primeiro resultado.
- Taxa de buscas que retornam pelo menos uma loja.

## Non-goals

- O Instok não realizará compras nesta versão.
- O Instok não realizará pagamentos.
- O Instok não realizará entregas.
- O Instok não fará a gestão de estoque das lojas.

## Guardrails

- A consulta de disponibilidade deve apresentar resultado de forma rápida.
- A interface deve deixar claro quando uma informação de estoque pode estar desatualizada.
- O usuário não deve precisar realizar muitas etapas para encontrar uma loja.

---

# 4. Solution

## Milestone 1 — Busca de produtos

**P0** · Como consumidor, quero pesquisar um produto, para descobrir onde posso encontrá-lo.

**P0** · Como consumidor, quero visualizar as lojas com o produto disponível, para escolher onde comprar.

**P1** · Como consumidor, quero visualizar a distância até cada loja, para comparar as opções.

## Milestone 2 — Localização

**P0** · Como consumidor, quero visualizar o endereço da loja, para conseguir chegar ao estabelecimento.

**P1** · Como consumidor, quero filtrar os resultados por distância, para encontrar as lojas mais próximas.

## Stack

**Frontend:** React

**Estilização:** CSS

**Backend:** Node.js

**Banco:** PostgreSQL

**Por quê:** A stack foi escolhida por ser adequada para um MVP web/mobile, permitindo desenvolver rapidamente a interface, a lógica de consulta e uma estrutura simples para armazenar produtos, lojas e disponibilidade.

## Dados

`produto` — `id`, `nome`, `marca`, `categoria`, `preco`

`loja` — `id`, `nome`, `endereco`, `latitude`, `longitude`

`estoque` — `produto_id`, `loja_id`, `disponibilidade`, `ultima_atualizacao`

`marca` — `id`, `nome`

## Tópicos em aberto

- Como o Instok receberá as informações de estoque?
- Quais lojas participarão do MVP?
- Como será validada a disponibilidade dos produtos?
- As informações serão atualizadas em tempo real ou periodicamente?

---

# 5. Launch plan

## Rollout

O MVP será apresentado inicialmente para um grupo reduzido de usuários durante o Demo Day, permitindo observar o fluxo de busca e identificar melhorias antes de uma expansão.

## Critério de sucesso

Um usuário consegue pesquisar um produto e identificar pelo menos uma loja onde ele esteja disponível, visualizando também distância e endereço.

## O que precisa estar no ar até o Demo Day

- Pesquisa de produtos.
- Consulta de disponibilidade.
- Lista de lojas.
- Endereço das lojas.
- Filtro por distância.

---

# 6. Meeting Notes

## 10/08 — Estrutura inicial do PRD

**Decidido:** O Instok será desenvolvido para permitir que consumidores encontrem produtos disponíveis em lojas físicas.

**Decidido:** O MVP terá foco em pesquisa, disponibilidade, distância e localização.

**Decidido:** A experiência será mobile-first.

**Em aberto:** Integração com dados reais de estoque e definição das lojas participantes.

---

# 7. Appendix

## Brief

O Instok busca reduzir o tempo e o esforço necessários para descobrir se um produto está disponível em uma loja física.

## Decisão técnica

Foi definida uma arquitetura inicial utilizando React no frontend, Node.js no backend e PostgreSQL para os dados.

## Pesquisa

A principal hipótese a ser validada é que consumidores valorizam saber se um produto está disponível antes de se deslocarem até uma loja.

## Concorrentes e alternativas

Foram consideradas como alternativas os sites de lojas, ligações telefônicas, mensagens para estabelecimentos e visitas presenciais. O diferencial proposto pelo Instok é centralizar a consulta de disponibilidade e localização em uma única experiência.

## Status do MVP

O MVP do Instok está em fase de desenvolvimento e validação do fluxo principal de busca de produtos, consulta de disponibilidade e localização de lojas.

### Próxima etapa

Validar a experiência com usuários e conectar a aplicação a uma fonte de dados de estoque.
