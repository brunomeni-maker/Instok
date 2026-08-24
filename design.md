# 1. Overview

O Instok é uma aplicação mobile-first que ajuda consumidores a encontrar produtos disponíveis em lojas físicas antes de sair de casa.

A experiência principal segue o fluxo:

**Pesquisar produto → encontrar lojas disponíveis → verificar distância → verificar endereço.**

A linguagem visual é moderna, limpa e objetiva. O produto utiliza cards, bastante espaço em branco e uma hierarquia visual forte para destacar o produto pesquisado, a disponibilidade e as informações da loja.

A interface deve transmitir praticidade, confiança e facilidade de uso.

# 2. Colors

| Cor | HEX | Função |
|---|---|---|
| Primary Blue | `#2563EB` | Ações principais e elementos de destaque. |
| Dark Blue | `#1E3A8A` | Títulos e elementos de alto contraste. |
| Background | `#F8FAFC` | Fundo principal das telas. |
| Surface | `#FFFFFF` | Cards, campos e áreas de conteúdo. |
| Text Primary | `#111827` | Títulos e informações principais. |
| Text Secondary | `#6B7280` | Textos auxiliares e endereços. |
| Success | `#16A34A` | Produto disponível. |
| Error | `#DC2626` | Produto indisponível. |

O azul é a cor principal da marca e deve ser utilizado nas ações mais importantes.

Verde e vermelho comunicam disponibilidade, sempre acompanhados de texto ou ícone para não depender exclusivamente da cor.

# 3. Typography

O Instok utiliza uma tipografia sans-serif moderna, priorizando legibilidade em smartphones.

| Elemento | Tamanho | Peso | Uso |
|---|---:|---:|---|
| Heading | 28–32px | 700 | Títulos principais. |
| Subheading | 20–24px | 600 | Subtítulos e seções. |
| Body | 16px | 400 | Conteúdo principal. |
| Caption | 14px | 400 | Informações secundárias. |
| Button | 16px | 600 | Ações. |

A hierarquia deve destacar primeiro o produto, depois a loja, a disponibilidade, a distância e, por fim, o endereço.

# 4. Layout & Spacing

O layout é mobile-first e organizado verticalmente.

A escala de espaçamento é:

| Valor | Uso |
|---:|---|
| 4px | Ajustes pequenos. |
| 8px | Elementos relacionados. |
| 12px | Conteúdo interno de componentes. |
| 16px | Espaçamento padrão. |
| 24px | Separação entre grupos. |
| 32px | Separação entre grandes seções. |

As telas devem manter margens laterais consistentes e áreas de toque confortáveis.

Os cards de lojas apresentam primeiro o nome, depois disponibilidade, distância e endereço.

# 5. Elevation & Depth

A profundidade é discreta.

Cards utilizam sombras suaves para se separar do fundo claro. Elementos secundários permanecem planos.

Evitar sombras fortes ou múltiplas camadas que deixem a interface pesada.

O objetivo da elevação é indicar agrupamento e interatividade, não criar efeitos decorativos.

# 6. Shapes

O Instok utiliza cantos arredondados para criar uma aparência moderna e amigável.

| Componente | Forma |
|---|---|
| Cards | 12px de raio |
| Inputs | 12px de raio |
| Botões | 8px de raio |
| Badges | Formato pill |
| Bordas | Finas e discretas |

Todos os componentes devem manter consistência de forma entre as três telas.

# 7. Components

## Search Bar

Campo principal para pesquisar produtos.

Inclui ícone de busca, placeholder, área confortável para toque e estados default, focus e filled.

## Button

Utilizado para ações principais e secundárias.

**Primary:** azul `#2563EB`.

**Secondary:** aparência discreta para ações complementares.

**Disabled:** baixa ênfase visual.

## Store Card

Apresenta:

- Nome da loja.
- Disponibilidade.
- Distância.
- Endereço.
- Ação para selecionar a loja.

## Availability Badge

Mostra:

- **Disponível** — tratamento de sucesso.
- **Indisponível** — tratamento de erro.

## Distance Filter

Permite organizar os resultados de acordo com a distância.

## Navigation / Back Button

Permite retornar à tela anterior.

## Icons

Os ícones principais são busca, localização, loja, distância, filtro, mapa e voltar.

# 8. Do's and Don'ts

## Do's

- Manter a busca em destaque.
- Mostrar claramente a disponibilidade.
- Mostrar distância e endereço.
- Usar componentes consistentes.
- Priorizar a experiência mobile.
- Manter espaçamentos consistentes.
- Utilizar as cores conforme suas funções.
- Manter o visual simples e objetivo.
- Usar sombras suaves.
- Manter consistência nos cantos arredondados.
- Utilizar texto e ícones para apoiar informações importantes.

## Don'ts

- Não criar componentes visualmente diferentes sem necessidade.
- Não usar cores sem função.
- Não esconder a disponibilidade.
- Não depender somente da cor.
- Não utilizar sombras exageradas.
- Não criar layouts com excesso de elementos.
- Não adicionar funcionalidades fora do MVP.
- Não alterar a identidade visual entre telas.
- Não utilizar espaçamentos inconsistentes.
