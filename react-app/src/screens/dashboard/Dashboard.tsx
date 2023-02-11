import React, { type FunctionComponent } from 'react'
import { useQuery } from 'react-query'
import { DataGrid, type GridColDef, GridToolbar } from '@mui/x-data-grid'

import client from 'network/client'
import { fetchRawDataApi } from 'network/apis'

const Dashboard: FunctionComponent = () => {
  const { data } = useQuery(
    'fetch-data',
    async () => await client().get(fetchRawDataApi)
  )

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      flex: 1,
      field: 'date',
      headerName: 'DATE',
      type: 'date'
    },
    {
      flex: 1,
      field: 'portfolio',
      headerName: 'PORTFOLIO',
      type: 'number'
    },
    {
      flex: 1,
      field: 'stockName',
      headerName: 'STOCK NAME',
      type: 'string'
    },
    {
      flex: 1,
      field: 'price',
      headerName: 'PRICE',
      type: 'number'
    },
    {
      flex: 1,
      field: 'quantity',
      headerName: 'QUANTITY',
      type: 'number'
    },
    {
      flex: 1,
      field: 'amount',
      headerName: '$',
      type: 'number'
    }
  ]

  return (
    <DataGrid
      components={{ Toolbar: GridToolbar }}
      columns={columns}
      rows={data?.data ?? []}
      autoHeight
    />
  )
}

export default Dashboard
