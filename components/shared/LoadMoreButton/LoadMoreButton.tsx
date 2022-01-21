import {FC} from 'react'
import {Button} from 'antd'

interface IProps {
  isVisible: boolean
  onClick: () => void
}

const LoadMoreButton: FC<IProps> = function ({isVisible, onClick}) {
  if (!isVisible) {
    return null
  }

  return (
    <Button
      type="primary"
      size="large"
      onClick={onClick}
      block
    >
      Load More
    </Button>
  )
}

export default LoadMoreButton
