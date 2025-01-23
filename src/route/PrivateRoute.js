import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ user, children }) => {
    // children - react 에서 쓰는 pros
    return (
        // user가 있으면 ? todoPage, 없다면? redirect to /login
        user ? children : <Navigate to='/login' />
    )
}

export default PrivateRoute
