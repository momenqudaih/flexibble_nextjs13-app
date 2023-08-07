'use client';

import { useCallback, useRef, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Modal = ({ children }: { children: ReactNode }) => {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleClick = () => {};
    const onDismiss = () => {};

    return (
        <div ref={overlay} className="modal" onClick={handleClick}>
            <button
                type="button"
                onClick={onDismiss}
                className="absolute top-4 right-8"
            ></button>
            <div>{children}</div>
        </div>
    );
};

export default Modal;
