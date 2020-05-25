import React, {createContext, useReducer} from 'react'

const cwd = process.cwd()

/** app config */
let budConfig
try {
  budConfig = require(`${process.cwd()}/.bud/bud.config.json`)
} catch {
  budConfig = {}
}

/**
 * Bud application context
 */
export const store = createContext({
  cwd,
  writeDir: cwd,
  projectConfig: {
    ...budConfig,
  },
  label: 'Bud: a modern WordPress scaffolding utility',
  prompts: null,
  data: null,
  status: null,
  error: null,
  complete: false,
  ready: false,
  search: {
    core: {
      results: null,
      status: null,
      complete: false,
    },
    plugins: {
      results: null,
      status: null,
      complete: false,
    },
    project: {
      results: null,
      status: null,
      complete: false,
    },
  },
})

const {Provider} = store

/**
 * State provider
 */
export const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET': {
        const {key, value} = action
        return {
          ...state,
          [key]: value,
        }
      }
    }
    switch (action.type) {
      case 'SET_LABEL': {
        const {label} = action
        return {
          ...state,
          label,
        }
      }
      case 'SET_PROMPTS': {
        const {prompts} = action
        return {
          ...state,
          prompts,
        }
      }
      case 'SET_DATA': {
        const {data} = action
        return {
          ...state,
          data: {
            ...state.data,
            ...data,
          },
        }
      }
      case 'SET_READY': {
        const {ready} = action
        return {
          ...state,
          ready,
        }
      }
      case 'SET_STATUS': {
        const {status} = action
        return {
          ...state,
          status,
        }
      }
      case 'SET_ERROR': {
        const {error} = action
        return {
          ...state,
          error,
        }
      }
      case 'SET_COMPLETE': {
        const {complete} = action
        return {
          ...state,
          complete,
        }
      }
      case 'SEARCH_RESULTS': {
        const {results, status, complete} = action
        return {
          ...state,
          search: {
            ...state.search,
            [`${action.label}`]: {
              results,
              status,
              complete,
            },
          },
        }
      }
    }
  }, store)

  return (
    <Provider value={{state, dispatch}}>
      {children}
    </Provider>
  )
}
