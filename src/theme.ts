import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1b2838',
        },
        secondary: {
            main: '#66c0f4',
        },
        background: {
            default: '#0e141b',
            paper: '#1b2838',
        },
        text: {
            primary: '#e6f1ff',
            secondary: '#9fb3c8',
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: '"Rubik", "Segoe UI", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
})

export default theme