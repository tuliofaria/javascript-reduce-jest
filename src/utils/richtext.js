const removeParagraphFromEmbed = (richText) => {
  const embedTypes = ['embedded-entry-inline']
  if (richText.content.length === 0) {
    return richText
  }
  const content = richText.content.reduce((prev, curr) => {
    if (curr.nodeType === 'paragraph') {
      const itNeedsToProcess = curr.content.reduce((p, c) => {
        return p || embedTypes.indexOf(c.nodeType) >= 0
      }, false)
      if (itNeedsToProcess) {
        return [...prev, ...curr.content]
      }
    }
    return [...prev, curr] // equivale ao map
  }, [])
  return {
    ...richText,
    content
  }
}

module.exports = { removeParagraphFromEmbed }
