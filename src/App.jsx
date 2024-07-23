import { fetchData } from './assets/js/fetch'
import { Suspense } from 'react'
import './App.css'

const apiData = fetchData("https://jsonplaceholder.typicode.com/users");

function App() {
  const data = apiData.read();

  return (
    <>
    <div className='App'>
      <h1>Fetch uses</h1>
      <Suspense fallback={<div>Loading...</div>}>
      <ul className='Card'>
        {data?.map((user) =>(
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      </Suspense>   
    </div>
    </>
  )
}

export default App



// const { data, loading, error, handleCancelRequest } = useFetch("https://jsonplaceholder.typicode.com/users")
  //Fetch with async proccesing
      // <button onClick={handleCancelRequest}>Cancel Request</button>
      // <h1>Fetch Like a pro</h1>
      // <div className='Card'>
      //   <ul>
      //   {error && <li>Error: {error}</li>}
      //   {loading && <li>Loading...</li>}
      //   {data?.map((user)=> (
      //     <li key={user.id}>{user.name}</li>
      //   ))}
      // </ul>
      // </div> 