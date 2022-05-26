import "./App.css"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient()


 const ReactQueryExample = () => {
  return (
        <QueryClientProvider client={queryClient}>
            <ReactQuery className="r-query">
                ReactQueryExample
            </ReactQuery>
        </QueryClientProvider>
  )
}

export default ReactQueryExample


const ReactQuery = () => {
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch("https://pokeapi.co/api/v2/pokemon/").then(res =>
            res.json()
        )
    )

    if (isLoading) return 'Loading...😉';

    if (error) return '👨🏻‍💻 An error has occurred: ' + error.message

    return(
        <div>
            <div className="space"></div>
            <h1>🤵 Hello React Query 🎨</h1>
            {data.results.map( pokemon => 
                <div key={pokemon.url}>
                    <p>🙍🏻‍♂️ {pokemon.name} ⛔</p>
                    <p>url: 🕸 <span>{pokemon.url}</span></p>
                </div>)}
            {/* <h1>{data.name}</h1>
            <p>{data.description}</p> */}
            {/* <strong>👀 {data.subscribers_count}</strong>{' '}
            <strong>✨ {data.stargazers_count}</strong>{' '}
            <strong>🍴 {data.forks_count}</strong> */}
            <div className="space"></div>
        </div>
    )
}