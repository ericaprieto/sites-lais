import prismic from "app/prismic"
import page from "app/page"
import ResultGrid from "app/common/ResultGrid"

function buildLink(item) {
  return `/portfolio/${item.uid}`
}

const PortfolioPage = ({ galleryTypes }) => (
  <ResultGrid
    items={galleryTypes}
    linkBuilder={buildLink}
    titleProp="name"
    imageProp="cover_image.url"
  />
)

PortfolioPage.getInitialProps = async () => ({
  galleryTypes: await prismic
    .query("gatonafoto", prismic.Predicates.at("document.type", "gallery_type"))
    .then(({ results }) =>
      results.map(result => ({
        id: result.id,
        uid: result.uid,
        ...result.data
      }))
    )
})

export default page(PortfolioPage)
