import { Component } from "react"

class StackGrid extends Component {
  state = {
    mounted: false
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  render() {
    if (this.state.mounted) {
      const ReactStackGrid = require("react-stack-grid").default
      return <ReactStackGrid {...this.props} />
    }

    return <div style={{ display: "none" }}>{this.props.children}</div>
  }
}

export default StackGrid
