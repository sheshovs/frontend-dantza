import '@fontsource/poppins'
import '@fontsource/roboto'

export function pxToRem(value: number): string {
  return `${value / 16}rem`
}

function responsiveFontSizes({
  xs,
  sm,
  md,
  lg,
}: {
  xs: number
  sm: number
  md: number
  lg: number
}): Record<string, unknown> {
  return {
    '@media (min-width:200px)': {
      fontSize: pxToRem(xs),
    },
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
      lineHeight: 1.5,
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
      lineHeight: 1.5,
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
      lineHeight: 1.5,
    },
  }
}

const typography = {
  fontFamily: `Poppins, Roboto, sans-serif`,
  h1: {
    lineHeight: 1.167,
    fontSize: pxToRem(96),
    letterSpacing: pxToRem(-1.5),
    ...responsiveFontSizes({
      xs: 40,
      sm: 56,
      md: 64,
      lg: 80,
    }),
  },
  h2: {
    lineHeight: 1.2,
    fontSize: pxToRem(60),
    letterSpacing: pxToRem(-0.5),
    ...responsiveFontSizes({
      xs: 36,
      sm: 42,
      md: 48,
      lg: 54,
    }),
  },
  h3: {
    lineHeight: 1.167,
    fontSize: pxToRem(48),
  },
  h4: {
    lineHeight: 1.235,
    fontSize: pxToRem(34),
    letterSpacing: pxToRem(0.5),
  },
  h5: {
    lineHeight: 1.334,
    fontSize: pxToRem(24),
  },
  h6: {
    lineHeight: 1.6,
    fontSize: pxToRem(20),
    letterSpacing: pxToRem(0.15),
  },
  subtitle1: {
    lineHeight: 1.75,
    fontSize: pxToRem(16),
    letterSpacing: pxToRem(0.15),
  },
  subtitle2: {
    lineHeight: 1.57,
    fontSize: pxToRem(14),
    letterSpacing: pxToRem(0.1),
  },
  subtitle3: {
    fontWeight: 400,
    lineHeight: `24px`,
    fontSize: pxToRem(16),
    letterSpacing: pxToRem(0.15),
  },
  subtitle4: {
    fontWeight: 400,
    lineHeight: `12px`,
    fontSize: pxToRem(12),
    letterSpacing: pxToRem(0.15),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    letterSpacing: pxToRem(0.15),
    ...responsiveFontSizes({
      xs: 16,
      sm: 16,
      md: 16,
      lg: 16,
    }),
  },
  body2: {
    lineHeight: 1.43,
    fontSize: pxToRem(14),
    letterSpacing: pxToRem(0.15),
    ...responsiveFontSizes({
      xs: 12,
      sm: 13,
      md: 14,
      lg: 14,
    }),
  },
}

export default typography
