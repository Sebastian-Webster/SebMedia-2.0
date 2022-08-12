import React, {useContext} from 'react';
import { CredentialsContext } from '../context/CredentialsContext';

const Dashboard = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    return (
        <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1>Dashboard Screen</h1>
        </div>
    )
}

export default Dashboard;