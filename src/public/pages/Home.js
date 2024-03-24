import React from 'react'
import { Button, Card, Col, Container, FloatingLabel, Form, Image, Row } from 'react-bootstrap';
import './HomeEstilos.css'

export default function Home() {
  return (
    <div>
      <div className='titulo'>
        <h1 >𝘗𝘢𝘨𝘪𝘯𝘢 𝘱𝘳𝘪𝘯𝘤𝘪𝘱𝘢𝘭</h1>
      </div>
      <Image src='/images/fondo.png' style={{width:'100%'}}/>
    </div>
  )
}
