import React from 'react';
import { storiesOf } from '@storybook/react';


import Zervise from '../components/Requirements/Zervise';

const stories = storiesOf('App Test', module);

stories.add('App', () => {
    return (
        <Zervise 
            subdomain = "zervise"
            name = "Raj"
            email = "rajsen89611@gmail.com"
        />
    );
});


