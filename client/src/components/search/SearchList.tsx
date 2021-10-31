import React, { useEffect, useState } from "react";
import SearchItem from "./SearchItem";

type Props = {
    data: any[];
};

function SearchList(props: Props) {
    return(
        <div>
            {props.data.map(
                item => {
                    return(
                        <SearchItem id={item.problemId} level={item.level} title={item.titleKo}/>
                    );
                }
            )}
        </div>
    );
}

export default SearchList;
