
# ✅ **Registro de Execução de Testes de Software – Projeto Cash Wise**

Este documento detalha os resultados da execução dos testes definidos no Plano de Testes do projeto **Cash Wise**, com base nos cenários funcionais e não funcionais.

---

## 📌 **Informações Gerais do Ciclo de Teste**

- **Projeto:** Cash Wise  
- **Data de Execução:** 15/06/2025  
- **Responsável pela Execução:** Gabriel Henrique Medice Marçal  

---

## 📊 **1. Resumo dos Resultados**

- **Total de Casos de Teste Executados:** 15  
- **Aprovados:** 13  
- **Reprovados:** 2  
- **Status Geral do Ciclo:** ✅ **Aprovado com Restrições**  
  > *Alguns ajustes visuais e de navegação foram recomendados pelos usuários.*

---

## 🔍 **2. Resultados Detalhados dos Testes Funcionais**

### 2.1 Cadastro e Autenticação de Usuário

| ID do Teste | Descrição                     | Resultado Esperado                           | Resultado Obtido | Status         | Observações |
|-------------|-------------------------------|----------------------------------------------|------------------|----------------|-------------|
| CT01        | Cadastro de novo usuário      | Usuário cadastrado com sucesso               | Obtido com sucesso | ✅ Aprovado  | -           |
| CT02        | Login com credenciais válidas | Redirecionamento para o dashboard            | Obtido com sucesso | ✅ Aprovado  | -           |
| CT03        | Login com senha incorreta     | Exibição de mensagem de erro                 | Obtido com sucesso | ✅ Aprovado  | -           |
| CT04        | E-mail inválido no cadastro   | Exibição de erro de validação                | Obtido com sucesso | ✅ Aprovado  | -           |

