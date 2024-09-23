import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import axios from 'axios'
import { config } from '../../config'

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')
  const navigate = useNavigate()

  const verifyPayment = async () => {
    const response = await axios.post(config.baseUrl + '/api/order/verify', {success, orderId})
    if (response.data.success) {
        navigate('/my-orders')
    } else {
        navigate('/')
    }
  }

  useEffect(() => {
    verifyPayment()
  })

  return (
    <div className='verify'>
      <div className="spinner"></div>

    </div>
  )
}

export default Verify