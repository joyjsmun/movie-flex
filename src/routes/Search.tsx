

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

const Box = styled.div<{bgphoto:string}>`
  background-color: transparent;
  border:0.7px solid #232323;
  height: 200px;
  margin-bottom: 4vw;
  border-radius: 5px;
  background-image: url(${props => props.bgphoto});
  background-position: center center;
  background-size: cover;
`

const MovieList = styled.div`
  padding-left: 60px;
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
          <MovieList>Explore titles related to : {data?.results.slice(0, 5).map(item => <h4>{item?.name || item?.original_title || item.title || item.original_name} |</h4>)}</MovieList>
          <Row>
            {data?.results.map(item => (
              <Box
                bgphoto = {makeImagePath(item?.backdrop_path || item?.poster_path,"w500")}
              >

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