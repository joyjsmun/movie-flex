
import { motion, useAnimation, useViewportScroll } from "framer-motion"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"

const Nav = styled(motion.nav)`
    width: 100vw;
    height: 100px;
    position: fixed;
    display: flex;
    background-color: red;
    padding: 60px;
    color: white;
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
    position: relative;
`

const Circle = styled(motion.div)`
    width: 10px;
    height: 10px;
    background-color: blue;
    border-radius: 5px;
    
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    margin-top: 10px;
`


const Search = styled(motion.form)`
    display: flex;
    justify-content: center;
    width: 200px;
    height: 30px;
`

const SearchIcon = styled(motion.svg)`
    margin-right: 10px;
`
const SearchInput = styled(motion.input)`
    border:none;
    transform-origin: right center;
    width: 150px;
    height: 25px;
    background-color: transparent;
    color:white;
    ::placeholder {color: white;
    background-color: transparent;
    }
    :focus {
     border: none;
     outline: none;

}
`

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

const navVariants = {
    top:{
        backgroundColor : "rgba(0,0,0,0)"
    },
    scroll:{
        backgroundColor: "rgba(0,0,0,1)"
    }

}

interface IForm{
    keyword:string
}



function Header(){
    const [searchOpen,setSearchOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const inputAnimation = useAnimation();
    const {scrollY} = useViewportScroll();
    const navAnimation = useAnimation()
    const {register,handleSubmit} = useForm<IForm>()
    const onValid = (data:IForm) => {
        navigate(`/search?keyword=${data.keyword}`);
       
    }



    useEffect(()=>{
        scrollY.onChange(()=>{
            if(scrollY.get() > 80){
                navAnimation.start("top")
            }else{
                navAnimation.start("scroll")
            }
        })
    },[scrollY,navAnimation])
    
    
  
    const toggleSearch = () => {
        if (searchOpen) {
          inputAnimation.start({
            scaleX: 0,
          });
        } else {
          inputAnimation.start({ scaleX: 1 });
        }
        setSearchOpen((prev) => !prev);
      };



    
    return (
        <>
        <Nav variants={navVariants} animate={navAnimation} initial={"top"} exit={"top"}>
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
                    {location.pathname === "/" ? <Circle layoutId="dot" /> : null}
                </Link>
                </Item >   
                <Item>
                <Link to="/tv">
                    TV Show
                    {location.pathname === "/tv" ? <Circle layoutId="dot" /> : null}
                </Link>
                </Item>
            </Menu>
            <Search onSubmit={handleSubmit(onValid)} animate={{border: searchOpen ? "1px solid": 0}} transition={{type:"linear"}}>
            <SearchIcon
             onClick={toggleSearch}
            animate={{ x: searchOpen ? 0 : 185}}
            transition={{ type: "linear" }}
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M13 11C13 13.7614 10.7614 16 8 16C5.23858 16 3 13.7614 3 11C3 8.23858 5.23858 6 8 6C10.7614 6 13 8.23858 13 11ZM14.0425 16.2431C12.5758 17.932 10.4126 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 11.9287 15.8417 12.8205 15.5507 13.6497L24.2533 18.7028L22.7468 21.2972L14.0425 16.2431Z" fill="currentColor"></path></SearchIcon>
                <SearchInput  
                {...register("keyword",{required:true,minLength:2})}
                animate={inputAnimation}  initial={{ scaleX: 0 }} transition={{ type: "linear" }}  placeholder="Search Movie or Show"/>
            </Search>
        </Nav>
        </>
    )
}

export default Header