const animationDuration = 350
const shouldResize = true

// Nodes
const nodeWidth = 240
const nodeHeight = 120
const infoHeight = 60
const infoNodeHeight = 320
const nodeSpacing = 12
const nodePaddingX = 16
const nodePaddingY = 16
const avatarWidth = 40
const nodeBorderRadius = 4
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}

const infoName = 'detail'
const infoEmptyImage = 'empty.svg'

// Constants
const PERSON_INFO_EMPTY_PLACEHOLDER = 'No info yet!' // Used for screenreaders / alt text

// Lines
const lineType = 'angle'
const lineDepthY = 120 /* Height of the line for child nodes */

// Colors
const backgroundColor = '#fff'
const borderColor = '#e6e8e9'
const nameColor = '#222d38'
const titleColor = '#617080'
const reportsColor = '#92A0AD'

// Classes
const PERSON_INFO_CLASS = 'org-chart-info'
const PERSON_INFO_CLASS_EMPTY = 'org-chart-info-empty'
const PERSON_INFO_TEXT_CLASS = 'org-chart-info-text'
const PERSON_NODE_CLASS = 'org-chart-node'
const PERSON_LINK_CLASS = 'org-chart-person-link'
const PERSON_NAME_CLASS = 'org-chart-person-name'
const PERSON_TITLE_CLASS = 'org-chart-person-title'
const PERSON_DEPARTMENT_CLASS = 'org-chart-person-dept'
const PERSON_REPORTS_CLASS = 'org-chart-person-reports'
const PERSON_INFO_DETAIL_CLASS = 'org-chart-person-info-detail'

const config = {
  margin,
  animationDuration,
  nodeWidth,
  nodeHeight,
  infoHeight,
  infoEmptyImage,
  infoName,
  infoNodeHeight,
  nodeSpacing,
  nodePaddingX,
  nodePaddingY,
  nodeBorderRadius,
  avatarWidth,
  lineType,
  lineDepthY,
  backgroundColor,
  borderColor,
  nameColor,
  titleColor,
  reportsColor,
  shouldResize,
  PERSON_NODE_CLASS,
  PERSON_INFO_CLASS,
  PERSON_INFO_DETAIL_CLASS,
  PERSON_INFO_CLASS_EMPTY,
  PERSON_INFO_TEXT_CLASS,
  PERSON_INFO_EMPTY_PLACEHOLDER,
  PERSON_LINK_CLASS,
  PERSON_NAME_CLASS,
  PERSON_TITLE_CLASS,
  PERSON_DEPARTMENT_CLASS,
  PERSON_REPORTS_CLASS
}

module.exports = config
