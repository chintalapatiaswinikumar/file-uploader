import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Records extends Component {
  state = {
    recordsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRecords()
  }

  getRecords = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://file-uploader-api-111.herokuapp.com/records`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.map(record => ({
        id: record.id,
        userId: record.user_id,
        body: record.body,
        title: record.title,
      }))
      this.setState({
        recordsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderRecordsList() {
    const {recordsList} = this.state
    return (
      <div>
        <Header />
        {recordsList.length > 0 ? (
          <ul>
            {recordsList.map(record => {
              const {id, title, body} = record
              return (
                <li className="list" key={id}>
                  <h1>{title}</h1>
                  <p>{body}</p>
                </li>
              )
            })}
          </ul>
        ) : (
          <>
            <div className="no-record">
              <img
                src="https://res.cloudinary.com/dx3zbikpn/image/upload/v1641481363/norecord_xhl52g.png"
                alt="no records"
              />
            </div>
            <div className="empty-list">
              <h1 className="empty-head">
                No Records found Please upload and submit a file to know its
                records
              </h1>
            </div>
          </>
        )}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRecordsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}
export default Records
