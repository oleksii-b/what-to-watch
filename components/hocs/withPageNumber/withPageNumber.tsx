import {FC, useState, ComponentProps} from 'react'

interface IProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  clearCurrentPage: () => void
}

const withPageNumber = function (Component): typeof Component {
  const initialPage = 1

  const WithPageNumber: FC<ComponentProps<typeof Component>> = function (props) {
    const [currentPage, setCurrentPage] = useState(initialPage)

    const clearCurrentPage = function () {
      setCurrentPage(initialPage)
    }

    const newProps = {
      ...props,
      currentPage,
      setCurrentPage,
      clearCurrentPage,
    }

    return <Component {...newProps} />
  }

  WithPageNumber.displayName =
    `WithPageNumber(${Component.displayName || Component.name || `Component`})`

  return WithPageNumber
}

export default withPageNumber
export type Props = IProps
