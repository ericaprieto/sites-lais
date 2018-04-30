const BlogPage = ({ slug }) => (
  <div>
    <h1>Lalis Fotografia</h1>
    <h2>Blog</h2>
    <div>{slug}</div>
  </div>
)

BlogPage.getInitialProps = ({ query: { slug } }) => ({ slug })

export default BlogPage
