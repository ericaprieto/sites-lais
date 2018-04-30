import Link from "next/link"
import styled from "styled-components"
import { get } from "lodash"
import StackGrid from "app/common/StackGrid"

const CardWrapper = styled.a`
  display: block;
  border: 1px solid black;
  font-size: 0;

  h3 {
    font-size: 16px;
  }

  img {
    width: 100%;
  }
`

const Card = ({ href, onClick, children }) => {
  if (onClick) {
    return (
      <CardWrapper
        href="#"
        onClick={e => {
          e.preventDefault()
          onClick()
        }}
      >
        {children}
      </CardWrapper>
    )
  }

  return (
    <Link href={href}>
      <CardWrapper>{children}</CardWrapper>
    </Link>
  )
}

const ResultGrid = ({
  items,
  linkBuilder = () => null,
  onItemClick,
  idProp = "id",
  titleProp,
  imageProp
}) => (
  <StackGrid columnWidth="33.33%" duration={0} monitorImagesLoaded>
    {items.map(item => {
      const title = titleProp && get(item, titleProp)
      const image = imageProp && get(item, imageProp)

      return (
        <Card
          key={get(item, idProp)}
          href={linkBuilder(item)}
          onClick={onItemClick ? () => onItemClick(item) : null}
        >
          {title && <h3>{title}</h3>}
          {image && <img src={image} />}
        </Card>
      )
    })}
  </StackGrid>
)

export default ResultGrid
