import React, { FC, useState, useEffect } from 'react'

import FadeUpCard from '../FadeUpCard'
import { getTotalizerKeys } from '../../utils'

const Suggestions: FC<Props> = ({ totalizers }) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [hasTwoLevels, setHasTwoLevels] = useState<boolean>(false)
  useEffect(() => {
    let degreeSuggestions = getTotalizerKeys(totalizers, 'degreeSuggestion')
    if (degreeSuggestions?.length > 6) {
      degreeSuggestions = degreeSuggestions.slice(0, 6)
    }
    setHasTwoLevels(!!(degreeSuggestions?.length > 3))
    setSuggestions(degreeSuggestions)
  }, [])

  return (
    <div>
      <div className={`flex ${hasTwoLevels ? 'h-50' : 'h-100'}`}>
        {suggestions.slice(0, 3).map((suggestion, i) => (
          <div className="w-33 ma5" key={i}>
            <FadeUpCard text={suggestion} />
          </div>
        ))}
      </div>
      {hasTwoLevels && (
        <div className="h-50 flex">
          {suggestions.slice(3, suggestions.length).map((suggestion, i) => (
            <div className="w-33 ma5" key={i}>
              <FadeUpCard text={suggestion} />
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
