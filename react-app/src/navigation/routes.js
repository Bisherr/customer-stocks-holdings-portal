import React from 'react'
import Dashboard from 'screens/dashboard/Dashboard'
import Pivot from 'screens/pivot/Pivot'
import Graph from 'screens/graph/Graph'

export default [
  {
    path: '/',
    name: 'Dashboard',
    element: <Dashboard />
  },
  {
    path: '/pivot',
    name: 'Pivot',
    element: <Pivot />
  },
  {
    path: '/graph',
    name: 'Graph',
    element: <Graph />
  }
]
