import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './Modal.scss'


type Props = {
    open: boolean;
    close?: (open: boolean) => void;
    children: ReactNode;
    clearData?: Function;
    isError?: boolean,
    isSuccess?: boolean
    noHidden?: boolean
}

export const Portal: React.FC<Props> = ({ open, children, close, clearData, noHidden }) => {

    React.useEffect(() => {
        !noHidden && open && document.body.classList.add('hidden');
        !noHidden && !open && document.body.classList.remove('hidden');
    }, [open]);

    if (open) {
        return ReactDOM.createPortal(
            <div className={`modal__wrapper`} onClick={() => { close && close(false); clearData && clearData() }}>
                {children}
            </div>, document.getElementById("modal-root")!!
        )
    } else {
        return null
    }
}
