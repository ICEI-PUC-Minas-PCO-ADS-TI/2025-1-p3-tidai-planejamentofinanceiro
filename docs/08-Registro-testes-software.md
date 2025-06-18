
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

# 🧾 **6. Testes Individuais – Avaliação de Usuários**

### 👤 Wagner Ribeiro

#### Funcionalidades Testadas:
- Cadastro de Perfil (CT-001): Sucesso no cadastro, campos salvos corretamente, opção de edição funcional.
- Login (CT-002): Acesso com sucesso, redirecionamento para dashboard, dados exibidos corretamente.
- Lançamentos (CT-003): Corrigido bug de duplicação, valores atualizam corretamente no modal.
- Perfil Financeiro (CT-004): Feedback como “Você precisa melhorar sua vida financeira”.
- Dashboard (CT-005): Dados exibidos, gráficos organizados, áreas visuais ainda com necessidade de ajustes.

#### Avaliação:
- **Pontos Fortes:** Melhoria no formulário, estrutura do blog no topo, correções visuais eficazes.
- **Pontos a Melhorar:** Dados zerados em telas específicas, conteúdo do blog no rodapé, redundância de botões (“Home” e “Sair”).

---

### 👩 Clara Eckel

#### Funcionalidades Testadas:
- Cadastro de Perfil (CT-001): Cadastro funcional e edição operante.
- Login (CT-002): Login bem-sucedido com dados exibidos.
- Lançamentos (CT-003): Registro correto, sem sobreposição.
- Perfil Financeiro (CT-004): Feedback positivo conforme dados (“Você está no caminho certo”).
- Dashboard (CT-005): Exibição de gráficos em barra/pizza com dados consistentes.

#### Avaliação:
- **Pontos Fortes:** Simplicidade e fluidez no uso.
- **Pontos a Melhorar:** Mais campos no perfil (profissão, metas), conteúdo no rodapé do site, sugestões no feedback.

---

### 👨‍💻 Pablo Marques

#### Funcionalidades Testadas:
- Cadastro de Perfil (CT-001): Dados corretos e edição funcional.
- Login (CT-002): Dashboard acessado com sucesso.
- Lançamentos (CT-003): Atualização consistente dos valores.
- Perfil Financeiro (CT-004): Feedback crítico (“Você precisa melhorar sua vida financeira”).
- Dashboard (CT-005): Gráficos funcionais e dados completos.

#### Avaliação:
- **Pontos Fortes:** Cadastro funcional, alertas claros, gráficos bem estruturados.
- **Pontos a Melhorar:** Personalização do perfil (foto), conteúdo do rodapé, reposicionamento de botões de navegação.

---
