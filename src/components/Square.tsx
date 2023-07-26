import { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
  index?: number
  className?: string
  updateBoard?: (index: number) => void
}
const Square: FC<IProps> = ({ children, updateBoard, index, className }) => {
  const handleClick = () => {
    if (index == null || !updateBoard) return

    updateBoard(index)
  }
  return (
    <div className={`square ${className}`} onClick={handleClick}>
      {children}
    </div>
  )
}

export default Square
