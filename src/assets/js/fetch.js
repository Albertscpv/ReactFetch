// import {useState, useEffect} from 'react';

// export function useFetch(url){
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [controller, setController] = useState(null);

//     useEffect(() =>{
//         const abortController = new AbortController();
//         setController(abortController);

//         //Get data from the server.
//         fetch(url, {signal: abortController.signal })
//             .then((response) => response.json())
//             .then((data) => setData(data))
//             .catch((error) => {
//                 if(error.name === "AbortError"){
//                     console.log("Request Cancelled");
//                 }else{
//                     setError(error)
//                 }
//             })
//             .finally(()=> setLoading(false)); 
//         //Loading in case not load the page.
//         return () => abortController.abort();
//         },[]);

//         const handleCancelRequest = () => {
//             if(controller){
//                 controller.abort();
//                 setError("Cancelled");
//             }
//         }

//     return { data, loading, error, handleCancelRequest }
// }


//Render as you fetch
function getSuspender(promise){
    let status = "pending";
    let response;

    const suspender = promise.then(
        (res) => {
            status = "success";
            response = res;
        },
        (err) => {
            status: "error";
            response: err;
        }

    );
    const read = () =>{
        switch(status){
            case "pending":
                throw suspender;
            case "error":
                throw response;
            default:
                return response;
        }
    }
    return { read }
}
export function fetchData(url){
    const promise = fetch(url)
        .then((response) => response.json())
        .then((data) => data);
    
    return getSuspender(promise);
}