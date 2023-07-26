import { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}
const Modal: FC<IProps> = ({ children }) => {
  return (
    <section className='modal'>
      <div className='background'>{children}</div>
    </section>
  )
}

export default Modal
