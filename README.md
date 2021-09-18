<div align="center">
  <h1> Helpdesk Whatsapp Bot 🤖📱 </h1>
</div>

## Projeto em construção.
Criado para colocar em prática o conhecimento obtido com a NodeJS através de um projeto pessoal.

---

<p align="center">
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=5965E0&labelColor=121214" alt="License">

  <img src="https://img.shields.io/github/forks/gonribeiro/helpdesk-whatsapp-bot?label=forks&message=MIT&color=5965E0&labelColor=121214" alt="Forks">

  <img src="https://img.shields.io/github/stars/gonribeiro/helpdesk-whatsapp-bot?label=stars&message=MIT&color=5965E0&labelColor=121214" alt="Stars">
</p>

## 🧪 Technologies

This project was developed using the following technologies:

- [NodeJS](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [Whatsapp Web](https://github.com/pedroslopez/whatsapp-web.js)

# Notas: Iniciando com NodeJS
Iniciando / Instalando:
```
$ yarn init -y
$ yarn add express typeorm reflect-metadata sqlite3 whatsapp-web.js qrcode-terminal express-async-errors @types/express -D typescript -D ts-node-dev -D
$ yarn tsc --init
```
tsconfig.json:
```
strict: false
...
"experimentalDecorators": true, # descomentar:
"emitDecoratorMetadata": true, # descomentar:
```
package.json:
```
"license": "MIT",
"scripts": {
    "dev": "ts-node-dev src/server.ts",
    "typeorm": "ts-node-dev node_modules/typeorm/cli.js"
},
```
Na raiz do projeto, crie: ormconfig.json e dentro de src a pasta database.

...

Após criar as entidades...

...
```
$ yarn typeorm migration:run
```