import { Fragment } from "react"
import { State } from "react-powerplug"
import PrismicDOM from "prismic-dom"
import Lightbox from "app/common/Lightbox"
import prismic from "app/prismic"
import page from "app/page"
import ResultGrid from "app/common/ResultGrid"

const GalleryPage = ({ gallery }) => (
  <State initial={{ lightboxOpen: false, currentLightboxImage: 0 }}>
    {({ state: { lightboxOpen, currentLightboxImage }, setState }) => (
      <Fragment>
        <h2>{gallery.title}</h2>
        {gallery.description && (
          <div dangerouslySetInnerHTML={{ __html: gallery.description }} />
        )}
        <Lightbox
          images={gallery.photos.map(({ photo }) => ({
            src: photo.url
          }))}
          isOpen={lightboxOpen}
          currentImage={currentLightboxImage}
          onClose={() => setState({ lightboxOpen: false })}
          onClickPrev={() =>
            setState({ currentLightboxImage: currentLightboxImage - 1 })
          }
          onClickNext={() =>
            setState({ currentLightboxImage: currentLightboxImage + 1 })
          }
        />
        <ResultGrid
          items={gallery.photos}
          onItemClick={item =>
            setState({
              lightboxOpen: true,
              currentLightboxImage: gallery.photos.indexOf(item)
            })
          }
          idProp="photo.url"
          imageProp="photo.thumbnail.url"
        />
      </Fragment>
    )}
  </State>
)

GalleryPage.getInitialProps = async ({ query: { gallery: galleryUID } }) => {
  const gallery = await prismic.getByUID("gatonafoto", "gallery", galleryUID)

  if (!gallery) {
    throw new Error(`Gallery "${galleryUID}" was not found on Prismic`)
  }

  return {
    gallery: {
      ...prismic.parseItem(gallery),
      description: PrismicDOM.RichText.asHtml(gallery.data.description)
    }
  }
}

export default page(GalleryPage)
