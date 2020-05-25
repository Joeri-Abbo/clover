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
 */
const Runner = ({sprout, data, module, writeDir}) => {
  const {state} = useContext(store)

  const [templateDir, setTemplateDir] = useState(null)
  useEffect(() => {
    module && setTemplateDir(
      join(dirname(module), 'templates')
    )
  }, [module])

  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [complete, setComplete] = useState(false)
  useEffect(() => {
    state && state.ready &&
    sprout && sprout.actions &&
    data && new Observable(observer =>
      from(sprout.actions)
        .pipe(
          concatMap(task => {
            return new Observable(async observer => {
              try {
                return tasks[task.action]({
                  task,
                  sprout,
                  data,
                  observer,
                  templateDir,
                  writeDir,
                })
              } catch (error) {
                observer.error(`${task.action} handler error: ${error}`)
              }
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

  return ! complete ? (
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
    <Box>
      <Text>
        <Color green>All done.</Color>
      </Text>
    </Box>
  )
}

export default Runner
