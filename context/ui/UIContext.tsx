import { createContext } from 'react';

interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;

    //Methods
    openSideMenu: () => void;
    closeSideMenu: () => void;

    setIsAddingEntry: (isAdding: boolean) => void;
    
    startDraggin: () => void;
    endDraggin: () => void;
}


export const UIContext = createContext({} as ContextProps)