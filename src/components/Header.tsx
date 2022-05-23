
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Nav = styled.nav`
    width: 100vw;
    height: 100px;
    display: flex;
    background-color: red;
    padding: 60px;
    justify-content: space-between;
`
const Menu = styled.ul`
    display: flex;
    width: 250px;
    font-size: large;
    align-items: center;
    justify-content: space-around;
`

const Logo = styled.div`
    display: flex;
    width: 30px;
    height: 30px;
    margin-right: 10px;
`

const Item = styled.li`
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Search = styled.div``
const SearchInput = styled.input``

const icon = {
    hidden: {
      pathLength: 0.5,
      fill: "rgba(255, 255, 255, 0)"
    },
    visible: {
      pathLength: 2,
      fill: "rgba(255, 255, 255, 1)"
    }
  }

const Circle = styled.div`
    width: 10px;
    height: 10px;
    background-color: blue;
    border-radius: 5px;
    margin-top: 10px;
`

function Header(){
    return (
        <>
        <Nav>
            <Menu>
            <Logo>
                <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="item"
                >
                <motion.path
                    d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    transition={{
                    default: { duration: 2, ease: "easeInOut" },
                    fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                    }}
                />
                </motion.svg>
            </Logo>
                <Item>
                    <Link to="/">
                    Home
                    <Circle  />
                </Link>
                </Item>   
                <Item>
                <Link to="/tv">
                    TV Show
                <Circle />
                </Link>
                </Item>
            </Menu>
            <Search>
                <SearchInput />
            </Search>
        </Nav>
        </>
    )
}

export default Header