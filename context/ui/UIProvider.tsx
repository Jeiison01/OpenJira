import { UIContext, uiReducer } from './';
import { PropsWithChildren, useReducer } from 'react';

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}


const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

export const  UIProvider = ({children}: PropsWithChildren) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({
            type: 'UI - Open Sidebar'
        })
    }

    const closeSideMenu = () => {
        dispatch({
            type: 'UI - Close Sidebar'
        })
    }
    const setIsAddingEntry = (isAdding: boolean) => {
        dispatch({
            type: 'UI - Set isAddingEntry',
            payload: isAdding
        })
    }

    const startDraggin = () => {
        dispatch({
            type: 'UI - Start Dragging'
        })
    }
    const endDraggin = () => {
        dispatch({
            type: 'UI - End Dragging'
        })
    }

  return (
    <UIContext.Provider
        value={{
            ...state,
            openSideMenu,
            closeSideMenu,
            
            setIsAddingEntry,

            startDraggin,
            endDraggin
        }}
    >
        {children}
    </UIContext.Provider>
  )
}