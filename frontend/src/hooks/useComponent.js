import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const useComponent = () => {
    const {darkMode, setDarkMode} = useContext(DarkModeContext);

    const FlexRowCentreDiv = (props) => {
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: darkMode ? 'black' : 'white', color: darkMode ? 'white' : 'black', ...props.style}}>{props.children}</div>
    }

    const FlexColumnCentreDiv = (props) => {
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: darkMode ? 'black' : 'white', color: darkMode ? 'white' : 'black', ...props.style}}>{props.children}</div>
    }

    const FlexRowSpaceAroundDiv = (props) => {
        return <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', backgroundColor: darkMode ? 'black' : 'white', color: darkMode ? 'white' : 'black', ...props.style}}>{props.children}</div>
    }

    const H3NoMargin = (props) => <h3 style={{margin: 0, color: darkMode ? 'white' : 'black', ...props.style}}>{props.children}</h3>

    const Div = (props) => <div style={{backgroundColor: darkMode ? 'black' : 'white', color: darkMode ? 'white' : 'black', ...props.style}}>{props.children}</div>

    return {
        FlexRowCentreDiv,
        FlexColumnCentreDiv,
        FlexRowSpaceAroundDiv,
        H3NoMargin,
        Div
    }
}

export default useComponent;