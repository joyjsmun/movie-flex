
import styled from "styled-components"

const Nav = styled.nav`
    width: 100vw;
    height: 200px;
    display: flex;
    background-color: red;
    padding: 60px;
    justify-content: space-between;
`
const Menu = styled.ul`
    display: flex;
`

const Logo = styled.img``

const Item = styled.li`
    margin: 0 20px;
`

const Search = styled.div``
const SearchInput = styled.input``

function Header(){
    return (
        <>
        <Nav>
            <Menu>
                <Item>Logo</Item>
                <Item>Home</Item>   
                <Item>Tv</Item>
            </Menu>
            <Search>
                <SearchInput />
            </Search>
        </Nav>
        </>
    )
}

export default Header