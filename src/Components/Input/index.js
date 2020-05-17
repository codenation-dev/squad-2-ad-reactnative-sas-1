import React, {forwardRef} from 'react';

import {InputComponent} from './styles';

function Input(props, ref) {
  return <InputComponent {...props} ref={ref} />;
}

export default forwardRef(Input);
