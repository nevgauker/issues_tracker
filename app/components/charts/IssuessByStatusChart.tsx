'use client'

import { Status } from '@prisma/client'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useThemeContext } from '@radix-ui/themes'

type RevenueByProductChartProps = {
  data: {
    status: Status
    count: number
  }[]
}

export function IssuesByStatustChart({ data }: RevenueByProductChartProps) {
  const currentAccentColor = useThemeContext().accentColor

  return (
    <ResponsiveContainer width='100%' minHeight={300}>
      <PieChart>
        <Tooltip formatter={(status, _) => status} />
        <Pie
          label={item => item.status}
          data={data}
          dataKey='count'
          type='monotone'
          nameKey='status'
          fill={currentAccentColor}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
