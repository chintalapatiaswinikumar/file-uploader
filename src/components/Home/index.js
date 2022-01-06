import {Component} from 'react'
/* import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom' */
import ReactFileReader from 'react-file-reader'
import Header from '../Header/index'
import './index.css'

class Home extends Component {
  state = {
    uploadedData: [],
  }

  handleFiles = files => {
    const reader = new FileReader()
    reader.onload = e => {
      /*       console.log('result', reader.result)
       */ this.setState({uploadedData: reader.result})
    }
    reader.readAsText(files[0])
  }

  handleSubmit = async e => {
    console.log('Form submitted')
    const {uploadedData} = this.state
    const url = 'http://localhost:3000/upload'
    const options = {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-type': 'application/json'},
      body: uploadedData,
    }
    const response = await fetch(url, options)
    console.log('res', response)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {uploadedData} = this.state
    console.log('data', uploadedData)
    return (
      <div className="home-box1">
        <Header />
        <div className="home-box2">
          <img
            src="https://res.cloudinary.com/dx3zbikpn/image/upload/v1641449524/upload_pnxxvt.png"
            alt="home"
            className="home-img"
          />
          <div className="home-butt-box">
            <ReactFileReader
              fileTypes={['.csv', '.zip', '.json']}
              handleFiles={this.handleFiles}
            >
              <button type="button" className="butt-home">
                Upload
              </button>
            </ReactFileReader>
            <button
              type="button"
              className="butt-submit"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
