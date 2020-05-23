import React, { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

const TableItemSkeleton: FC = () => (
  <tr>
    <td className="w-40">
      <Skeleton />
    </td>
    <td>
      <Skeleton />
    </td>
    <td>
      <Skeleton />
    </td>
  </tr>
)

export default TableItemSkeleton
