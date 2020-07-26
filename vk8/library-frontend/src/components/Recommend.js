import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, GENRE_BOOKS } from '../queries'
import Booklist from './Booklist'

const Recommend = (props) => {

    const resultME = useQuery(ME)

    const [getGenres, resultGenres] = useLazyQuery(GENRE_BOOKS)

    useEffect(() => {
        if (!props.token) return
        resultME.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.token])

    useEffect(() => {
        if (!resultME.data || !resultME.data.me) return
        getGenres({ variables: { genre: resultME.data.me.favoriteGenre } })
    }, [resultME.data, getGenres])


    if (!props.show) return null

    if (resultME.loading || resultGenres.loading)
        return <>loading...</>

    const user = resultME.data.me

    const books = resultGenres.data.allBooks

    return(
        <>
            <h2>recommendations</h2>
            {
              `Greetings ${user.username}, \
              here are books in your favorite genre, ${user.favoriteGenre}:`
            }
            <div>
              <Booklist books={books} />
            </div>
        </>
    )
}

export default Recommend
