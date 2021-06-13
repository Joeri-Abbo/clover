import React, {ReactElement} from 'react'
import {Box} from 'ink'

import Banner from './Banner'
import Loading from './Loading'

interface Props {
  isLoading: boolean
  loadingMessage: string
  children: any
}

const App = ({
  isLoading,
  loadingMessage = 'loading',
  children,
}: Props): ReactElement => (
  <Box flexDirection="column" justifyContent="flex-start">
    <Banner />

    {isLoading && (
      <Loading
        spinnerColor="green"
        message={loadingMessage ?? 'Loading'}
      />
    )}

    {children}
  </Box>
)

export {App}
