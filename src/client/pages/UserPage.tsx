import React, { useEffect, useState } from 'react'
import { UserModel } from '../../shared/models/user.model';
import { PrerenderData } from '../../shared/PrerenderedData';
import { useServerData } from '../serverData';
import userService from '../services';

/**
 * The user page. Example for state management.
 * 
 * @returns react component.
 */
export default function UserPage() {
    
    const model = useServerData<UserModel>();

    return (
        <div>
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

