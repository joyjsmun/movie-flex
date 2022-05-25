import {useQuery} from "react-query"
import styled from "styled-components";
import { getMovies, IMovies } from "../api";
import { makeImagePath } from "../utils";


const Wrapper = styled.div``

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
    font-size: 7vh;
    font-weight: 600;
    margin-bottom: 25px;
`

const Desc  = styled.p`
    font-size: 2.2vh;
    width: 50%;
`
const Slider = styled.div``




function Home(){
    const {data,isLoading} = useQuery<IMovies>(["movies","nowPlaying"],getMovies) 
    console.log(data,isLoading)
    return (
    <Wrapper>
        {isLoading ? "Loading..." : (
                <>
                <Banner
                    bgPhoto = {makeImagePath(data?.results[0].backdrop_path || " ")}
                >
                <Title>{data?.results[0].title}</Title>
                <Desc>{data?.results[0].overview}</Desc>
                </Banner>
                <Slider>

                </Slider>
                </>
        )}
    </Wrapper>
)
}

export default Home;