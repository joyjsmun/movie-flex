import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvs, ITvs } from "../api";

const Wrapper = styled.div`
    background-color: tomato;
`

const Banner = styled.div``

const Title = styled.h2``

const Desc = styled.p``


function Tv(){
    const {data,isLoading} = useQuery<ITvs>(["tvs","nowPlaying"],getTvs)

    return (<Wrapper>
        {isLoading ? "Loading..." : (
            <>
            <Banner>
                <Title></Title>
                <Desc></Desc>
            </Banner>
            </>
        )}
    </Wrapper>)
}

export default Tv;