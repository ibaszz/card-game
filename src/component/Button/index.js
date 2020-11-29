import React from 'react';
import './Button.css';

const Button = ({children, ...props}) => (<div class="box-1">
<div class="btn btn-one" {...props}>
  <span>{children}</span>
</div>
</div>)
    

export default Button;