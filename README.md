# pioneer-avr

> Control your Pioneer AVR over the network. Set volume, change inputs, and many more.

## Install

```bash
npm i @callmekory/pioneer-avr
```

## Usage

```ts
import { Pioneer } from '@callmekory/pioneer-avr'

const receiver = new Pioneer('ip of receiver')

// Set volume to 75%
await receiver.setVolume(75)

// Set input source to DVD
await receiver.input('dvd')
```

## Docs
https://callmekory.github.io/pioneer-receiver-api/index.html
