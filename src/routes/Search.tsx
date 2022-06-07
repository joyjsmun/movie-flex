import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getResults, IResults } from "../api";

function Search(){
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const {data,isLoading} = useQuery<IResults>(["search",keyword],() => getResults(keyword + ""));
    
    const Wrapper = styled.div`
      position: absolute;
      top:100px;
    `

    const Results = styled.div`
      padding: 60px;
    `
    
    return (
      <Wrapper>
            <Results>
            {isLoading ? "...loading" : (
            <>
            {data?.results.map(item => <li>{item.title || item.original_title || item.original_name || item.name}</li>)}
            </>
        )}
            </Results>
      </Wrapper>
        
    )
}

export default Search;