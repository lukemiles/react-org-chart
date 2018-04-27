const { wrapText, helpers } = require('../utils')
const renderLines = require('./render-lines')
const onClick = require('./on-click')
const iconLink = require('./components/icon-link')
const personInfo = require('./components/person-info')

function render(config) {
  const {
    svgroot,
    svg,
    tree,
    animationDuration,
    nodeWidth,
    nodeHeight,
    nodePaddingX,
    nodePaddingY,
    nodeBorderRadius,
    backgroundColor,
    nameColor,
    titleColor,
    reportsColor,
    borderColor,
    avatarWidth,
    lineDepthY,
    treeData,
    sourceNode,
    showInfo,
    onPersonLinkClick,
    onExpandInfoClick,
    PERSON_NODE_CLASS,
    PERSON_INFO_CLASS,
    PERSON_INFO_COUNT_CLASS,
    PERSON_INFO_TEXT_CLASS,
    PERSON_LINK_CLASS,
    PERSON_NAME_CLASS,
    PERSON_TITLE_CLASS,
    PERSON_DEPARTMENT_CLASS,
    PERSON_REPORTS_CLASS
  } = config

  // Compute the new tree layout.
  const nodes = tree.nodes(treeData).reverse()
  const links = tree.links(nodes)

  config.links = links
  config.nodes = nodes

  // Normalize for fixed-depth.
  nodes.forEach(function(d) {
    d.y = d.depth * lineDepthY
  })

  // Update the nodes
  const node = svg
    .selectAll('g.' + PERSON_NODE_CLASS)
    .data(nodes.filter(d => d.id), d => d.id)
  const parentNode = sourceNode || treeData

  // Enter any new nodes at the parent's previous position.
  const nodeEnter = node
    .enter()
    .insert('g')
    .attr('class', PERSON_NODE_CLASS)
    .attr('transform', `translate(${parentNode.x0}, ${parentNode.y0})`)
    .on('click', onClick(config))

  // Person Card Shadow
  nodeEnter
    .append('rect')
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)
    .attr('fill-opacity', 0.05)
    .attr('stroke-opacity', 0.025)
    .attr('filter', 'url(#boxShadow)')

  // Person Card Container
  nodeEnter
    .append('rect')
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('id', d => d.id)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)
    .style('cursor', helpers.getCursorForNode)
    .attr('class', 'box')

  const namePos = {
    x: nodePaddingX * 1.4 + avatarWidth,
    y: nodePaddingY * 1.8
  }

  // Person's Name
  nodeEnter
    .append('text')
    .attr('class', PERSON_NAME_CLASS)
    .attr('x', namePos.x)
    .attr('y', namePos.y)
    .attr('dy', '.3em')
    .style('cursor', 'pointer')
    .style('fill', nameColor)
    .style('font-size', 16)
    .text(d => d.person.name)

  // Person's Title
  nodeEnter
    .append('text')
    .attr('class', PERSON_TITLE_CLASS + ' unedited')
    .attr('x', namePos.x)
    .attr('y', namePos.y + nodePaddingY * 1.2)
    .attr('dy', '0.1em')
    .style('font-size', 14)
    .style('cursor', 'pointer')
    .style('fill', titleColor)
    .text(d => d.person.title)

  const heightForTitle = 45 // getHeightForText(d.person.title)

  // Person's Reports
  nodeEnter
    .append('text')
    .attr('class', PERSON_REPORTS_CLASS)
    .attr('x', nodePaddingX)
    .attr('y', nodeHeight - nodePaddingY - 14)
    .attr('dy', '.9em')
    .style('font-size', 14)
    .style('font-weight', 500)
    .style('cursor', 'pointer')
    .style('fill', reportsColor)
    .text(helpers.getTextForReports)

  if (showInfo) {
    nodeEnter
      .append('text')
      .attr('class', PERSON_INFO_COUNT_CLASS)
      .attr('x', nodeWidth - 65)
      .attr('y', nodeHeight - nodePaddingY - 14)
      .attr('dy', '.9em')
      .style('text-align', 'right')
      .style('font-size', 14)
      .style('font-weight', 500)
      .style('cursor', 'pointer')
      .style('fill', reportsColor)
      .text(helpers.getTextForInfos)
      .on('click', datum => {
        d3.event.stopPropagation()
        // TODO: fire link click handler
        if (onExpandInfoClick) {
          onExpandInfoClick(datum, d3.event)
        }
      })
  }
  // Person's Avatar
  nodeEnter
    .append('image')
    .attr('width', avatarWidth)
    .attr('height', avatarWidth)
    .attr('x', nodePaddingX)
    .attr('y', nodePaddingY)
    .attr('stroke', borderColor)
    .attr('src', d => d.person.avatar)
    .attr('xlink:href', d => d.person.avatar)
    .attr('clip-path', 'url(#avatarClip)')

  // Person's Department
  nodeEnter
    .append('text')
    .attr('class', getDepartmentClass(PERSON_DEPARTMENT_CLASS))
    .attr('x', 34)
    .attr('y', avatarWidth + nodePaddingY * 1.2)
    .attr('dy', '.9em')
    .style('cursor', 'pointer')
    .style('fill', titleColor)
    .style('font-weight', 600)
    .style('font-size', 8)
    .attr('text-anchor', 'middle')
    .text(helpers.getTextForDepartment)

  // Person's Link
  const nodeLink = nodeEnter
    .append('a')
    .attr('class', PERSON_LINK_CLASS)
    .attr('target', 'noopener')
    .attr('xlink:href', d => d.person.link || 'https://lattice.com')
    .on('click', datum => {
      d3.event.stopPropagation()
      // TODO: fire link click handler
      if (onPersonLinkClick) {
        onPersonLinkClick(datum, d3.event)
      }
    })

  iconLink({
    svg: nodeLink,
    x: nodeWidth - 28,
    y: 20
  })

  personInfo({
    svg: nodeEnter,
    config
  })

  // Transition nodes to their new position.
  const nodeUpdate = node
    .transition()
    .duration(animationDuration)
    .attr('transform', d => `translate(${d.x},${d.y})`)

  nodeUpdate
    .select('rect.box')
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)

  // Transition exiting nodes to the parent's new position.
  const nodeExit = node
    .exit()
    .transition()
    .duration(animationDuration)
    .attr('transform', d => `translate(${parentNode.x},${parentNode.y})`)
    .remove()

  // Update the links
  const link = svg.selectAll('path.link').data(links, d => d.target.id)

  // Wrap the title texts
  const titleWrapWidth = 140

  svg
    .selectAll('text.unedited.' + PERSON_TITLE_CLASS)
    .call(wrapText, titleWrapWidth)

  // Wrap the title texts
  const infoWidth = nodeWidth - 2 * nodePaddingX
  const infoWrapWidth = infoWidth - nodePaddingX * 2

  svg
    .selectAll('text.unedited.' + PERSON_INFO_TEXT_CLASS)
    .call(wrapText, infoWrapWidth)

  // Render lines connecting nodes
  renderLines(config)

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x
    d.y0 = d.y
  })
}

function getDepartmentClass(baseClass) {
  return d => {
    const { person } = d
    const deptClass = person.department ? person.department.toLowerCase() : ''

    return [baseClass, deptClass].join(' ')
  }
}

module.exports = render
