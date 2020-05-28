import React, { FC, useState, useEffect } from 'react'

import Container from '../../components/Container'
import FadeUpCard from '../../components/FadeUpCard'

const Suggestions: FC<Props> = ({ formEntries }) => {
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    const newSuggestions = formEntries.reduce((total, { degreeSuggestion }) => {
      if (degreeSuggestion) total.push(degreeSuggestion)
      return total
    }, [] as string[])

    setSuggestions(
      newSuggestions.length > 6 ? newSuggestions.slice(0, 6) : newSuggestions
    )
  }, [])

  return suggestions ? (
    <Container title="Suggestões de Cursos">
      <div>
        <div className="h-50 flex">
          {suggestions.slice(0, 3).map(suggestion => (
            <div className="w-33 ma5">
              <FadeUpCard text={suggestion} />
            </div>
          ))}
        </div>
        <div className="h-50 flex">
          {suggestions.slice(3, 6).map(suggestion => (
            <div className="w-33 ma5">
              <FadeUpCard text={suggestion} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  ) : null
}
interface Props {
  formEntries: (NotInFieldFormEntry | InFieldFormEntry)[]
}

export default Suggestions
