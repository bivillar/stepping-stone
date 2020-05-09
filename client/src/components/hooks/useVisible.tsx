import React, { useEffect, useState } from 'react'

function useVisible(options: IntersectionObserverInit = { rootMargin: '0px' }) {
  const [isVisible, setVisible] = useState(false)
  const [ref, setRef] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    }, options)

    if (ref) {
      observer.observe(ref!)
    }
    return () => {
      if (ref) observer.unobserve(ref!)
    }
  }, [ref, options])

  return [isVisible, setRef]
}

export default useVisible
