const { removeParagraphFromEmbed } = require('./richtext')

const complexRichText = {
  content: [
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          content: [],
          value: 'test'
        }
      ]
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'paragraph',
          content: [],
          value: '1'
        },
        {
          nodeType: 'embedded-entry-inline',
          content: [],
          value: '',
          data: {
            a: 1
          }
        },
        {
          nodeType: 'paragraph',
          content: [],
          value: '2'
        }
      ]
    }
  ]
}

describe('richtext tools', () => {
  it('renders empty content', () => {
    const emptyRichText = {
      content: []
    }
    const newRichtText = removeParagraphFromEmbed(emptyRichText)
    expect(newRichtText.content.length).toBe(0)
  })
  it('flats when embed inside a paragraph', () => {
    const newRichtText = removeParagraphFromEmbed(complexRichText)
    expect(newRichtText.content.length).toBe(4)
    expect(newRichtText.content[0].nodeType).toBe('paragraph')
    expect(newRichtText.content[1].nodeType).toBe('paragraph')
    expect(newRichtText.content[2].nodeType).toBe('embedded-entry-inline')
    expect(newRichtText.content[3].nodeType).toBe('paragraph')
    expect(newRichtText.content[0]).toBe(complexRichText.content[0])
    expect(newRichtText.content[1]).toBe(complexRichText.content[1].content[0])
    expect(newRichtText.content[2]).toBe(complexRichText.content[1].content[1])
    expect(newRichtText.content[3]).toBe(complexRichText.content[1].content[2])
  })
})
