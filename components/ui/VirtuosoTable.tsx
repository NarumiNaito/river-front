import React from 'react'
import { TableVirtuoso, TableComponents } from 'react-virtuoso'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

export interface ColumnData<T> {
  dataKey: keyof T
  label: string
  numeric?: boolean
  width?: number
}

export interface VirtuosoTableProps<T> {
  data: T[]
  columns: ColumnData<T>[]
  height?: number
}

export default function VirtuosoTable<T extends Record<string, unknown>>({
  columns,
  data,
  height = 400,
}: VirtuosoTableProps<T>) {
  const VirtuosoTableComponents: TableComponents<T> = {
    Scroller: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      function Scroller(props, ref) {
        return <TableContainer component={Paper} {...props} ref={ref} />
      }
    ),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef<
      HTMLTableSectionElement,
      React.HTMLAttributes<HTMLTableSectionElement>
    >(function TableHeadRef(props, ref) {
      return <TableHead {...props} ref={ref} />
    }),
    TableBody: React.forwardRef<
      HTMLTableSectionElement,
      React.HTMLAttributes<HTMLTableSectionElement>
    >(function TableBodyRef(props, ref) {
      return <TableBody {...props} ref={ref} />
    }),
  }

  return (
    <Paper style={{ height, width: '100%' }}>
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={() => (
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.dataKey)}
                variant='head'
                style={{ width: column.width }}
                sx={{ backgroundColor: 'background.paper' }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        )}
        itemContent={(_index, row) =>
          columns.map((column) => (
            <TableCell key={String(column.dataKey)}>
              {row[column.dataKey] != null ? String(row[column.dataKey]) : ''}
            </TableCell>
          ))
        }
      />
    </Paper>
  )
}
