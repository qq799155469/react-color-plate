# react-color-plate
A color picker tool for React

#### 参数
| 参数名 | 是否必须 | 类型 | 描述 |
| - | - | - | - |
| title | 非必须 | string | modal的标题，默认为'Please choose your color' |
| defaultColor | 必须 | string | 默认颜色, 'red', '#333', 'rgba(0,23,12,0.65)' |
| callback | 非必须 | func | 回调函数 |
| colorsList | 非必须 | array | 初始颜色列表,['#333', 'red', 'yellow'] |

#### 调用
```
import ColorPicker from 'react-color-plate的位置'

class demo extends Component {
  ...
  changeColor = color => {
    console.log(color)
  }
  render() {
    return (
       <ColorPicker 
       title='选择颜色'
       defaultColor='red'
       callback={this.changeColor}
       />
    )
  }
}
```

![demo](static/images/demo1.jpeg)

![demo](static/images/demo2.jpeg)
