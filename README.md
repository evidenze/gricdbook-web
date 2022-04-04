# Gricd Books Frontend

## Live Web URL
[https://gricdbook-web-9h964.ondigitalocean.app](https://gricdbook-web-9h964.ondigitalocean.app)

Admin Sign up
[https://gricdbook-web-9h964.ondigitalocean.app/admin/register](https://gricdbook-web-9h964.ondigitalocean.app/admin/register)

Admin Sign In
[https://gricdbook-web-9h964.ondigitalocean.app/admin/login](https://gricdbook-web-9h964.ondigitalocean.app/admin/login)

## Live API URL
[https://gricdbook-api.herokuapp.com](https://gricdbook-api.herokuapp.com/)

---
**NOTE**

Images are deleted from the server automatically after 5 minutes. This is because of the sandbox database being used for this test.

---

## How to install

Clone the repo:

```bash
git clone https://github.com/evidenze/gricdbook-web.git
cd gricdbook-web
```
Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

Install the dependencies:

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# API URL
API_URL=GricdBook_API_URL
