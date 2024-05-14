# 🎨 uni-color-palette

## Introduction
uni-color-palette is a lightweight library designed to provide organized color palettes based on principles of universal design. This simple library allows users to efficiently manage and access appropriate colors for UI and UX design. With a focus on enhancing user experience and ensuring accessibility, uni-color-palette supports developers in easily integrating universal colors into their projects.

## Install
```bash
npm install uni-color-palette
```

or

```bash
yarn add uni-color-palette
```

## Usage
```ts
import { getColorsByPaletteName } from 'uni-color-palette';

// Example of retrieving the 'bright' palette from the 'PaulTol' palette group
const colors = getColorsByPaletteName('PaulTol', 'bright');

// colors array will contain:
// ["#4477AA", "#EE6677", "#228833", "#CCBB44", "#66CCEE", "#AA3377", "#BBBBBB"]
```

## Color Examples


## Contributing
uni-color-palette welcomes bug reports, improvement suggestions, and requests for adding new color palettes.
If you are interested in adding a new color palette or modifying existing ones, please propose code changes via GitHub pull requests.

## References
Paul Tol's Notes
https://personal.sron.nl/~pault/

Color universal design recommended color scheme set by japanCUDO
https://cudo.jp/?page_id=1565
