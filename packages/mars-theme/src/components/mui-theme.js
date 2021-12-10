import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const breakpoints = createBreakpoints({})

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#375172',
        },
        secondary: {
            main: '#E9ECF2',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
    typography: {
        fontFamily: [
            'Ubuntu',
            'sans-serif',
        ].join(','),
    },
    overrides: {
        MuiTypography: {
            h1: {
                fontSize: '32px',
                lineHeight: '37px',
                [breakpoints.down('md')]: {
                    fontSize: '28px',
                    lineHeight: '32px',
                },
            },
            h3: {
                fontSize: '24px',
                lineHeight: '28px',
                [breakpoints.down('md')]: {
                    fontSize: '22px',
                    lineHeight: '25px',
                },
            },
            h4: {
                fontSize: '20px',
                lineHeight: '28px',
                [breakpoints.down('md')]: {
                    fontSize: '18px',
                    lineHeight: '24px',
                },
            },
            body1: {
                fontSize: '16px',
                lineHeight: '24px',
                [breakpoints.down('md')]: {
                    fontSize: '14px',
                    lineHeight: '24px',
                },
            },
            body2: {
                fontSize: '14px',
                lineHeight: '24px',
                [breakpoints.down('md')]: {
                    fontSize: '12px',
                    lineHeight: '20px',
                },
            }

        },
        MuiAppBar: {
            colorDefault: {
                backgroundColor: '#F5F9FC',
            }
        },
        MuiButton: {
            root: {
                textTransform: 'none',
                fontSize: '16px',
                lineHeight: '18px',
                borderRadius: '8px',
                padding: '10px 20px',
                textDecoration: 'underline',
            },
            contained: {
                color: '#375172',
                textDecoration: 'none',
                fontWeight: 'bold',
                backgroundColor: '#E9ECF2',
            },
            outlined: {
                textDecoration: 'none',
                fontWeight: 'bold',
                padding: '10px 20px',
            },
            containedSecondary: {
                color: '#375172',
            }
        },
        MuiAlert: {
            outlinedError: {
                backgroundColor: 'rgba(235, 87, 87, 0.05)',
                border: '2px solid #EB5757',
                borderRadius: '8px',
                color: '#000000'
            },
            action: {
                alignItems: 'start',
                color: '#EB5757',
            }
        },
        MuiOutlinedInput: {
            root: {
                paddingLeft: '16px',
                borderRadius: '50px',
                borderColor: '#375172',
                background: '#F6F9FC'
            }
        }
    }
});

export default theme;