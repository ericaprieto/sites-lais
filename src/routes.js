const routes = (module.exports = require("next-routes")())

function siteRoutes(site, config) {
  config.forEach(([name, path, page]) => {
    routes.add(
      `${site}.${name}`,
      `/${site}${path === "/" ? "" : path}`,
      `${site}/${page}`
    )
  })
}

siteRoutes("gatonafoto", [
  ["index", "/", "index"],
  ["about", "/about", "about"],
  ["portfolio", "/portfolio/", "portfolio"],
  ["galleries", "/portfolio/:galleryType", "galleries"],
  ["gallery", "/gallery/:gallery", "gallery"]
])

siteRoutes("lalis", [
  ["index", "/", "index"],
  ["about", "/about", "about"],
  ["blog", "/blog/:slug", "blog"]
])
