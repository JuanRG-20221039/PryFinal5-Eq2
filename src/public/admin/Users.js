import React from 'react'
import useFetch from '../../helpers/useFetch'

export default function Users() {
  const { data, loading } = useFetch('https://apipry.onrender.com/usuarios')
  console.log(loading ? '' : data)
  return (
    <div>Users</div>
  )
}
