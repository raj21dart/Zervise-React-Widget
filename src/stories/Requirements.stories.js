import React from 'react';
import { storiesOf } from '@storybook/react';

// import { Requirements } from '../components/Requirements';
import Zervise from '../components/Requirements/Zervise';

const stories = storiesOf('App Test', module);

stories.add('App', () => {
    return (
        <Zervise 
            subdomain = "zervisefree-y9gwml4zx4ap"
            name = "Raj9007"
            email = "raj21dart9007@gmail.com"
        />
    );
});