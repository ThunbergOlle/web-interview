import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { TodoLists } from './todos/components/TodoLists'

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
    <div className='flex flex-col'>
      <MainAppBar />
      <div className='flex justify-center'>
        <div className='flex flex-col max-w-7xl flex-grow-[1]'>{children}</div>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <MainWrapper>
      <TodoLists />
    </MainWrapper>
  )
}

export default App
