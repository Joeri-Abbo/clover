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
const Search = ({glob, label}) => {
  const {dispatch} = useContext(store)

  /**
   * Return an observable emitting
   * search criterion matches.
   */
  const [search] = useState(
    new Observable (async observer => {
      observer.next({status: 'Searching'})

      const results = await globby(glob)

      observer.next({
        results: results ? results[0] : null,
      })

      observer.complete()
    })
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
    dispatch({
      type: 'SEARCH_RESULTS',
      label,
      results,
      complete,
      status,
    })
  }, [results, status, complete])

  /** Format matched files for display */
  const displayFile = file =>
    file.replace(process.cwd() + '/', '')

  /**
   * Render
   */
  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Box width="15">
          <Text>
            <Color blue>
              {label}
            </Color>
          </Text>
        </Box>

        <Box width={15} paddingLeft={2}>
          {complete ? (
            <Text>
              <Color green>
                complete
              </Color>
            </Text>
          ) : (
            <Text>
              <Color gray>
                {status}
              </Color>
            </Text>
          )}
        </Box>

        {results && (
          <Box
            flexDirection="column"
            width={45}
            marginBottom={1}
            textWrap="truncate-start">
            <Text underline>
              {displayFile(results)}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}

Search.propTypes = {
  glob: PropTypes.array.isRequired,
  label: PropTypes.string,
}

Search.defaultProps = {
  label: 'Search',
}

export default Search
