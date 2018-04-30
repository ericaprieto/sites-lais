import prismic from "app/prismic"
import page from "app/page"
import ResultGrid from "app/common/ResultGrid"

function buildLink(item) {
  return `/gallery/${item.uid}`
}

const GalleriesPage = ({ galleryType, galleries }) => (
  <div>
    <h2>{galleryType.name}</h2>
    <ResultGrid
      items={galleries}
      linkBuilder={buildLink}
      titleProp="title"
      imageProp="cover_image.url"
    />
  </div>
)

GalleriesPage.getInitialProps = async ({
  query: { galleryType: galleryTypeUID }
}) => {
  const galleryType = await prismic.getByUID(
    "gatonafoto",
    "gallery_type",
    galleryTypeUID
  )

  if (!galleryType) {
    throw new Error(`GalleryType "${galleryTypeUID}" was not found on Prismic`)
  }

  return {
    galleryType: prismic.parseItem(galleryType),
    galleries: await prismic
      .query("gatonafoto", [
        prismic.Predicates.at("document.type", "gallery"),
        prismic.Predicates.at("my.gallery.type", galleryType.id)
      ])
      .then(({ results }) => results.map(prismic.parseItem))
  }
}

export default page(GalleriesPage)
