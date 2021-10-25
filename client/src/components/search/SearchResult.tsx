import React, { useEffect, useState } from "react";

type Props = {
    query: string;
};

function processProblems(body: Object) {

}

const getResult = async(_query: string, _page=1) => {
    if(_query.length == 0) _query="tier:b5..r1";
    const url = "https://solved.ac/api/v3/search/problem?query=" + _query + "&page=" + _page;
    console.log(url);

    const response = await fetch(url);
    const body = await response.json();

    console.log(body);

    return body.items;
}

function SearchResult(props: Props) {
    const [result, setResult] = useState<any>();

    useEffect(() => {
        getResult(props.query)
        //.then(res => setResult(res))
        .then(res => console.log(res))
        .catch(err => console.log(err))
    });

    return(
        <div>
            {result}
        </div>
    );
}

export default SearchResult;