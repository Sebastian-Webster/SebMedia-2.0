import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard, faImage } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useOutlet, Outlet } from 'react-router-dom';

const Posts = () => {
    const navigate = useNavigate()
    const outlet = useOutlet()
    const Format = ({icon, onClick}) => {
        return (
            <button onClick={onClick} style={{cursor: 'pointer', padding: 10, border: '3px solid black', borderRadius: '50%', width: '15vw', height: '15vw', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '1vw', marginRight: '1vw'}}>
                <FontAwesomeIcon icon={icon} style={{fontSize: '11vw'}}/>
            </button>
        )
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            {outlet ?
                <Outlet/>
            :
                <>
                    <h1>Select a post format</h1>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Format icon={faKeyboard} onClick={() => {navigate('createTextPost')}}/>
                        <Format icon={faImage} onClick={() => {navigate('createImagePost')}}/>
                    </div>
                </>
            }
        </div>
    )
}

export default Posts;