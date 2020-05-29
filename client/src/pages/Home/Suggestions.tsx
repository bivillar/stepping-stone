import React, { FC, useState, useEffect } from 'react'

import Container from '../../components/Container'
import FadeUpCard from '../../components/FadeUpCard'

const Suggestions: FC<Props> = ({ totalizers }) => {
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    let degreeSuggestions = [...totalizers.get('degreeSuggestion').keys()]
    if (degreeSuggestions?.length > 6) {
      degreeSuggestions = degreeSuggestions.slice(0, 6)
    } else if (degreeSuggestions?.length > 3) {
      degreeSuggestions = degreeSuggestions.slice(0, 3)
    }

    setSuggestions(degreeSuggestions)
  }, [])

  return suggestions ? (
    <Container title="Suggestões de Cursos">
      <div>
        <div className={`${suggestions.length > 3 ? 'h-50' : 'h-100'}flex`}>
          {suggestions.slice(0, 3).map(suggestion => (
            <div className="w-33 ma5">
              <FadeUpCard text={suggestion} />
            </div>
          ))}
        </div>
        {suggestions.length > 3 && (
          <div className="h-50 flex">
            {suggestions.slice(3, suggestions.length).map(suggestion => (
              <div className="w-33 ma5">
                <FadeUpCard text={suggestion} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  ) : null
}
interface Props {
  totalizers: Map<string, any>
}

export default Suggestions
