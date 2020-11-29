import React, { useState } from 'react'
import { useSpring, animated as a } from 'react-spring'
import './Card.css'

function Card(props) {
  const isOn = props.isOn;
  const isHover = props.isHover;
  const isSelected = props.isSelected;

  const { transform, opacity, boxShadow, border } = useSpring({
    boxShadow: isSelected ? '0 12.5px 100px -10px rgba(81, 203, 238, 1), 0 10px 10px -10px rgba(81, 203, 238, 0.9)' : '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
    border: isSelected ? '1px solid rgba(81, 203, 238, 1)' : 'none',
    opacity: isOn ? 1 : 0,
    transform: `perspective(600px) rotateY(${isOn ? 180 : 0}deg) scaleX(${isHover || isSelected ? 1.1: 1}) scaleY(${isHover || isSelected ? 1.1 : 1})`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  return (
    <div className="card-items" onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} >
      <a.div className="c back" style={{ boxShadow, border, opacity: opacity.to(o => 1 - o), transform }} />
      <a.div className="c front" style={{ boxShadow, border, opacity, transform: transform.to(t => `${t} rotateY(180deg)`), backgroundImage: `url(${props.image})` }} />
    </div>
  )
}

export default Card;
