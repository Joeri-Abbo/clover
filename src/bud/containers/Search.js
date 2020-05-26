import {useContext, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import globby from 'globby'
import {Observable} from 'rxjs'

/** application */
import {store} from '../store'

/**
 * Search
 *
 * @prop {array}  glob
 * @prop {string} label
 */
const Search = ({glob, label}) => {
  const {dispatch} = useContext(store)

  /**
   * Return an observable emitting
   * budfile matches.
   */
  const [search] = useState(
    new Observable(async observer => {
      observer.next({status: 'Searching'})

      const results = await globby(glob)

      observer.next({
        results,
      })

      observer.complete()
    }),
  )

  /**
   * Once there is an observer available to subscribe to,
   * use what it emits to set various component states.
   */
  const [status, setStatus] = useState(null)
  const [complete, setComplete] = useState(null)
  const [results, setResults] = useState(null)
  useEffect(() => {
    search && search.subscribe({
      next: next => {
        next.status && setStatus(next.status)
        next.results && setResults(next.results)
      },
      complete: () => setComplete(true),
      error: () => setComplete(true),
    })
  }, [search])

  /**
   * Mirror any changes to component state
   * in the global store.
   */
  useEffect(() => {
    dispatch({
      type: 'SEARCH_RESULTS',
      label,
      results,
      complete,
      status,
    })
  }, [results, status, complete])

  /**
   * Render
   */
  return null
}

Search.propTypes = {
  glob: PropTypes.array.isRequired,
  label: PropTypes.string,
}

Search.defaultProps = {
  label: 'Search',
}

export default Search
