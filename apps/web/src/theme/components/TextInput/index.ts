import { TextInput } from '@mantine/core';
import cx from 'clsx';

import classes from './index.module.css';

export default TextInput.extend({
  defaultProps: {
    size: 'md',
    styles: { input: { border: '1px #ECECEE solid' } },
  },
  classNames: (_, props) => ({
    label: cx({
      [classes.error]: props.error,
    }),
  }),
});
