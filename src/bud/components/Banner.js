import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Box, Text, Color} from 'ink'
import Link from 'ink-link'
import Spinner from 'ink-spinner'
import {store} from './../store'
import useStdoutDimensions from 'ink-use-stdout-dimensions'

const colors = {
  success: '#96EF85',
  error: '#BE425E',
}

/**
 * Banner
 *
 * @prop {string} label
 */
const Banner = ({label}) => {
  const {state} = useContext(store)
  const [width] = useStdoutDimensions()
  const [spinner, setSpinner] = useState(true)
  const [status, setStatus] = useState(false)
  const [statusColor, setStatusColor] = useState('#ffffff')
  useEffect(() => {
    if(state?.status && state.status == 'complete') {
      setStatus('🎉')
      setStatusColor(colors.success)
      setSpinner(false)
    }
    if(state?.status && state.status == 'error') {
      setStatus('💢')
      setStatusColor(colors.error)
      setSpinner(false)
    }
  }, [state])

  return state ? (
    <Box flexDirection="row" justifyContent="space-between" marginTop={1} width={width - (width/20)}>
      <Box flexDirection="row" justifyContent="space-between">
        <Box width={1} marginRight={2}>
          {spinner ? <Spinner /> : <Text>{status}</Text>}
        </Box>

        <Box>
          <Text>
            <Color hex={statusColor}>
              {label}
            </Color>
          </Text>
        </Box>
      </Box>

      <Box flexDirection="row">
        <Text>{`🌱`}</Text>
        <Box>
          <Text bold>
            <Link url="https://roots.io/bud">
              <Color green>{'Bud'}</Color>
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box><Spinner /> Loading</Box>
  )
}

Banner.propTypes = {
  label: PropTypes.string,
}

export default Banner
