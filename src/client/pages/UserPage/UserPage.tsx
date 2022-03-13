import React from 'react'
import { useServerData } from '../../serverData';
import { UserModel } from '../../../shared/models/user.model';

/**
 * The user page. Example for state management.
 * 
 * @returns react component.
 */
export default function UserPage() {
    
    const model = useServerData<UserModel>();

    return (
        <div className='user__container'>
            <h1>User Page</h1>
            { 
                model && 
                <p>Hello {model.name}</p>
            }
            { 
                !model && 
                <p>No user data.</p>
            }
        </div>
    )
}

