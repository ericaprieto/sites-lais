import styled from "styled-components"
import { nest } from "recompose"
import Link from "next/link"
import Wrap from "app/common/Wrap"

const Wrapper = nest(
  styled.div`
    background: #f0f0f0;
  `,
  Wrap.extend`
    height: 70px;
    display: flex;
    align-items: center;
  `
)

const Logo = styled.div`
  margin-right: auto;
`

const Menu = styled.ul``

const MenuItem = styled.li`
  display: inline-block;

  &:not(:first-child) {
    margin-left: 10px;
  }
`

const menuItems = [
  ["Home", "/"],
  ["Portfolio", "/portfolio"],
  ["Sobre", "/about"],
  ["Contato", "/contact"]
]

function renderMenuItem([label, to]) {
  return (
    <MenuItem key={to}>
      <Link href={to}>
        <a>{label}</a>
      </Link>
    </MenuItem>
  )
}

const Header = () => (
  <Wrapper>
    <Logo>Gato na Foto</Logo>
    <Menu>{menuItems.map(renderMenuItem)}</Menu>
  </Wrapper>
)

export default Header
