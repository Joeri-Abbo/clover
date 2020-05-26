/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import {join, dirname} from 'path'
import React, {useState, useContext, useEffect} from 'react'
import {Box, Color, Text} from 'ink'
import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/** application */
import {store} from './../../store'
import tasks from './tasks'

/**
 * Runner
 *
 * @param {object}   data
 * @param {object}   sprout
 * @param {string}   templateDir
 * @param {string}   writeDir
 */
const Runner = ({sprout, data, budfile, writeDir, ready}) => {
  const {state, dispatch} = useContext(store)
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [complete, setComplete] = useState(false)
  useEffect(() => {
    ready &&
      new Observable(observer =>
        from(sprout.actions)
          .pipe(
            concatMap(task => {
              return new Observable(async observer => {
                return tasks[task.action]({
                  task,
                  sprout,
                  data,
                  budfile,
                  observer,
                  templateDir: join(dirname(budfile), 'templates'),
                  writeDir,
                })
              })
            }),
          )
          .subscribe({
            next: next => observer.next(next),
            error: error => observer.error(error),
            complete: () => observer.complete(),
          }),
      ).subscribe({
        next: next => setStatus(next.status),
        error: error => setError(error),
        complete: () => setComplete(true),
      })
  }, [state, sprout])

  useEffect(() => {
    complete &&
      (() => {
        dispatch({
          type: 'SET',
          key: 'status',
          value: 'complete',
        })
      })()
  }, [complete])

  return !complete ? (
    <Box flexDirection="column">
      {status && (
        <Box flexDirection="column">
          <Text>
            <Color green>{status}</Color>
          </Text>
        </Box>
      )}

      {error && (
        <Box flexDirection="column">
          <Text>
            <Color red>{typeof error !== 'string' ? JSON.stringify(error) : error}</Color>
          </Text>
        </Box>
      )}
    </Box>
  ) : (
    []
  )
}

export default Runner
