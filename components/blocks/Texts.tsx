import React, { FC, useState, useEffect } from 'react'

import FadeUpCard from '../FadeUpCard'

const Texts: FC<Props> = ({ totalizers, field }) => {
  const [texts, setTexts] = useState<FieldText[]>([])
  const [hasTwoLevels, setHasTwoLevels] = useState<boolean>(false)
  useEffect(() => {
    // @ts-ignore
    const txt = totalizers[field] as FieldText[]
    setHasTwoLevels(!!(txt.length > 3))
    setTexts(txt)
  }, [])

  const firstLevel = texts.slice(0, 3)
  const secondLevel = hasTwoLevels && texts.slice(3, texts.length)

  return (
    <div>
      <div className={`flex ${hasTwoLevels ? 'h-50' : 'h-100'}`}>
        {firstLevel.map(({ value }, i) => (
          <div
            className={`w-${Math.floor(
              100 / firstLevel.length
            ).toString()} ma5`}
            key={i}>
            <FadeUpCard text={value} />
          </div>
        ))}
      </div>
      {secondLevel && (
        <div className="h-50 flex">
          {secondLevel.map(({ value }, i) => (
            <div
              className={`w-${Math.floor(
                100 / secondLevel.length
              ).toString()} ma5`}
              key={i}>
              <FadeUpCard text={value} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
interface Props {
  totalizers: Totalizers
  field: string
}

export default Texts
