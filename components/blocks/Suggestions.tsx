import React, { FC, useState, useEffect } from 'react'

import FadeUpCard from '../FadeUpCard'
import { getTotalizer } from '../../utils'

const Suggestions: FC<Props> = ({ totalizers }) => {
  const [suggestions, setSuggestions] = useState<FieldText[]>([])
  const [hasTwoLevels, setHasTwoLevels] = useState<boolean>(false)
  useEffect(() => {
    const texts = totalizers.degreeSuggestion!
    setHasTwoLevels(!!(texts.length > 3))
    setSuggestions(texts)
  }, [])

  const firstLevel = suggestions.slice(0, 3)
  const secondLevel = hasTwoLevels && suggestions.slice(3, suggestions.length)

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
}

export default Suggestions
