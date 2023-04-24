import { AppBar, Toolbar, Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import React, { useEffect } from 'react'
import { TodoLists } from './todos/components/TodoLists'
import getCode from './utils/getCode'
import { createCode } from './utils/createCode'

const queryClient = new QueryClient()

const MainAppBar = () => {
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography variant='h6' color='inherit'>
          Things to do
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const MainWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-col'>
        <MainAppBar />
        <div className='flex justify-center'>
          <div className='flex flex-col max-w-7xl flex-grow-[1]'>{children}</div>
        </div>
      </div>
    </QueryClientProvider>
  )
}

const App = () => {
  const [code, setCode] = React.useState('')

  useEffect(() => {
    let code = getCode()
    if (!code) {
      code = createCode()
    }
    window.history.pushState({}, '', `?code=${code}`)
    setCode(code)
  }, [])

  return (
    <MainWrapper>
      {code ? <TodoLists code={code} /> : <div>loading...</div>}
      
    </MainWrapper>
  )
}

export default App
