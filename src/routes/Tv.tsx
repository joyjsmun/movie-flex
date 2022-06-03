import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvs, ITvs } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
    background-color: tomato;
`

const Banner = styled.div<{bgPhoto:string}>`
    height: 100vh;
    display: flex;
    padding: 60px;
    flex-direction: column;
    justify-content: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.7)),url(${props => props.bgPhoto});
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

const Row = styled.div`
display: grid;
grid-template-columns: repeat(6,1fr);
gap:10px;
width: 100%;
position: absolute;
`

const Box = styled.div`
background-color: white;
height: 200px;
color:red;
font-size: 50px;
`


function Tv(){
    const {data,isLoading} = useQuery<ITvs>(["tvs","nowPlaying"],getTvs)
    console.log(data)

    return (<Wrapper>
        {isLoading ? "Loading..." : (
            <>
            <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || " ")}>
                <Title>{data?.results[0].name}</Title>
                <Desc>{data?.results[0].overview}</Desc>
            </Banner>
            <Slider>
                <Row>
                    <Box>1</Box>
                    <Box>2</Box>
                    <Box>3</Box>
                    <Box>4</Box>
                    <Box>5</Box>
                    <Box>6</Box>
                </Row>
            </Slider>
            </>
        )}
    </Wrapper>)
}

export default Tv;