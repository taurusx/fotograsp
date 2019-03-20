const primaryColor = '#1a2930'
const secondaryColor = '#c5c1c0'
const accentColor = '#f7ce3e'
const textLight = '#ffffff'
const textDark = '#0a1612'
const transition = {
  duration: '0.5s',
  function: 'cubic-bezier(0.7,0.2,0.1,1.0)',
}

export const themes = {
  light: {
    foreground: textDark,
    fgContrast: textLight,
    fgTopView: primaryColor,
    background: secondaryColor,
    bgContrast: primaryColor,
    bgTopView: 'white',
    accent: accentColor,
    transition: transition,
  },
  dark: {
    foreground: textLight,
    fgContrast: secondaryColor,
    fgTopView: primaryColor,
    background: primaryColor,
    bgContrast: textDark,
    bgTopView: 'white',
    accent: accentColor,
    transition: transition,
  },
}
