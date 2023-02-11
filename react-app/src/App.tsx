import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import Main from 'navigation/Main'

import queryClient from 'network/queryClient'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const App: React.FunctionComponent = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </QueryClientProvider>
)
export default App
