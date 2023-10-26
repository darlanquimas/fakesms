# Fake SMS Node App

Este é um aplicativo Node.js destinado a testes de envio de SMS. Ele permite simular o envio de mensagens SMS e registrar os logs das mensagens enviadas.

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu sistema. Além disso, você precisará do [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/) para gerenciar as dependências do projeto.

## Instalação

1. Clone este repositório em seu sistema:

   ```bash
   git clone https://github.com/darlanquimas/fakesms.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd fake-sms
   ```

3. Renomeie o arquivo `example.env` para `.env`:

   ```bash
   mv example.env .env
   ```

4. Instale as dependências usando Yarn ou npm:

   Com Yarn:

   ```bash
   yarn install
   ```

   Ou com npm:

   ```bash
   npm ci
   ```

## Uso

Para enviar um SMS simulado, faça uma requisição GET para a seguinte URL:

```
http://SEUIP:porta/api/message/?recipient=<DESTINATARIO>&message=<MENSAGEM>&user=<USUARIOREMETENTE>
```

Substitua os seguintes parâmetros na URL:

- `SEUIP` - O endereço IP onde o aplicativo está sendo executado.
- `porta` - A porta configurada para o aplicativo.
- `DESTINATARIO` - Número de telefone do destinatário.
- `MENSAGEM` - O conteúdo da mensagem SMS.
- `USUARIOREMETENTE` - Nome de usuário remetente.

Para ver o log das mensagens enviadas, acesse o seguinte URL em um navegador:

```
http://SEUIP:porta
```

## Bibliotecas Utilizadas

O projeto utiliza as seguintes bibliotecas:

- [date-fns](https://www.npmjs.com/package/date-fns): Gerenciamento de datas.
- [dotenv](https://www.npmjs.com/package/dotenv): Carregar variáveis de ambiente a partir do arquivo `.env`.
- [ejs](https://www.npmjs.com/package/ejs): Engine de modelo para geração de páginas HTML.
- [express](https://www.npmjs.com/package/express): Framework web para Node.js.
- [fs-extra](https://www.npmjs.com/package/fs-extra): Extensão do módulo fs para Node.js.
- [sqlite3](https://www.npmjs.com/package/sqlite3): Banco de dados SQLite.
- [uuid](https://www.npmjs.com/package/uuid): Geração de UUIDs.

## TypeScript

O aplicativo é desenvolvido em TypeScript.
