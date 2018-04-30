import { Fragment } from "react"
import Wrap from "app/common/Wrap"
import Header from "./Header"

const Content = Wrap.extend`
  padding-top: 30px;
  padding-bottom: 30px;
`

const Layout = ({ children }) => (
  <Fragment>
    <Header />
    <Content>{children}</Content>
  </Fragment>
)

export default Layout
