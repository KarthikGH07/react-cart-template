import React, { useEffect, useReducer } from 'react'

const initialState = {
    loading: true,
    posts: {},
    error: ''
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                posts: action.payload,
                error: ''
            }
        case 'FETCH_UNSUCCESS':

            return {
                loading: false,
                posts: {},
                error: 'Something went wrong!!'
            }
    }
};

const FetchReducer = () => {
const [state, dispatch] = useReducer(reducer, initialState);

useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then( response => response.json() )
        .then( data => {
            dispatch({type:'FETCH_SUCCESS', payload: data } )
        })
        .catch(error => {
            dispatch({type:'FETCH_UNSUCCESS'})
        })
}, [])
    return (
        <div>
            {console.log(state.posts)}
            {state.loading ? 'loading...' : state.posts.title}
            {state.error ? state.error : null}
        </div>
    )
}

export default FetchReducer
