const React = require('react')
const ReactDOM = require('react-dom')
const OrgChart = require('../react/org-chart')
const fakeData = require('../utils/fake-data')

const root = document.getElementById('root')
const tree = fakeData()

tree.children.forEach(d => {
  delete d.person.department
})

const props = {
  tree,
  lineType: 'curve',
  showInfo: true
}

ReactDOM.render(React.createElement(OrgChart, props, null), root)
