/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import {join, dirname} from 'path'
import React, {useState, useContext, useEffect} from 'react'
import {Box, Color, Text} from 'ink'
import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/** application */
import {store} from './../../store'

/** tasks */
import addDependencies from './tasks/addDependencies'
import install from './tasks/install'
import json from './tasks/json'
import scaffold from './tasks/scaffold'
import template from './tasks/template'

/**
 * Runner
 *
 * @param {object}   data
 * @param {object}   sprout
 * @param {string}   templateDir
 */
const Runner = ({sprout, data, module}) => {
  const {state} = useContext(store)

  const [templateDir, setTemplateDir] = useState(null)
  useEffect(() => {
    module && setTemplateDir(
      join(dirname(module), 'templates')
    )
  }, [module])

  /**
   * Set writeDir
   */
  const [writeDir, setWriteDir] = useState(state?.writeDir)
  useEffect(() => {
    state?.writeDir && setWriteDir(state.writeDir)
  }, [state])

  const jobs = {
    addDependencies,
    install,
    json,
    scaffold,
    template,
  }

  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [complete, setComplete] = useState('')

  useEffect(() => {
    state && state.ready && sprout && sprout.actions && data && (
      new Observable(observer =>
        from(sprout.actions)
        .pipe(
          concatMap(task => {
            return new Observable(async observer => {
              try {
                return jobs[task.action]({
                  task,
                  sprout,
                  data,
                  observer,
                  templateDir,
                  writeDir,
                })
              } catch (error) {
                observer.error(
                  `${task.action} handler error`
                )
              }
            })
          })
        )
        .subscribe({
          next: next => observer.next(next),
          error: error => observer.error(error),
          complete: () => observer.complete(),
        })
      )
      .subscribe({
        next: next => setStatus(next.status),
        error: error => setError(error),
        complete: () => setComplete(true),
      })
    )
  }, [state, sprout])

  /**
   * Render
   */
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
            <Color red>{
              typeof error !== 'string'
                ? JSON.stringify(error)
                : error
            }</Color>
          </Text>
        </Box>
      )}
    </Box>
  ) : (
    <Box>
      <Text><Color green>All done.</Color></Text>
    </Box>
  )
}

export default Runner
