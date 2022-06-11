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
  position: relative;
  top:130px;
`

const Row = styled.div`
display: grid;
grid-template-columns: repeat(6,1fr);
grid-gap: 5px;
position: absolute;
width: 100%;
`

const Box = styled.div`
  background-color: white;
  height: 200px;
`

const MovieList = styled.div`
  display: flex;
  align-items: baseline;
h4{
  padding-left: 10px;
}

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
          <MovieList>Explore titles related to : {data?.results.slice(0, 10).map(item => <h4>{item?.name || item?.original_title || item.title || item.original_name} |</h4>)}</MovieList>
          <Row>
            {data?.results.map(item => (
              <Box>

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