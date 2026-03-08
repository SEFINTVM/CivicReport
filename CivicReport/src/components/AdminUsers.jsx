import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import UsersStyle from './AdminUsers.module.css'

function AdminUsers() {
  const [users,setUsers]=useState([])
  const [selectedUser,setSelectedUser]=useState()

  useEffect(()=>{
      const fetchUsers=async()=>{
          const users=await axios.get('http://localhost:4000/api/users')
          setUsers(users.data)
      }
      fetchUsers()
  })
  return (
  <div className={UsersStyle.container}>
    <h2 className={UsersStyle.title}>Users</h2>

    <div className={UsersStyle.tableWrapper}>
      <table className={UsersStyle.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user)=>(
            <tr
              key={user._id}
              onClick={()=>setSelectedUser(user)}
              className={UsersStyle.row}
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>

{/* USER POPUP */}

{selectedUser && (

  <div className={UsersStyle.modalOverlay}>

    <div className={UsersStyle.modal}>

      <button
        className={UsersStyle.closeBtn}
        onClick={()=>setSelectedUser(null)}
      >
        ✖
      </button>

      <h3>User Details</h3>

      <p><b>Name:</b> {selectedUser.name}</p>
      <p><b>Email:</b> {selectedUser.email}</p>
      <p><b>Phone:</b> {selectedUser.phone}</p>
      <p><b>Role:</b> {selectedUser.role}</p>

    </div>

  </div>

)}

  </div>
)
}

export default AdminUsers