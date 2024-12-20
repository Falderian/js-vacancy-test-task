import { Button } from '@mantine/core';

import classes from './index.module.css';

export default Button.extend({
  defaultProps: {
    size: 'md',
    radius: 'md',
  },
  classNames: {
    root: classes.root,
    label: classes.label,
  },
});
