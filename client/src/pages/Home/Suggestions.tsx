import React, { FC, useState, useEffect } from 'react'

import Container from '../../components/Container'
import FadeUpCard from '../../components/FadeUpCard'

const Suggestions: FC<Props> = ({ totalizers }) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [hasTwoLevels, setHasTwoLevels] = useState<boolean>(false)
  useEffect(() => {
    let degreeSuggestions = [...totalizers.get('degreeSuggestion').keys()]
    console.log(degreeSuggestions)
    if (degreeSuggestions?.length > 6) {
      degreeSuggestions = degreeSuggestions.slice(0, 6)
    }
    setHasTwoLevels(!!(degreeSuggestions?.length > 3))
    setSuggestions(degreeSuggestions)
  }, [])

  return (
    suggestions && (
      <Container title="Suggestões de Cursos">
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
      </Container>
    )
  )
}
interface Props {
  totalizers: Map<string, any>
}

export default Suggestions
