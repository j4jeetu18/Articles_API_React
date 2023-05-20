import React from 'react';

export default function FilterResults({ searchKey }) {
    React.useEffect(() => {
        console.log(searchKey);
        if (searchKey !== ""){
        const resultDOM = document.getElementsByClassName(searchKey)
            Array.from(resultDOM).map(iterator => {
                iterator.removeAttribute("hidden")
            })}}
        , [searchKey])
}