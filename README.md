# Superprice 
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/devsuperior/sds1-wmazoni/blob/master/LICENSE) 

# Sobre o projeto

https://wmazoni-sds1.netlify.app

Superprice é uma aplicação Full Stack web 

 A aplicação permite aos usuarios buscar e comparar o valor de um determinado produto em diversos supermercados, precisando somente escanear ou digitar o código de barras do produto.

 O cadastro e edição de valores são feitos manualmente pelos usuários pois os supermercados não disponibilizam API's para buscar os valores de suas mercadorias.

 A API da aplicação foi desenvolvida em Node.js e possui um CRUD para cada entidade(usuário, produto, supermercado e preço) utilizando o Typeorm para realizar a comunicação com o banco de dados.
 
  Possui um sistema de login utilizando tecnologia JWT. A aplicação também conta com funcionalidades de envio de e-mail para recuperação de senha.

 Foi utilizado o Axios para realizar chamadas a uma API externa para consultar as informações dos produtos, como: Nome, categoria, codito e etc...

 Para a segurança da aplicação, foram limitadas todas as entradas do backend prevenindo Buffer overflow, foram validados todos os parametros utilizando Regex para evitar XSS e SQLI. E para evitar o envio de de arquivos maliciosos para a aplicação foi validado o input de avatar do usuário 

 # Tecnologias utilizadas
## Back end
- Nodejs
- Typescript
- Docker
- Typeorm
- JWT
- Jest
- Swagger UI
## Front end
- ReactJS
- Typescript
- Nextjs
- HTML / CSS
- Chakra UI
- Context API
- Hooks
- React virtualized


## Implantação em produção
- Back end: Heroku
- Front end web: Netlify
- Banco de dados: Postgresql

# Layout
## 1- Página inicial
![Pagina inicial](https://github.com/progmateus/assets/blob/main/desktop-initial.jpg?raw=true)

## 2- Home
![Home](https://github.com/progmateus/assets/blob/main/desktop-dashboard.jpg?raw=true)

## 3- Listagem de produtos
![products](https://github.com/progmateus/assets/blob/main/desktop-products.jpg?raw=true)

## 4- Preços do produto
![prices](https://github.com/progmateus/assets/blob/main/desktop-prices.jpg?raw=true)

## 5- Scanner de código de barras
![scanner](https://github.com/progmateus/assets/blob/main/desktop-scanner.jpg?raw=true)

## 6- Atualizar perfil
![update user](https://github.com/progmateus/assets/blob/main/desktop-update-user.jpg?raw=true)

## 7- Ajustar imagem de perfil
![update user avatar](https://github.com/progmateus/assets/blob/main/desktop-crop-avatar.jpg?raw=true)

# Modelo conceitual
![Modelo Conceitual](https://github.com/progmateus/assets/blob/main/model.jpg?raw=true)

# Layout mobile
![Mobile 1](https://github.com/progmateus/assets/blob/main/mobile-dashboard.png?raw=true) ![Mobile 2](https://github.com/progmateus/assets/blob/main/mobile-prices.png?raw=true) ![Mobile 3](https://github.com/progmateus/assets/blob/main/mobile-scanner.png?raw=true)


# Autor

Mateus Lopes

https://www.linkedin.com/in/progmateus