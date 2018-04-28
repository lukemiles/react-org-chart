const { wrapText } = require('../../utils')

module.exports = function personInfo({ svg, config, x = 5, y = 5 }) {
  const {
    showInfo,
    onEmptyInfoClick,
    nodeWidth,
    nodePaddingX,
    nodePaddingY,
    infoHeight,
    nodeBorderRadius,
    infoEmptyImage,
    PERSON_INFO_CLASS,
    PERSON_INFO_CLASS_EMPTY,
    PERSON_INFO_TEXT_CLASS,
    PERSON_INFO_EMPTY_PLACEHOLDER,
  } = config

  const infoPos = {
    x: nodePaddingX,
    y: (i) => 80 + (i * nodePaddingY / 2) + i * infoHeight
  }

  const infoNodes = svg
    .selectAll('g.' + PERSON_INFO_CLASS)
    .data(d => {
      let infos = []
      if (d && d.person && d.person.info && showInfo) {
        infos = d.person.info.filter((_, i) => i < 3).map((inf) => {
          inf.person = d.person
          return inf
        }) || [];
      }

      if (showInfo && d.person.totalInfos === 0) {
        return [{ person: d.person}]
      }
      return infos;
    })
    .enter()
    .insert('g')
    .attr('class', PERSON_INFO_CLASS)
    .attr('transform', (d, i) => `translate(${infoPos.x},${infoPos.y(i)})`)

  const infoWidth = nodeWidth - 2 * nodePaddingX

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

  infoNodes
    .filter(function (d) { return d && d.person && d.person.totalInfos === 0 })
    .append('rect')
    .attr('class', PERSON_INFO_CLASS_EMPTY)
    .attr('width', infoWidth)
    .attr('height', infoHeight * 3)
    .attr('fill', 'white')
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)

  infoNodes
    .filter(function (d) { return d && d.person && d.person.totalInfos === 0 })
    .append('image')
    .style('cursor', 'pointer')
    .attr('href', infoEmptyImage)
    .attr('alt', PERSON_INFO_EMPTY_PLACEHOLDER)
    .attr('width', infoWidth)
    .attr('height', infoHeight * 3)
      .on('click', datum => {
      d3.event.stopPropagation()
      // TODO: fire link click handler
      if (onEmptyInfoClick) {
        onEmptyInfoClick(datum, d3.event)
      }
    })
}
