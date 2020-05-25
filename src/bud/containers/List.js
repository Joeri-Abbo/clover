import {basename} from 'path'
import React, {useContext, useState, useEffect} from 'react'
import {Box, Color, Text} from 'ink'
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
const List = ({glob, label}) => {
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
        results: results ? results : null,
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
    search?.subscribe({
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
    complete && dispatch({
      type: 'SET',
      key: 'status',
      value: 'complete',
    })

    dispatch({
      type: 'SEARCH_RESULTS',
      label,
      results,
      complete,
      status,
    })
  }, [results, status, complete])

  /** Format matched files for display */
  const displayFile = file => basename(file).replace('.bud.js', '')

  /**
   * Render
   */
  return (
    <Box flexDirection="column">
      {results?.map((result, id) => (
        <Box key={id} flexDirection="row" textWrap="truncate-start">
          <Text><Color gray>yarn generate </Color></Text>
          <Text>{`${displayFile(result)}`}</Text>
        </Box>
      ))}
    </Box>
  )
}

List.propTypes = {
  glob: PropTypes.array.isRequired,
  label: PropTypes.string,
}

List.defaultProps = {
  label: 'List',
}

export default List
