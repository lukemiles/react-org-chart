module.exports = {
  getTextForReports,
  getTextForDepartment,
  getCursorForNode,
  getTextForInfos
}

function pluralize(figure, name) {
  const pluralEnding = figure > 1 ? 's' : ''
  return `${figure} ${name}${pluralEnding}`
}


function getTextForReports(datum) {
  if (!datum.person || !datum.person.totalReports) {
    return ''
  }

  const {
    person: { totalReports }
  } = datum
  return pluralize(totalReports, 'report')
}

function getTextForInfos(datum) {
  if (!datum.person || !datum.person.totalInfos) {
    return ''
  }

  const {
    person: { totalInfos }
  } = datum
  return pluralize(totalInfos, 'goal')
}

const departmentAbbrMap = {
  Marketing: 'mktg',
  Operations: 'ops',
  Growth: 'gwth',
  Branding: 'brand',
  Assurance: 'fin',
  Data: 'data',
  Design: 'design',
  Communications: 'comms',
  Product: 'prod',
  People: 'people',
  Sales: 'sales'
}

function getTextForDepartment(datum) {
  if (!datum.person.department) {
    return ''
  }

  const { department } = datum.person

  if (departmentAbbrMap[department]) {
    return departmentAbbrMap[department].toUpperCase()
  }

  return datum.person.department.substring(0, 3).toUpperCase()
}

function getCursorForNode(datum) {
  return datum.children || datum._children || datum.hasChild
    ? 'pointer'
    : 'default'
}
