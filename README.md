# Vulnerabilidade XSS

Este é um projeto de demonstração de vulnerabilidade XSS (Cross-Site Scripting) usando Spring Boot e Angular.

## Estrutura do Projeto
- `backend/`: Aplicação Java com Spring Boot
- `frontend/`: Aplicação Angular

## Pré-requisitos
- Java 11 ou superior
- Node.js e npm
- Maven
- Angular CLI (`npm install -g @angular/cli`)

## Executando o Projeto

### Backend (Spring Boot)

1. Na raiz do projeto, execute:
```bash
mvn spring-boot:run
```
O backend estará disponível em http://localhost:8080

### Frontend (Angular)

1. Em outro terminal, navegue até a pasta frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
ng serve
```
O frontend estará disponível em http://localhost:4200

## Testando a Vulnerabilidade XSS

1. Acesse http://localhost:4200 no navegador
2. Crie um post normal para testar o funcionamento básico
3. Para testar a vulnerabilidade XSS, crie um post com o seguinte conteúdo:

No título ou conteúdo:

```html
<div><img src="x" onerror="alert('teste xss')"></div>
```

```html
<script>alert('XSS!')</script>
```

Ou:

```html
<img src="x" onerror="alert('XSS in content!')">
```
