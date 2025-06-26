"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC, ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

const queryClient = new QueryClient()

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
        <QueryClientProvider client={queryClient}>

     {children}
        </QueryClientProvider>
    </>
  )
}

export default layout;