import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getResults, IResults } from "../api";

function Search(){
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const {data,isLoading} = useQuery<IResults>(["search",keyword],() => getResults(keyword + ""));
    
    
    return (
      <div>
            {isLoading ? "...loading" : (
            <>
            {data?.results.map(item => <li>{item.title || item.original_title}</li>)}
            </>
        )}
      </div>
        
    )
}

export default Search;