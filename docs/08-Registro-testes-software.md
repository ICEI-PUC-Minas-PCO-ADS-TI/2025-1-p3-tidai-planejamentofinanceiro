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
| **CT05** | Cadastro de lançamento | Lançamento adicionado à lista | Resultado Obtido |  **Aprovado/Reprovado** | - |
| **CT06** | Listagem de lançamentos | Exibição dos lançamentos cadastrados | Resultado Obtido |  **Aprovado/Reprovado** | - |
| **CT07** | Validação de valor negativo | Exibição de erro de validação | Resultado Obtido |  **Aprovado/Reprovado** | - |
| Registro de evidência | [www.teste.com.br/drive/ct-02](http://www.teste.com.br/drive/ct-02) |

#### **2.3. Acompanhamento Financeiro**

| ID do Teste | Descrição | Resultado Esperado | Resultado Obtido | Status | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CT08** | Visualização de saldo geral | Saldo exibido corretamente | Resultado Obtido |  **Aprovado/Reprovado** | - |
| **CT09** | Exibição de gráficos de despesas | Gráfico gerado com dados consistentes | Resultado Obtido |  **Aprovado/Reprovado** | - |
| Registro de evidência | [www.teste.com.br/drive/ct-02](http://www.teste.com.br/drive/ct-02) |

### **3. Resultados Detalhados dos Testes Não Funcionais**

#### **3.1. Usabilidade**

| ID do Teste | Descrição | Resultado Esperado | Resultado Obtido | Status | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NF01** | Interface intuitiva | Usuário consegue utilizar sem ajuda | Resultado Obtido |  **Aprovado/Reprovado** | - |
| **NF02** | Feedback visual adequado | Exibição de mensagens e indicadores | Resultado Obtido |  **Aprovado/Reprovado** | - |
| Registro de evidência | [www.teste.com.br/drive/ct-02](http://www.teste.com.br/drive/ct-02) |

#### **3.2. Desempenho**

| ID do Teste | Descrição | Resultado Esperado | Resultado Obtido | Status | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NF03** | Tempo de carregamento | Carregamento em menos de 3 segundos | Resultado Obtido |  **Aprovado/Reprovado** | - |
| Registro de evidência | [www.teste.com.br/drive/ct-02](http://www.teste.com.br/drive/ct-02) |

#### **3.3. Segurança**

| ID do Teste | Descrição | Resultado Esperado | Resultado Obtido | Status | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NF04** | Armazenamento seguro de senhas | Senhas criptografadas no banco | Resultado Obtido |  **Aprovado/Reprovado** | - |
| **NF05** | Bloqueio de acesso com login incorreto | Bloqueio temporário da conta | Resultado Obtido |  **Aprovado/Reprovado** | - |
| Registro de evidência | [www.teste.com.br/drive/ct-02](http://www.teste.com.br/drive/ct-02) |

### **4. Incidentes Registrados**

| ID do Defeito | Caso de Teste Associado | Descrição do Problema | Prioridade | Status |
| :--- | :--- | :--- | :--- | :--- |
| **CW-101** | CT07 | Descrição do Problema | **Prioridade** | Aberto/Fechado |
| **CW-102** | CT09 | Descrição do Problema | **Prioridade** | Aberto/Fechado |
| Registro de evidência | [www.teste.com.br/drive/ct-02](http://www.teste.com.br/drive/ct-02) |



### **5. Conclusão e Recomendações**
