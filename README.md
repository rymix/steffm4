## 🎶 **Stef.fm** 🎶

### _Music streaming service in a desktop environment in the browser_

![Stars](https://badgen.net/github/stars/rymix/steffm4)
![License](https://badgen.net/github/license/rymix/steffm4)

Stef.fm is an online music streaming platform which I am using as a permanent home for my late friend's amazing house music mix collection. I explain more in my [LinkedIn article](https://www.linkedin.com/pulse/passion-project-digital-preservation-archaeology-steve-arnott/).

The UI is based on the Roland Jupiter-8 keyboard from the 1980s. It's a classic design that I've always loved.

# See it in Action

🌈 [Stef.fm](https://stef.fm) 🌈

# Try it for Yourself

### Clone repo

- [Git](https://git-scm.com/downloads)

```
git clone https://github.com/rymix/steffm4
cd steffm
```

### Yarn

- [Node.js](https://nodejs.org/en/download/) (**v16 LTS**)
- [Yarn](https://classic.yarnpkg.com/en/) (`npm install --global yarn`)

```
yarn
```

##### Development

```
yarn run dev
```

[http://localhost:3001](http://localhost:3001)

##### Production

```
yarn run build
```

### Docker

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

```
docker build -t steffm .
docker run -dp 3001:3001 --rm --name steffm steffm
```
