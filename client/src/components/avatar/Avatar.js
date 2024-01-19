import React from 'react'
import userImg from '../../Assets/user.png'
import './Avatar.scss'

function Avatar({src}) {
  return (
    <div className='Avatar' >
        <img src={src ? src : userImg} alt=' userimage' />
    </div>
  )
}

export default Avatar