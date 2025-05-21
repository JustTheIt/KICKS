// Updated DisplayTable.jsx
import React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const DisplayTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-neutral-cream-dark">
      <table className='w-full border-collapse'>
        <thead className='bg-primary-sage text-white'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='border-b border-primary-sage-dark'>
              <th className='px-4 py-3 text-left font-medium'>Sr.No</th>
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id} 
                  className='px-4 py-3 text-left font-medium whitespace-nowrap'
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr 
              key={row.id} 
              className='border-b border-neutral-cream-dark hover:bg-neutral-cream transition-colors'
            >
              <td className='px-4 py-3'>{index + 1}</td>
              {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id} 
                  className='px-4 py-3 whitespace-nowrap'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DisplayTable