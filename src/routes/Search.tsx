import { useLocation, useSearchParams } from "react-router-dom";

function Search(){
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    console.log(keyword)
    
    return <div>Search</div>
}

export default Search;