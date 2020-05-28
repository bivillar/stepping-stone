import React, { FC } from 'react'
import { fadeInUp } from 'react-animations'
import styled, { keyframes } from 'styled-components'
import { Card } from 'react-bootstrap'

const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeInUp}`};
`
const FadeUpCard: FC<Props> = ({ text }) => (
  <FadeIn>
    <Card>
      <div style={{ color: 'black' }} className="pa4">
        "{text}"
      </div>
    </Card>
  </FadeIn>
)

interface Props {
  text: string
}

export default FadeUpCard
