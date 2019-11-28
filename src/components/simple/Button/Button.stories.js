import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import ButtonBG from '../../assets/images/discography-button-1-bg.png';

import Button from './Button';

storiesOf('Atoms/Button', module)
  .addDecorator(withKnobs)

  .add('Secondary', () => (
    <Button cssClass="secondary" backgroundImage={ButtonBG}>
      {text('Label', 'Hello Storybook')}
    </Button>
  ))
  .add('Secondary (Color Invert)', () => (
    <Button cssClass="secondary" invertTextColor backgroundImage={ButtonBG}>
       {text('Label', 'Hello Storybook')}
    </Button>
  ))
  .add('Button Fixed Bottom Right', () => (
    <div style={{position: 'relative', width: '100px', height: '300px'}}>
      <Button cssClass="buttonFixed"><FontAwesomeIcon icon={faPlus} color="#abacac" size="1x" /></Button>
    </div>
  ))
  .add('Absolute Top Right', () => <Button cssClass="absoluteTR"> {text('Label', 'Hello Storybook')}</Button>);
