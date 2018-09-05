import React, { Component }  from 'react'
import PropTypes from 'prop-types'

const defaultColorsList = ['#f81d22', '#1890ff', '#0b8235', '#e90', '#c41d7f', '#faad14', 'rgba(13, 27, 62, 0.65)']

/*
  params:
    1.title 标题
    2.defaultColor 默认颜色
    3.callback 回调函数
    4.colorsList 初始颜色列表
*/

export default class ColorPicker extends Component {
  static propTypes = {
    defaultColor: PropTypes.any,
    callback: PropTypes.any,
    title: PropTypes.string,
    colorsList: PropTypes.array
  }
  constructor(props) {
    super(props)
    this.state = {
      color: this.props.defaultColor,
      inputColor: this.props.defaultColor,
      visible: false,
      defaultTitle: 'Please choose your color',
      colorsList: this.props.colorsList || defaultColorsList
    }
  }
  handlePickerColor = color => {
    this.setState({
      color,
      visible: false
    })
    this.props.callback && this.props.callback(color)
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible })
  }
  handleChangeColor = e => {
    this.setState({
      inputColor: e.target.value
    })
  }
  handleChangeColorCB = () => {
    this.props.callback && this.props.callback(this.state.inputColor)
    this.setState({ 
      color: this.state.inputColor,
      visible: false 
    })
  }
  render() {
    const ColorsList = this.state.colorsList.map((color, key) => (
      <i
      key={key}
      onClick={() => this.handlePickerColor(color)}
      style={{
        width: 16,
        height: 16,
        display: 'inline-block',
        marginRight: key === this.state.colorsList.length - 1 ? 0 : 10,
        backgroundColor: color,
        boxShadow: 'inset 0.5px 0.5px 3px #444',
        borderRadius: '50%',
        cursor: 'pointer'
      }}/>
    ))
    const ColorPickerContent = (
      <div>
        <div>
          {ColorsList}
        </div>
        <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 12
        }}>
          <input
          value={this.state.inputColor}
          title={this.state.inputColor}
          onChange={e => this.handleChangeColor(e)}
          style={{
            outline: 'none',
            border: '1px solid #d9d9d9',
            borderRadius: 4,
            height: 28,
            width: '50%',
            padding: '6px 9px'
          }}/>
          <span
          style={{
            display: 'inline-block',
            width: 26,
            height: 26,
            borderRadius: 4,
            backgroundColor: this.state.inputColor
          }}
          ></span>
          <button 
          style={{
            border: 'none',
            borderRadius: 4,
            height: 26,
            fontSize: 12,
            outline: 'none',
            backgroundColor: '#1890ff',
            color: '#fff',
            cursor: 'pointer'
          }}
          onClick={() => this.handleChangeColorCB()}>Ok</button>
        </div>
      </div>
    )
    return (
      <div>
        {/* <Popover
        title={this.props.title || this.state.defaultTitle}
        content={ColorPickerContent}
        trigger='click'
        placement="bottom"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}>
          <span style={{
            width: 16,
            height: 16,
            display: 'inline-block',
            backgroundColor: this.state.color,
            boxShadow: 'inset 0.5px 0.5px 3px #444',
            borderRadius: '50%',
            cursor: 'pointer'
          }}/>
        </Popover> */}
        <ColorPanel
        title={this.props.title || this.state.defaultTitle}
        content={ColorPickerContent}
        trigger='click'
        placement="bottom"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        >
          <span 
          className='color-picker-btn'
          style={{
            width: 16,
            height: 16,
            display: 'inline-block',
            backgroundColor: this.state.color,
            boxShadow: 'inset 0.5px 0.5px 3px #444',
            borderRadius: '50%',
            cursor: 'pointer'
          }}/>
        </ColorPanel>
      </div>
    )
  }
}

class ColorPanel extends Component {
  static propTypes = {
    onVisibleChange: PropTypes.any,
    children: PropTypes.any,
    visible: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.any
  }
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentDidMount(){
    this._onBlurHandler(self)
  }

  _onBlurHandler() {
    document.body.addEventListener('click', e => {
      const matchesSelector = (element, selector) => {
        if (element.matches) {
          return element.matches(selector)
        } else if (element.matchesSelector) {
          return element.matchesSelector(selector)
        } else if (element.webkitMatchesSelector) {
          return element.webkitMatchesSelector(selector)
        } else if (element.msMatchesSelector) {
          return element.msMatchesSelector(selector)
        } else if (element.mozMatchesSelector) {
          return element.mozMatchesSelector(selector)
        } else if (element.oMatchesSelector) {
          return element.oMatchesSelector(selector)
        }
      }
      if (matchesSelector(e.target, '.color-picker-container *')) {
        return
      } else {
        this.props.onVisibleChange(false)
      }
    })
  }

  render() {
    return (
      <div>
        {React.cloneElement(
          this.props.children,
          {
            onClick: () => this.props.onVisibleChange(!this.props.visible)
          }
        )}
        {this.props.visible && <div 
        className='color-picker-container'
        style={{
          position: 'relative',
          zIndex: 100,
          width: '100%',
          height: '100%'
        }}>
          <i style={{
            left: 8,
            width: 10,
            backgroundColor: '#fff',
            display: 'block',
            height: 10,
            position: 'absolute',
            borderLeft: '1px solid rgb(233, 233, 233)',
            borderTop: '1px solid rgb(233, 233, 233)',
            zIndex: 101,
            transform: 'translateX(-50%) rotate(45deg)'
          }}/>
          <div 
          style={{
            position: "absolute",
            left: '-50%',
            top: 6,
            minWidth: 210,
            height: 'auto',
            borderRadius: 4,
            backgroundColor: '#fff',
            boxShadow: '0 1px 6px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{
              // min-width: 177px;
              margin: 0,
              padding: '5px 16px 4px',
              minHeight: 32,
              borderBottom: '1px solid #e9e9e9',
              color: 'rgba(39, 56, 72, 0.85)',
              fontWeight: 500
            }}>
              {this.props.title}
            </div>
            <div style={{
              padding: '12px 16px',
              color: 'rgba(13, 27, 62, 0.65)'
            }}>
              {this.props.content}
            </div>
          </div>
        </div>}
      </div>
    )
  }
}