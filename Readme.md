# React Zervise Integration

A Promise based NPM JS package for easily integrating any app with Zervise's customer support and ticketing system.

## Table of Contents

- [Features](#features)
- [Installing](#installing)
- [Your Zervise Subdomain](#your-zervise-subdomain)
- [Examples](#examples)
- [License](#license)

## Features

- Integrate your [Zervise](https://zervise.com) subdomain with your other app.
- Add an efficient ticketing system for your customers.
- View tickets to manage your customer complaints.
- Authenticate your users in Zervise subdomain with their email.
- Show the FAQs for your Zervise subdomain in your other apps.

## Installing

- Using npm:

```bash
$ npm install @xyz/xyz
```

- Using yarn:

```bash
$ yarn add @xyz/xyz
```

## Your Zervise Subdomain

### Sign Up in Zervise

For using this package you need a Zervise account and a Zervise subdomain.<br>
To create a `Free Zervise Account and get your own Zervise subdomain` head over to this link 👉 [Sign Up in Zervise](https://zervise.com/).

### Find your Zervise subdomain

Upon succesfull sign up you should receive one email with your zervise subdomain link in the registered email address.

#### Example

If your link is `https://zervisefree-y9gwml4zx4ap.zervise.com/`, then your zervise subdoamin is `zervisefree-y9gwml4zx4ap`.

## Examples

### Import to your project

```js
import { Zervise } from "zervise-integration";
```

### Authenticate

- After importing use directly to your project

```js
  <Zervise 
    subdomain="<Your-Subdomain>" 
    name="<user-name>" 
    email="<user-email>" 
    position= "<left>|<center>|<right>" 
  />
```

- Upon successful authentication, you would get this UI

- ![image](https://drive.google.com/uc?export=view&id=1P_WeYGdB7d3YElW9-BzYL1Rgpzg2MHme)

### Create a new ticket

- You can create new ticket using the following and jump to the [My_Tickets](#mytickets)

  ![image](https://drive.google.com/uc?export=view&id=16P4xNrCTAK3tsAcFZbjVB36yErLxjD_t)

### My_Tickets

- ![image](https://drive.google.com/uc?export=view&id=12L8DZXPk_1Ub0y53r-aBXhuaByR4L91n)

### Reply to a ticket as the user

- ![image](https://drive.google.com/uc?export=view&id=1Y2ZWODzLUit_M71n9f2ziM0Hy-UB-Gwc)

### Get the FAQ articles of your company for users

- ![image](https://drive.google.com/uc?export=view&id=12L8DZXPk_1Ub0y53r-aBXhuaByR4L91n)
