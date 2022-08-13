import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Restricted = ({ children }) => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
      if (!user) navigate('/', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    

    if (user) return <>{children}</>
}

export default Restricted
