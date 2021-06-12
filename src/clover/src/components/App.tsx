import React, {ReactChildren, ReactElement} from 'react'
import {Box} from 'ink'

import Banner from './Banner'
import Loading from './Loading'

interface Props {
  isLoading: boolean
  loadingMessage: string
  children: ReactChildren
}

const App = ({
  isLoading,
  loadingMessage = 'loading',
  children,
}: Props): ReactElement => (
  <Box
    flexDirection="column"
    justifyContent="flex-start"
    paddingTop={1}
    paddingRight={1}
    paddingBottom={0}
    paddingLeft={1}>
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

export {App as default}
