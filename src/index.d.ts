import * as React from 'react'
import { ReactNode } from 'react'

export type Props = {
  delay?: number | null | undefined
  render?: () => ReactNode | null | undefined
  children?: () => ReactNode | null | undefined
}

export default class Interval extends React.Component<Props> {}
