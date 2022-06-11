import { AnimatePresence, motion,useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvs, ITvs } from "../api";
import { makeImagePath } from "../utils";
import { useNavigate,useParams } from 'react-router-dom';



const Wrapper = styled.div`
    background-color: tomato;
`

const Banner = styled.div<{bgphoto:string}>`
    height: 100vh;
    display: flex;
    padding: 60px;
    flex-direction: column;
    justify-content: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.7)),url(${props => props.bgphoto});
`

const Title = styled.h2`
    font-size: 7vh;
`

const Desc = styled.p`
    font-size: 2.2vh;
    font-weight: 200;
    width: 50%;
`

const Slider = styled.div`
    position: relative;
    top:-100px;
    
`

const Row = styled(motion.div)`
 padding: 0px 20px 0px 20px;
display: grid;
grid-template-columns: repeat(6,1fr);
grid-gap:5px;
width: 100%;
position: absolute;
`

const Box = styled(motion.div)<{bgphoto:string}>`
background-color: white;
height: 200px;
color:red;
font-size: 50px;
background-image: url(${props => props.bgphoto});
    background-size: cover;
    background-position: center center;

&:first-child{
    transform-origin: center left;
}
&:last-child{
    transform-origin: center right;
}

`


const Info = styled(motion.div)`
   padding: 20px;
   background-color: ${props => props.theme.black.lighter};
   position: absolute;
   width: 100%;
   bottom: 0;
   opacity: 0;
   h4{
       font-size: 15px;
       text-align: center;
       color: ${props => props.theme.white.darker};
   }
`


const rowVariants = {
    hidden :{
        x:window.outerWidth+5
    },
    visible:{
        x:0
    },
    exit:{
        x:-window.outerWidth-5
    }
}

const offset = 6;

const boxVariants = {
    start:{
        scale:1
    },
    hover:{
        scale:1.3,
        transition:{
            type:"tween",
            delay:0.4,
            duration:0.3,
        }
    }
}

const infoVariants = {
    hover:{
        opacity:0.8,
        transition:{
            type:"tween",
            delay:0.4,
            duration:0.3
        }
    

    }
}

const Overlay = styled(motion.div)`
    position: fixed;
    top:0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
`

const BoxModal = styled(motion.div)`
     width: 50vw;
    height: 80vh;
    left:0;
    right: 0;
    margin:0 auto;
    background-color: ${props => props.theme.black.darker};
    position: absolute;
    border-radius: 5px;
        
`

const ModalImg = styled(motion.div)`
     border-radius: 15px 15px 0px 0px; 
        width:100%;
        background-size:cover;
        background-position:center center;
        height:500px;


`

const ModalTitle = styled.h4`
        position: relative;
        font-size: xx-large;
        bottom: 17vh;
        padding: 35px;
`

const ModalDesc = styled.p`
     margin: 30px;
`


function Tv(){
    const navigate = useNavigate();
    const {scrollY} = useViewportScroll()
    const boxParam = useParams()
    const {data,isLoading} = useQuery<ITvs>(["tvs","popular"],getTvs)
    const [index,setIndex] = useState(0);
    const [leaving,setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving(prev => !prev)
    const increaseIndex = () => {
        if(data){
            if(leaving) return;
            const offset = 6;
            const tvResultsNum = data.results.length -1;
            // because index is starting from '0'
            const maxIndex = Math.floor(tvResultsNum / offset)-1;
            toggleLeaving()
            setIndex(prev => prev === maxIndex ? 0 : prev+1);
        }
    }

    const boxClicked = (tvId:number) => {
        navigate(`/tv/${tvId}`)
    }
    const overlayClicked = () => navigate(`/tv`);

    const tvDetail = boxParam.tvId && data?.results.find(tv => tv.id + "" === boxParam.tvId)

    console.log(tvDetail)

    return (
    <Wrapper>
        {isLoading ? "Loading..." : (
            <>
            <Banner 
                onClick={increaseIndex}
                bgphoto={makeImagePath(data?.results[0].backdrop_path || " ")}>
                <Title>{data?.results[0].name}</Title>
                <Desc>{data?.results[0].overview}</Desc>
            </Banner>
            <Slider>
               <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row key={index} variants={rowVariants} initial="hidden" animate="visible" exit="exit" transition={{type:"tween",duration:1}} >
                       {data?.results.slice(1).slice(offset*index,offset*index+offset).map((tv) => (
                       <Box 
                       layoutId={tv.id + ""}
                       onClick={() => boxClicked(tv.id)}
                       key={tv.id}
                       variants={boxVariants}
                       initial="start"
                       whileHover="hover"
                       transition={{type:"tween"}}
                       bgphoto={makeImagePath(tv?.backdrop_path === null ? tv?.poster_path : tv?.backdrop_path ,"w500")}
                      >
                          <Info variants={infoVariants}>
                            <h4>{tv.name}</h4>
                          </Info>
                          </Box>
                       ))
                       }
                    </Row>
               </AnimatePresence>
            </Slider>
            <AnimatePresence>
                {boxParam.tvId ? (
                <>
                <Overlay onClick={overlayClicked} exit={{opacity:0}} animate={{opacity:1}} />
                <BoxModal layoutId={boxParam.tvId} style={{top:scrollY.get() + 100}} >
                    {tvDetail ? 
                    <>
                    <ModalImg style={{backgroundImage:`url(${makeImagePath(tvDetail?.backdrop_path,"w500")})`}} />
                    <ModalTitle>{tvDetail.name}</ModalTitle> 
                    <ModalDesc>{tvDetail.overview}</ModalDesc>
                    </>
                    : null}
                </BoxModal>
                </>
                ) : null}
            </AnimatePresence>
            </>
        )}
    </Wrapper>)
}

export default Tv;