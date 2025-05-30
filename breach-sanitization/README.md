# Correções de Segurança XSS

Este diretório contém as versões corrigidas dos arquivos que apresentavam vulnerabilidades XSS no projeto original.

## Arquivos Corrigidos

### 1. BlogController.java
- Adicionada sanitização de input usando `StringEscapeUtils.escapeHtml4`
- Todos os campos (título, conteúdo e autor) são sanitizados antes de serem salvos
- Previne a inserção de HTML malicioso e scripts

### 2. SecurityConfig.java
- Configuração de segurança do Spring Security
- Implementa Content Security Policy (CSP)
- Adiciona headers de segurança importantes:
  - X-XSS-Protection
  - X-Frame-Options
  - HSTS (HTTP Strict Transport Security)
- Configuração CORS segura

### 3. app.component.ts
- Uso seguro de interpolação para título e autor
- Implementação do DomSanitizer para conteúdo HTML
- Remoção do [innerHTML] direto para o título
- Sanitização do conteúdo antes da renderização

## Como Aplicar as Correções

1. Adicione a dependência do Apache Commons Text no `pom.xml`:
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-text</artifactId>
    <version>1.10.0</version>
</dependency>
```

2. Copie os arquivos corrigidos para suas respectivas pastas:
- `BlogController.java` → `src/main/java/com/example/blog/controller/`
- `SecurityConfig.java` → `src/main/java/com/example/blog/config/`
- `app.component.ts` → `frontend/src/app/`

## Melhorias de Segurança Implementadas

1. **Backend (Java)**:
   - Sanitização de input
   - Headers de segurança
   - Content Security Policy
   - Configuração CORS segura

2. **Frontend (Angular)**:
   - Uso de interpolação segura
   - DomSanitizer para conteúdo HTML
   - Remoção de bindings inseguros

## Testes de Segurança

Após aplicar as correções, o seguinte input malicioso será renderizado como texto simples:
```html
<script>alert('XSS!')</script>
```

Em vez de executar o JavaScript, o código será exibido como texto. 