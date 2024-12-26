const useFetch = (url:string)=>{
    const get =() => {

    }

    const post =async(data:object) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data), 
    })

    const json = await response.json()
    return json

    }

    return {
        get,post
    }
}

export default useFetch