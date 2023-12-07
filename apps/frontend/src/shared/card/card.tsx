import { ReactNode } from 'react'
import "./style.scss"

interface ICard {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = "" }: ICard) {
  return (
    <div className={`card ${className}`}>{children}</div>
  )
}
