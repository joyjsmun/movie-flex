import {useQuery} from "react-query"
import styled from "styled-components";
import { getMovies, IMovies } from "../api";
import { makeImagePath } from "../utils";
import {AnimatePresence, motion} from "framer-motion"
import { useState } from "react";
import { type } from "os";


const Wrapper = styled.div`
    background-color: black;
`

const Banner = styled.div<{bgPhoto:string}>`
    height: 100vh;
    display: flex;
    padding:60px;
    flex-direction: column;
    background-size: cover;
    justify-content: center;
    background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)),url(${props => props.bgPhoto});
`

const Title = styled.h2`
    font-family: 'Indie Flower', cursive;
    font-size: 7vh;

`

const Desc  = styled.p`
    font-size: 2.2vh;
    font-weight: 200;
    font-family: 'Indie Flower', cursive;
    width: 50%;
`
const Slider = styled.div`
    position: relative;
    top:-100px;
`

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6,1fr);
    grid-gap: 10px;
    position: absolute;
    width: 100%;
`

const Box = styled(motion.div)<{bgPhoto:string}>`
    background-color: white;
    height: 200px;
    color: red;
    font-size: 50px;
    background-image: url(${props => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    &:first-child { transform-origin : center left}
    &:last-child {transform-origin:center right}
`

const rowVariants = {
    hidden:{
        x: window.outerWidth+10
    },
    visible:{
        x:0
    }
    ,
    exit:{
        x:-window.outerWidth-10
    }
}

const offset = 6;


const boxVariants = {
    normal:{
        scale:1
    },
    hover:{
        scale:1.2,
        y:-50,
        transition:{
            delay:0.2,
            duration:0.3,
            type:"tween"
        }
    }
}

function Home(){
    const {data,isLoading} = useQuery<IMovies>(["movies","nowPlaying"],getMovies) 
    const [index,setIndex] = useState(0);
    const [leaving,setLeaving] =useState(false);
    const toggleLeaving = () => setLeaving(prev => !prev)
    const increaseIndex = () =>  {
       if(data){
           if(leaving) return;
           const offset = 6;
           const maxMovies = data.results.length -1;
           const maxIndex = Math.floor(maxMovies/offset) -1;
           toggleLeaving()
           setIndex(prev => prev === maxIndex ? 0 : prev+1)

       }
    }

    return (
    <Wrapper>
        {isLoading ? "Loading..." : (
                <>
                <Banner
                    onClick={increaseIndex}
                    bgPhoto = {makeImagePath(data?.results[4].backdrop_path || " ")}
                >
                <Title>{data?.results[0].title}</Title>
                <Desc>{data?.results[0].overview}</Desc>
                </Banner>
                <Slider>
                    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                    <Row variants={rowVariants} initial="hidden" animate="visible" exit="exit" key={index} transition={{type:"tween", duration:1}}>
                        {data?.results.slice(1).slice(offset*index, offset*index + offset)
                        .map((movie) => (
                            <Box 
                            key={movie.id} 
                            bgPhoto ={makeImagePath(movie.backdrop_path,"w500")}
                            variants={boxVariants}
                            initial="normal"
                            whileHover="hover"
                            transition={{type:"tween"}}
                            />
                        ))
                        }
                    </Row>
                    </AnimatePresence>
                </Slider>
                </>
        )}
    </Wrapper>
)
}

export default Home;