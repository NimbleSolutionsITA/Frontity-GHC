import {useEffect, useState} from "react";
import {connect} from "frontity";
import {useTheme, Box} from "@material-ui/core";
import translations from "../../translations";


const TradingViewGHC = ({state}) => {
    const [loaded, setLoaded] = useState(false)
    const theme = useTheme()
    useEffect(() => {
        const existingScript = document.getElementById('tradingView');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/tv.js';
            script.id = 'tradingView';
            document.body.appendChild(script);
            script.onload = () => setLoaded(true)
        }
        else
            setLoaded(true)
    }, [])
    useEffect(() => {
        if (loaded && window.TradingView)
            new window.TradingView.MediumWidget(
                {
                    "symbols": [
                        [
                            "GHC",
                            "MIL:GHC|12M"
                        ]
                    ],
                    "chartOnly": false,
                    "width": '100%',
                    "height": '100%',
                    "locale": state.theme.lang,
                    "colorTheme": "light",
                    "gridLineColor": "rgba(240, 243, 250, 0)",
                    "fontColor": "#787B86",
                    "isTransparent": false,
                    "autosize": true,
                    "showVolume": false,
                    "scalePosition": "no",
                    "scaleMode": "Normal",
                    "fontFamily": "Ubuntu, sans-serif",
                    "noTimeScale": false,
                    "valuesTracking": "1",
                    "chartType": "area",
                    "lineColor": theme.palette.primary.main,
                    "bottomColor": theme.palette.primary.main+'00',
                    "topColor": theme.palette.primary.main+'4d',
                    "container_id": "tradingview_ghc"
                }
            )
    }, [loaded])
    return (
        <Box position="relative" width="100%" paddingBottom={{xs: '100%', sm: '80%', md: '60%', lg: '50%'}}>
            <div style={{position: 'absolute', width: '100%'}} className="tradingview-widget-container">
                <div id="tradingview_ghc" />
                <div className="tradingview-widget-copyright">
                    <a href="https://it.tradingview.com/symbols/MIL-GHC/" rel="noopener" target="_blank"><span className="blue-text">{translations(state.theme.lang, 'quotazione')}</span></a> {translations(state.theme.lang, 'da')} TradingView
                </div>
            </div>
        </Box>
    )
}

export default connect(TradingViewGHC)