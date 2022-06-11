

import {motion } from "framer-motion";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getResults, IResults } from "../api";
import { makeImagePath } from "../utils";



const Wrapper = styled.div`
background-color: black;

`
const Slider = styled.div`
  /* background-color: tomato; */
  background-color: transparent;
  position: relative;
  top:130px;

`

const Row = styled.div`
padding: 0px 60px 0px 60px;
display: grid;
grid-template-columns: repeat(6,1fr);
grid-gap: 7px;
position: absolute;
width: 100%;
`

const Box = styled(motion.div)<{bgphoto:string}>`
  background-color: transparent;
  border:0.7px solid #232323;
  height: 200px;
  margin-bottom: 4vw;
  border-radius: 5px;
  background-image: url(${props => props.bgphoto});
  background-position: center center;
  background-size: cover;
  cursor: pointer;
`

const boxVariants = {
  normal:{
    scale:1
  },
  hover:{
    scale:1.3,
    transition:{
      type:"tween",
      delay:0.4,
      duration:0.3
    }
  }
}

const MovieList = styled.div`
  padding-left: 60px;
  display: flex;
  align-items: baseline;
h4{
  padding-left: 10px;
}

`

const Info = styled(motion.div)`
    padding:20px;
    width: 100%;
    position: absolute;
    bottom:0;
    opacity: 0;
    
    h4{
        font-size: 17px;
        text-align: center;
        color:${props => props.theme.white.lighter}
    }
    background-color:${props => props.theme.black.lighter}
`

const infoVariants = {
  hover:{
    opacity:0.8,
    transition:{
        delay:0.3,
        duration:0.1,
        type:"tween",
     }
  }

}

function Search(){
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const {data,isLoading} = useQuery<IResults>(["search",keyword],() => getResults(keyword + ""));
        
    console.log(data)
    return (
   <Wrapper>
     {isLoading ? "Loading..." : (
     <>
     <Slider>
          <MovieList>Explore titles related to : {data?.results.slice(0, 5).map(item => <h4>{item?.name || item?.original_title || item.title || item.original_name} |</h4>)}</MovieList>
         
          <Row>
            {data?.results.map(item => (
              <Box
               variants={boxVariants}
               initial="normal"
               whileHover="hover"
                bgphoto = {makeImagePath(item?.backdrop_path || item?.poster_path,"w500")}
              >
                  <Info variants={infoVariants}>
                    <h4>{item?.name || item?.original_title || item.title || item.original_name}</h4>
                  </Info>
              </Box>
            ))}
          </Row>
       </Slider>
     </>
     )}
   </Wrapper>     
    )
}

export default Search;