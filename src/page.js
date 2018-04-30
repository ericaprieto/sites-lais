import Layout from "app/common/Layout"

function page(Component) {
  const Page = ({ children, ...props }) => (
    <Layout>
      <Component {...props}>{children}</Component>
    </Layout>
  )

  Page.getInitialProps = Component.getInitialProps

  return Page
}

export default page
