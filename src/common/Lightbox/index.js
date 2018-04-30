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
      const ReactImages = require("react-images").default
      return <ReactImages {...this.props} />
    }

    return null
  }
}

export default StackGrid
