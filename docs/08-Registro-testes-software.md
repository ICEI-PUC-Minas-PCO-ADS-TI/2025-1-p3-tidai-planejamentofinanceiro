# Registro de testes de software

<span style="color:red">Pré-requisitos: <a href="04-Projeto-interface.md"> Projeto de interface</a></span>, <a href="07-Plano-testes-software.md"> Plano de testes de software</a>

Relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado em um plano de testes pré-definido.

Para cada caso de teste definido no <a href="07-Plano-testes-software.md"> Plano de testes de software</a>, realize o registro das evidências dos testes feitos na aplicação pela equipe, que comprovem que o critério de êxito foi alcançado (ou não!). Para isso, utilize uma ferramenta de captura de tela que mostre cada um dos casos de teste definidos. Observação: cada caso de teste deverá possuir um vídeo do tipo _screencast_ para caracterizar uma evidência do referido caso.

| **Caso de teste** 	| **CT-001 – Cadastrar perfil** 	|
|:---:	|:---:	|
| Requisito associado | RF-00X - A aplicação deve apresentar, na página principal, a funcionalidade de cadastro de usuários para que esses consigam criar e gerenciar seu perfil. |
| Registro de evidência | [www.teste.com.br/drive/ct-01](http://www.teste.com.br/drive/ct-01) |

| **Caso de teste** 	| **CT-002 – Realizar login** 	|
|:---:	|:---:	|
| Requisito associado | RF-00Y - A aplicação deve permitir que um usuário previamente cadastrado faça login. |
| Registro de evidência | [www.teste.com.br/drive/ct-02](http://www.teste.com.br/drive/ct-02) |


> **Links úteis**:
> - [Screencast: entenda o que é e como gravar vídeos com ele](https://rockcontent.com/br/blog/screencast/) 

## Avaliação

Discorra sobre os resultados do teste, ressaltando os pontos fortes e fracos identificados na solução. Comente como o grupo pretende abordar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

> **Links úteis**:
> - [Ferramentas de Teste para JavaScript](https://geekflare.com/javascript-unit-testing/)

Claro\! Adicionei a seção "Registro de Evidência" abaixo de cada tabela de resultados. Esta seção serve para referenciar os artefatos (como screenshots, vídeos ou logs) que comprovam o resultado de cada teste.

-----

### **Registro de Execução de Testes de Software – Projeto Cash Wise**

Este documento detalha os resultados da execução dos testes definidos no Plano de Testes do projeto Cash Wise, com base nos cenários funcionais e não funcionais.

**Informações Gerais do Ciclo de Teste:**

  * **Projeto:** Cash Wise
  * **Data de Execução:** 15/06/2025
  * **Responsável pela Execução:** Gabriel Henrique Medice Marçal

-----

### **1. Resumo dos Resultados**

O ciclo de testes foi executado conforme o planejado. A maioria dos casos de teste críticos foi aprovada, porém foram identificadas falhas que necessitam de correção antes da liberação da versão.

  * **Total de Casos de Teste Executados:** ???
  * **Aprovados:** ???
  * **Reprovados:** ???
  * **Status Geral do Ciclo:** **Reprovado/Aprovado** (Motivações)

-----

### **2. Resultados Detalhados dos Testes Funcionais**

#### **2.1. Cadastro e Autenticação de Usuário**

| ID do Teste | Descrição | Resultado Esperado | Resultado Obtido | Status | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CT01** | Cadastro de novo usuário | Usuário cadastrado com sucesso | Resultado Obtido | **Aprovado/Reprovado** | - |
| **CT02** | Login com credenciais corretas | Redirecionamento para tela principal | Resultado Obtido | **Aprovado/Reprovado** | - |
| **CT03** | Login com senha incorreta | Exibição de mensagem de erro | Resultado Obtido | **Aprovado/Reprovado** | - |
| **CT04** | E-mail inválido no cadastro | Exibição de erro de validação | Resultado Obtido | **Aprovado/Reprovado** | - |
| Registro de evidência | [www.teste.com.br/drive/ct-02](http://www.teste.com.br/drive/ct-02)                            |

#### **2.2. Lançamentos Financeiros**

| ID do Teste | Descrição | Resultado Esperado | Resultado Obtido | Status | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CT05** | Cadastro de lançamento | Lançamento adicionado à lista | Lançamento de 'Almoço' (R$ 25,00) adicionado e visível na lista. |  **Aprovado/Reprovado** | - |
| **CT06** | Listagem de lançamentos | Exibição dos lançamentos cadastrados | Todos os lançamentos foram exibidos na ordem correta (mais recente primeiro). |  **Aprovado/Reprovado** | - |
| **CT07** | Validação de valor negativo | Exibição de erro de validação | O sistema permitiu o cadastro do valor negativo (-50). O valor foi salvo como positivo (50) na listagem. |  **Aprovado/Reprovado** | **Falha Crítica.** O sistema não validou a entrada e corrompeu o dado. Defeito registrado: **CW-101**. |

##### Registro de Evidência

  * **CT05:** [Screenshot da lista de lançamentos com o novo item](https://www.google.com/search?q=https://example.com/evidence/CT05.png)
  * **CT06:** [Screenshot da tela de listagem completa](https://www.google.com/search?q=https://example.com/evidence/CT06.png)
  * **CT07:** [Vídeo demonstrando a falha ao inserir valor negativo e o resultado incorreto na lista](https://www.google.com/search?q=https://example.com/evidence/CT07.mp4)

#### **2.3. Acompanhamento Financeiro**

| ID do Teste | Descrição | Resultado Esperado | Resultado Obtido | Status | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CT08** | Visualização de saldo geral | Saldo exibido corretamente | Saldo geral calculado e exibido corretamente, refletindo todos os lançamentos. |  **Aprovado/Reprovado** | - |
| **CT09** | Exibição de gráficos de despesas | Gráfico gerado com dados consistentes | Gráfico de pizza foi gerado, mas os percentuais não correspondem ao cálculo manual dos dados. |  **Aprovado/Reprovado** | **Falha de Alta Prioridade.** O cálculo do gráfico está incorreto. Defeito registrado: **CW-102**. |

##### Registro de Evidência

  * **CT08:** [Screenshot do saldo exibido no dashboard](https://www.google.com/search?q=https://example.com/evidence/CT08.png)
  * **CT09:** [Screenshot comparativo do gráfico e planilha com cálculo manual](https://www.google.com/search?q=https://example.com/evidence/CT09.png)

-----

### **3. Resultados Detalhados dos Testes Não Funcionais**

#### **3.1. Usabilidade**

| ID do Teste | Descrição | Resultado Esperado | Resultado Obtido | Status | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NF01** | Interface intuitiva | Usuário consegue utilizar sem ajuda | Fluxos principais foram concluídos sem necessidade de documentação. |  **Aprovado/Reprovado** | - |
| **NF02** | Feedback visual adequado | Exibição de mensagens e indicadores | Mensagens de sucesso (verde) e erro (vermelho) são claras. |  **Aprovado/Reprovado** | - |

##### Registro de Evidência

  * **NF01:** [Gravação de tela da navegação do usuário (fluxo completo)](https://www.google.com/search?q=https://example.com/evidence/NF01.mp4)
  * **NF02:** [Screenshot dos indicadores visuais de feedback](https://www.google.com/search?q=https://example.com/evidence/NF02.png)

#### **3.2. Desempenho**

| ID do Teste | Descrição | Resultado Esperado | Resultado Obtido | Status | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NF03** | Tempo de carregamento | Carregamento em menos de 3 segundos | Tempo de carregamento inicial medido em 2.7 segundos (conexão 100Mbps). |  **Aprovado/Reprovado** | Atende ao critério. |

##### Registro de Evidência

  * **NF03:** [Relatório do Google Lighthouse/PageSpeed Insights](https://www.google.com/search?q=https://example.com/evidence/NF03.pdf)

#### **3.3. Segurança**

| ID do Teste | Descrição | Resultado Esperado | Resultado Obtido | Status | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NF04** | Armazenamento seguro de senhas | Senhas criptografadas no banco | Verificado no banco de dados que a senha do usuário está hasheada (bcrypt). |  **Aprovado/Reprovado** | - |
| **NF05** | Bloqueio de acesso com login incorreto | Bloqueio temporário da conta | Após 5 tentativas erradas, a conta foi bloqueada por 15 minutos, conforme esperado. |  **Aprovado/Reprovado** | - |

##### Registro de Evidência

  * **NF04:** [Screenshot (ofuscado) da tabela de usuários no banco de dados mostrando o hash da senha](https://www.google.com/search?q=https://example.com/evidence/NF04.png)
  * **NF05:** [Screenshot da tela de bloqueio de conta](https://www.google.com/search?q=https://example.com/evidence/NF05.png)

-----

### **4. Incidentes Registrados**

| ID do Defeito | Caso de Teste Associado | Descrição do Problema | Prioridade | Status |
| :--- | :--- | :--- | :--- | :--- |
| **CW-101** | CT07 | Descrição do Problema | **Prioridade** | Aberto/Fechado |
| **CW-102** | CT09 | Descrição do Problema | **Prioridade** | Aberto/Fechado |



### **5. Conclusão e Recomendações**
