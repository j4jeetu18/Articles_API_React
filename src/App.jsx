import './styles/App.css'
import React from 'react'
import Card from "./Card"
import 'rsuite/dist/rsuite.min.css';
import SearchBar from './SearchBar';
import FilterResults from "./FilterResults"


function App() {

  const [rawData, setRawData] = React.useState(null)
  const [searchSuggestions, setSearchSuggestions] = React.useState([])
  const [searchKey, setSearchKey] = React.useState("")

  React.useEffect(() => {
    fetch("https://api.theinnerhour.com/v1/customers/resources/articles/list?page=1&limit=10")
      .then(response => response.json())
      .then(resInJSON => setRawData(resInJSON.data))
  }, [])

  if (rawData !== null)
    return (
      <>
        <nav>
          <img id="logo" src="../public/Asset 1 1.png" onClick={() => setSearchKey("")} />
        </nav>

        <SearchBar
          searchSuggestions={searchSuggestions}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />

        <section id='cardsContainer'>
          {rawData.map(iterator =>
            <Card
              title={iterator.title}
              thumb={iterator.thumb}
              short_description={iterator.short_description}
              reading_time={iterator.reading_time}
              slug={iterator.slug}
              key={iterator.id}
              shouldShow={searchKey}
              setSearchSuggestions={setSearchSuggestions}
            />
          )}
        </section>

        {searchKey !== "" &&
          <section id='cardsContainer'>
            <FilterResults searchKey={searchKey}/>
          </section>
        }
      </>
    )
}

export default App
