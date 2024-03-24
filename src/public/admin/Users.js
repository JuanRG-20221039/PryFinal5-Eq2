import React from 'react'
import useFetch from '../../helpers/useFetch'

export default function Users() {
  const { data, loading } = useFetch('https://apipry-dev-gjxn.1.us-1.fl0.io/usuarios')
  console.log(loading ? '' : data)
  return (
    <div>Users</div>
  )
}
