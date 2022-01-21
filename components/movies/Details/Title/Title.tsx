import {FC, ReactNode} from 'react'

interface IProps {
  children: ReactNode
  className: string
  releaseDate?: Date
}

const Title: FC<IProps> = function ({releaseDate, className, children}) {
  const year = !!releaseDate && new Date(releaseDate).getFullYear()

  return (
    <h1 className={className}>
      {children}
      {year && <span> ({year})</span>}
    </h1>
  )
}

export default Title
