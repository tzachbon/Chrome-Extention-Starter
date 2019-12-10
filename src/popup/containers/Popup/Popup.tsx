import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { observer, useLocalStore } from 'mobx-react';
import * as React from 'react';
import './Popup.scss';


const theme = createMuiTheme({
    palette: {
        type: "dark",
        grey: {
            800: "#000000", // overrides failed
            900: "#121212" // overrides success
        },
        background: {
            paper: "#000000"
        },
        primary: {
            light: '#fff',
            main: '#09d3ac',
            dark: '#eee',
            contrastText: '#eee'
        },
        secondary: {
            main: '#40739e',
            dark: '#eee',
            light: '#fff',
            contrastText: '#eee'

        },
    },
    typography: {
        fontFamily: "Nunito Sans, Roboto, sans-serif",
        fontSize: 20,
        allVariants: {
            color: '#eee'
        }
    },
});


interface AppProps { }

interface AppState { }

const App: React.FC = (props: AppProps) => {
    const state = useLocalStore(() => ({}));


    return (
        <MuiThemeProvider theme={theme}>
            <div className="popupContainer" >
                <Typography variant="h3" className='flex-center t-center'  gutterBottom>
                    Hello World!
                </Typography>
            </div>
        </MuiThemeProvider>
    )
}

export default observer(App);