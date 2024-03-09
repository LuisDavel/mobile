const margins = {
    2: 2,
    4: 4,
    8: 8,
    10: 10,
    12: 12,
    14: 14,
    16: 16
}
 const tintColorRing = '#2f95dc';

const padding = {
  2: 2,
  4: 4,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20
}

const colors = {
  cancel:'rgb(255, 154, 62)',
  add:'rgb(110, 115, 249)',
  rnc: 'rgb(227, 62, 62)',
  send: 'rgb(76, 192, 104)'
}

export const lightTheme = {
    colors: {
      ring: tintColorRing,
      typography: '#000000',
      background: '#ffffff',
      backgroundModal: '#ffffff',
      foreground: '#000000',
      muted: '#E3E3E3',
      ...colors
    },
    borderColor: '#343A49',
    margins:margins,
    padding: padding
}
 
export const darkTheme = {
  colors: {
    ring: tintColorRing,
    typography: '#ffffff',
    background: '#010714',
    backgroundModal: '#1E293B',
    foreground: '#ffffff',
    muted: '#27272a',
    ...colors
  },
  borderColor: '#c7c7c7',
  margins: margins,
  padding: padding
} as const