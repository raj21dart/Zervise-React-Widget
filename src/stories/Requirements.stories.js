import React from 'react';
import { storiesOf } from '@storybook/react';

// import { Requirements } from '../components/Requirements';
import Zervise from '../components/Requirements/Zervise';

const stories = storiesOf('App Test', module);

stories.add('App', () => {
    return (<Zervise />);
});