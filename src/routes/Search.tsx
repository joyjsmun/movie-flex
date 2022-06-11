import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getResults, IResults } from "../api";
import { makeImagePath } from "../utils";


const Wrapper = styled.div`
background-color: black;

`
const Slider = styled.div`
  background-color: tomato;
  height: 100vh;
  display: flex;
  padding:60px;
   position: relative;
  top:130px;
`

const Row = styled(motion.div)`
display: grid;
grid-template-columns: repeat(6,1fr);
grid-gap: 5px;
position: absolute;
width: 100%;
`

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
          <h4>Explore titles related to: {data?.results.map(item => <span>{item?.name || item?.original_title || item.title || item.original_name} | </span>)}</h4>
          <Row></Row>
       </Slider>
     </>
     )}
   </Wrapper>     
    )
}

export default Search;