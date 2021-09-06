import React from 'react';
import { storiesOf } from '@storybook/react';


import Zervise from '../components/Requirements/Zervise';

const stories = storiesOf('App Test', module);

stories.add('App', () => {
    return (
        <Zervise 
            // subdomain = "zervise"
            subdomain = "zervisefree-y9gwml4zx4ap"
            name = "RjDart"
            email = "raj21dart9007@gmail.com"
            // position = "left"
            position = "center"
            // position = "right"
            // email = "rajsen89611@gmail.com"
        />
    );
});


