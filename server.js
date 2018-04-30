const express = require('express')
const next = require('next')
const urlJoin = require('url-join')
const routes = require('./src/routes')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev })
const handler = routes.getRequestHandler(app)

if (dev) {
  require("dotenv").config()
}

function multipleSiteHandler(config, nextHandler) {
  return (req, res) => {
    const reqDomain = req.host.split(':')[0]

    if(req.url.indexOf('/static') !== 0 && req.url.indexOf('/_next') !== 0) {
      for(let domain in config) {
        if (reqDomain === domain) {
          req.url = urlJoin(config[domain], req.url)

          if (req.url[req.url.length - 1] === '/') {
            req.url = req.url.substr(0, req.url.length - 1)
          }
        }
      }
    }

    return nextHandler(req, res)
  }
}

app.prepare()
  .then(() => {
    const server = express()
    
    server.get("*", multipleSiteHandler({
      [process.env.GATONAFOTO_DOMAIN]: '/gatonafoto',
      [process.env.LALIS_DOMAIN]: '/lalis',
    }, handler))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
