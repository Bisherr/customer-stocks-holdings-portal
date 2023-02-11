import React, { type FunctionComponent } from 'react'
import moment from 'moment'
import { Line } from 'react-chartjs-2'

import { useQuery } from 'react-query'
import client from 'network/client'
import { fetchPivotDataApi } from 'network/apis'

interface PivotData {
  id: number
  etiquettesDeLignes: string
  sommeDe: string
}

const Graph: FunctionComponent = () => {
  const { data } = useQuery(
    'pivot-chart-data',
    async () => await client().get(fetchPivotDataApi)
  )

  const { data: pivotData = [] } = data ?? {}

  const labels = pivotData
    .map((item: PivotData) =>
      moment.utc(item.etiquettesDeLignes).format('yyyy-MM-DD')
    )
    .filter(
      (item: string, index: number, array: string[]) =>
        array.indexOf(item) === index
    )

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: pivotData.map((item: PivotData) => item.sommeDe),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }

  return <Line data={chartData} />
}

export default Graph
