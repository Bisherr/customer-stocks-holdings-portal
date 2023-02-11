import React, { type FunctionComponent, useState } from 'react'
import PivotTableUI from 'react-pivottable/PivotTableUI'
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers'
import TableRenderers from 'react-pivottable/TableRenderers'
import Plot from 'react-plotly.js'

import { useQuery } from 'react-query'
import client from 'network/client'
import { fetchPivotDataApi } from 'network/apis'

import './Pivot.css'

const Pivot: FunctionComponent = () => {
  const [pivotChange, setPivotChange] = useState({})

  const PlotlyRenderers = createPlotlyRenderers(Plot)

  const { data } = useQuery(
    'pivot-data',
    async () => await client().get(fetchPivotDataApi)
  )

  console.log(pivotChange)

  return (
    <PivotTableUI
      data={data?.data ?? []}
      onChange={(s) => {
        setPivotChange(s)
      }}
      renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
      {...pivotChange}
    />
  )
}

export default Pivot
