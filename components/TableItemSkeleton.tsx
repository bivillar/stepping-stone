import React, { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import { range } from '../utils'

const TableItemSkeleton: FC<{ nCol: number; nRow?: number }> = ({
  nCol,
  nRow = 3,
}) => (
  <>
    {range(nRow).map((i) => (
      <tr key={i}>
        {range(nCol).map((j) => (
          <td key={j}>
            <Skeleton />
          </td>
        ))}
      </tr>
    ))}
  </>
)

export default TableItemSkeleton
