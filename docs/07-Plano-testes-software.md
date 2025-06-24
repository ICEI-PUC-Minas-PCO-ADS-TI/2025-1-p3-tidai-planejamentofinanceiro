# Plano de Testes – Projeto Cash Wise

## 1. Introdução

Este documento descreve o plano de testes do sistema **Cash Wise**, que tem como objetivo auxiliar os usuários na gestão de suas finanças pessoais. O plano contempla testes baseados nos requisitos funcionais e não funcionais levantados durante o desenvolvimento, bem como nas histórias de usuário fornecidas.

---

## 2. Objetivos dos Testes

- Verificar se o sistema cumpre os requisitos funcionais definidos.
- Avaliar a estabilidade e desempenho da aplicação.
- Garantir uma boa experiência de usuário e usabilidade.
- Validar a segurança e proteção de dados do usuário.

---

## 3. Escopo do Teste

Serão testadas as funcionalidades básicas da aplicação relacionadas a:

- Autenticação de usuários
- Cadastro e listagem de lançamentos
- Acompanhamento financeiro
- Segurança e persistência de dados

---

## 4. Abordagem dos Testes

### 4.1 Testes Manuais
Serão utilizados para verificar a usabilidade, comportamento da interface e validação de dados visuais.

---
## 5. Critérios de Aceitação

- Todos os testes críticos devem ser aprovados.
- Nenhum erro de alta prioridade pode permanecer sem correção.
- O sistema deve se comportar conforme esperado em 100% dos casos de teste funcional.

---

## 6. Casos de Teste

### 6.1 Cadastro e Autenticação de Usuário

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     | Tipo     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|----------|
| CT01| Cadastro de novo usuário                 | Nome, e-mail, senha válida           | Usuário cadastrado com sucesso         | Funcional|
| CT02| Login com credenciais corretas           | E-mail e senha corretos              | Redirecionamento para tela principal   | Funcional|
| CT03| Login com senha incorreta                | E-mail correto, senha incorreta      | Exibição de mensagem de erro           | Funcional|
| CT04| E-mail inválido no cadastro              | E-mail com formato inválido          | Exibição de erro de validação          | Funcional|

### 6.2 Lançamentos Financeiros

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     | Tipo     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|----------|
| CT05| Cadastro de lançamento                   | Nome, valor, categoria, tipo         | Lançamento adicionado à lista          | Funcional|
| CT06| Listagem de lançamentos                  | -                                    | Exibição dos lançamentos cadastrados   | Funcional|
| CT07| Validação de valor negativo              | Valor negativo no campo de entrada   | Exibição de erro de validação          | Funcional|

### 6.3 Acompanhamento Financeiro

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     | Tipo     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|----------|
| CT08| Visualização de saldo geral              | -                                    | Saldo exibido corretamente             | Funcional|
| CT09| Exibição de gráficos de despesas         | Lançamentos variados                 | Gráfico gerado com dados consistentes  | Funcional|

---

## 7. Testes Não Funcionais

### 7.1 Usabilidade

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|
| NF01| Interface intuitiva                      | Navegação comum                      | Usuário consegue utilizar sem ajuda    |
| NF02| Feedback visual adequado                 | Ações de clique e erro               | Exibição de mensagens e indicadores    |

### 7.2 Desempenho

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|
| NF03| Tempo de carregamento                    | Acesso inicial                       | Carregamento em menos de 3 segundos    |

### 7.3 Segurança

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|
| NF04| Armazenamento seguro de senhas           | Cadastro                             | Senhas criptografadas no banco         |
| NF05| Bloqueio de acesso com login incorreto   | Várias tentativas erradas            | Bloqueio temporário da conta           |

---

## 8. Relatório de Resultados

Cada teste será executado e terá seu resultado documentado conforme o modelo abaixo:

| Caso de Teste | Resultado Esperado | Resultado Obtido | Status (Aprovado / Reprovado) | Observações |
|---------------|--------------------|------------------|-------------------------------|-------------|
| CT01          | Cadastro com sucesso| Cadastro ok      | Aprovado                      | -           |

---

## 9. Conclusão

Este plano de testes visa assegurar que o sistema **Cash Wise** seja entregue com qualidade, minimizando falhas e proporcionando uma boa experiência ao usuário.