📁 **Evidências**: [Drive - CT02](http://www.teste.com.br/drive/ct-02)

---

### 2.2 Lançamentos Financeiros

| ID do Teste | Descrição                    | Resultado Esperado                 | Resultado Obtido   | Status         | Observações |
|-------------|------------------------------|------------------------------------|--------------------|----------------|-------------|
| CT05        | Cadastro de lançamento       | Lançamento adicionado à lista      | Obtido com sucesso | ✅ Aprovado  | -           |
| CT06        | Listagem de lançamentos      | Exibição dos lançamentos salvos   | Obtido com sucesso | ✅ Aprovado  | -           |
| CT07        | Valor negativo               | Exibição de erro de validação     | Problema encontrado | ❌ Reprovado | Valor aceito indevidamente |

📁 **Evidências**: [Drive - CT07](http://www.teste.com.br/drive/ct-02)

---

### 2.3 Acompanhamento Financeiro

| ID do Teste | Descrição                  | Resultado Esperado                      | Resultado Obtido   | Status         | Observações               |
|-------------|----------------------------|-----------------------------------------|--------------------|----------------|---------------------------|
| CT08        | Visualização do saldo      | Saldo exibido corretamente              | Obtido com sucesso | ✅ Aprovado  | -                         |
| CT09        | Gráficos de despesas       | Gráficos com dados consistentes         | Falhas visuais     | ❌ Reprovado | Inconsistência visual     |

📁 **Evidências**: [Drive - CT09](http://www.teste.com.br/drive/ct-02)

---

## 🧪 **3. Resultados dos Testes Não Funcionais**

### 3.1 Usabilidade

| ID do Teste | Descrição                | Resultado Esperado                  | Resultado Obtido    | Status        | Observações                                 |
|-------------|--------------------------|-------------------------------------|---------------------|---------------|----------------------------------------------|
| NF01        | Interface intuitiva      | Usuário consegue usar sem auxílio   | Constatado          | ✅ Aprovado | Usuários elogiaram clareza da navegação     |
| NF02        | Feedback visual          | Indicadores e mensagens claros      | Adequado            | ✅ Aprovado | Sugeridas melhorias pós-login automático     |

📁 **Evidências**: [Usabilidade](http://www.teste.com.br/drive/ct-02)

---

### 3.2 Desempenho

| ID do Teste | Descrição             | Resultado Esperado             | Resultado Obtido | Status         | Observações |
|-------------|-----------------------|--------------------------------|------------------|----------------|-------------|
| NF03        | Tempo de carregamento | < 3 segundos                   | 2.3s             | ✅ Aprovado  | -           |

---

### 3.3 Segurança

| ID do Teste | Descrição                     | Resultado Esperado                        | Resultado Obtido | Status         | Observações |
|-------------|-------------------------------|-------------------------------------------|------------------|----------------|-------------|
| NF04        | Senhas seguras                | Criptografia no banco                     | Confirmado       | ✅ Aprovado  | -           |
| NF05        | Tentativas inválidas de login | Bloqueio após 3 falhas                    | Confirmado       | ✅ Aprovado  | -           |

---

## 🐞 **4. Incidentes Registrados**

| ID do Defeito | Caso de Teste | Descrição do Problema                   | Prioridade | Status  |
|---------------|----------------|------------------------------------------|------------|---------|
| CW-101        | CT07           | Valor negativo foi aceito no cadastro    | Alta       | Aberto  |
| CW-102        | CT09           | Gráfico exibido sem dados organizados    | Média      | Aberto  |

---

## ✅ **5. Conclusão e Recomendações**

O ciclo de testes foi bem-sucedido, com a maioria das funcionalidades operando conforme esperado. Dois pontos de atenção foram destacados:

- Validação de valores negativos precisa ser corrigida.
- O dashboard requer ajustes visuais para padronização.

**Recomendações:**
- Corrigir os bugs dos testes CT07 e CT09.
- Refatorar o layout do gráfico do dashboard.
- Reavaliar a navegação redundante dos botões “Home” e “Sair”.

---


---

## 🧾 **6. Testes Individuais – Avaliação de Usuários**

### 👤 Wagner Ribeiro

| Funcionalidade | Resultado | Observações |
|----------------|-----------|-------------|
| Cadastro de Perfil (CT-001) | ✅ Sucesso | Campos salvos corretamente, edição funcional |
| Login (CT-002)              | ✅ Sucesso | Redirecionamento e dados exibidos |
| Lançamentos (CT-003)        | ✅ Corrigido | Bug de duplicação resolvido |
| Perfil Financeiro (CT-004)  | ✅ Feedback exibido | “Você precisa melhorar sua vida financeira” |
| Dashboard (CT-005)          | ⚠ Parcial | Áreas visuais ainda precisam de ajustes |

**Pontos Fortes:** Melhoria no formulário, blog superior estruturado  
**Pontos a Melhorar:** Dados zerados, conteúdo no rodapé, redundância “Home” e “Sair”

---

### 👩 Clara Eckel

| Funcionalidade | Resultado | Observações |
|----------------|-----------|-------------|
| Cadastro de Perfil (CT-001) | ✅ Sucesso | Funcional e edição operante |
| Login (CT-002)              | ✅ Sucesso | Dashboard exibido corretamente |
| Lançamentos (CT-003)        | ✅ Correto | Sem sobreposição |
| Perfil Financeiro (CT-004)  | ✅ Feedback exibido | “Você está no caminho certo” |
| Dashboard (CT-005)          | ✅ Gráficos | Barra e pizza organizados |

**Pontos Fortes:** Fluidez de uso  
**Pontos a Melhorar:** Mais campos no perfil, conteúdo no rodapé, sugestões no feedback

---

### 👨‍💻 Pablo Marques

| Funcionalidade | Resultado | Observações |
|----------------|-----------|-------------|
| Cadastro de Perfil (CT-001) | ✅ Sucesso | Dados corretos e edição funcional |
| Login (CT-002)              | ✅ Sucesso | Acesso ao dashboard |
| Lançamentos (CT-003)        | ✅ Correto | Atualização consistente |
| Perfil Financeiro (CT-004)  | ✅ Feedback exibido | “Você precisa melhorar sua vida financeira” |
| Dashboard (CT-005)          | ✅ Gráficos | Dados completos e organizados |

**Pontos Fortes:** Cadastro sem erros, alertas claros, boa visualização de gráficos  
**Pontos a Melhorar:** Personalização visual, conteúdo no rodapé, botões reposicionados

---
