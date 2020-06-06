import React, { FC, ReactElement } from 'react'

const Menu: FC<Props> = ({ position, pages }) => {
  const goToPosition = (pos: number) =>
    window.scrollTo({
      top: pos * window.innerHeight,
      behavior: 'smooth',
    })

  return (
    <ul className="guide h-100 flex items-end flex-column justify-center">
      {pages.map(({ title }, i) => {
        const current = i == position
        return (
          <li
            key={title}
            className={`page ${current ? 'current' : ''} tr pointer`}
            onClick={() => goToPosition(i)}>
            <span className={`text${current ? '--current' : ''}`}>{title}</span>
          </li>
        )
      })}
    </ul>
  )
}

interface Props {
  position: number
  pages: { component: FC<any>; title: string }[]
}

export default Menu
