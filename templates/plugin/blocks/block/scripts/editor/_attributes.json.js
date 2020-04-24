module.exports = data => `
{
  "attributes": {
    ${data.pluck('components.media') ? `
      "mediaId": {
        "type": "number"
      },
      "mediaUrl": {
        "type": "string",
        "source": "attribute",
        "selector": "img",
        "attribute": "src"
      },\
    ` : []}\
    ${data.pluck('components.text') ? `
      "text": {
        "type": "array",
        "source": "children",
        "selector": "h2"
      }
    ` : []}
  }
}
`
