# Ponto Turístico

# Back-end
- O banco usado é MySql
- Abra o visual studio 2019
- Altere sua configurações do banco no arquivo appsettings.json
```
"DefaultConnection": "server= sua_configuracao_de_host ; port=sua_configuração_de_porta; database=pontoturisticodb; user=sua_configuração_de_usuario; password= sua_configuração_de_senha"
```
- No console de gerenciamento de pacotes, execute o código a seguir:
```
Update-Database
```

# Front-end
- Abra o terminal no local deste clone.
- Entre na pasta a seguir:
```
cd frontend/pontosturisticos
```
- Execute o comando a seguir para intalar as dependencias do projeto
```
npm install
```
- Trocar no arquivo services/api.ts a url da api
```
baseURL: "url_da_api",
```
- Efetue o comando a baixo para executar a aplicação:
```
npm start
```
