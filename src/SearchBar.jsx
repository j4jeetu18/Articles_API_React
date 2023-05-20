import { AutoComplete,Modal } from "rsuite";

export default function SearchBar({ searchSuggestions, setSearchKey,searchKey }) {
    searchSuggestions = new Set(searchSuggestions)
    const data = Array.from(searchSuggestions)


    function handleSelect(value) {
        setSearchKey(value)
    }


    function handleChange(value) {
        if (value === "")
            setSearchKey("")
    }
    return (
        <section id="searchBarSection">
            <p class="heading2">{searchKey === "" ? "All Articles" : `Search Results For "${searchKey}"`}</p>
            <AutoComplete style={{ width: "340px", margin: "1.65% 0" }} placeholder="Search For Suggestions..." data={data} onChange={handleChange} onSelect={handleSelect} />
        </section>
    )
}