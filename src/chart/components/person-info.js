const { wrapText } = require('../../utils')

module.exports = function personInfo({ svg, config, x = 5, y = 5 }) {
  const {
    showInfo,
    nodeWidth,
    nodePaddingX,
    nodePaddingY,
    nodeBorderRadius,
    PERSON_INFO_CLASS,
    PERSON_INFO_TEXT_CLASS
  } = config

  const infoPos = {
    x: nodePaddingX,
    y: i => 80 + i * nodePaddingY / 2 + i * 60
  }

  const infoNodes = svg
    .selectAll('g.' + PERSON_INFO_CLASS)
    .data(d => {
      if (!(d && d.person && d.person.info && showInfo)) {
        return []
      }

      return d.person.info.filter((_, i) => i < 3) || []
    })
    .enter()
    .insert('g')
    .attr('class', PERSON_INFO_CLASS)
    .attr('transform', (d, i) => `translate(${infoPos.x},${infoPos.y(i)})`)

  const infoWidth = nodeWidth - 2 * nodePaddingX
  const infoHeight = 60

  infoNodes
    .append('rect')
    .attr('width', infoWidth)
    .attr('height', infoHeight)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)
    .attr('fill', d => d.background)

  infoNodes
    .append('text')
    .attr('class', PERSON_INFO_TEXT_CLASS + ' unedited')
    .style('font-size', 14)
    .attr(
      'transform',
      (d, i) => `translate(${nodePaddingX / 2},${nodePaddingY * 1.2})`
    )
    .text(d => d.text)

  infoNodes
    .append('rect')
    .attr('width', 8)
    .attr('height', 8)
    .attr('rx', 8)
    .attr('ry', 8)
    .attr('fill', d => d.color)
    .attr(
      'transform',
      (d, i) =>
        `translate(${infoWidth - nodePaddingX * 1.2},${infoHeight / 2 - 4})`
    )
}
