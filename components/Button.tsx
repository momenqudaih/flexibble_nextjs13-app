import Image from 'next/image';
import { MouseEventHandler } from 'react';

type Props = {
    title: string;
    type?: 'button' | 'submit';
    leftIcon?: string | null;
    rightIcon?: string | null;
    submitting?: boolean;
    handleClick?: MouseEventHandler;
    bgColor?: string;
    textColor?: string;
};

const Button = ({
    title,
    type,
    leftIcon,
    rightIcon,
    submitting,
    handleClick,
    bgColor,
    textColor,
}: Props) => {
    return (
        <button
            type={type || 'button'}
            disabled={submitting}
            className={`flexCenter gap-3 px-4 py-3 
            ${textColor || 'text-white'} 
            ${
                submitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'
            } rounded-xl text-sm font-medium max-md:w-full`}
            onClick={handleClick}
        >
            {leftIcon && (
                <Image src={leftIcon} alt="Left icon" width={14} height={14} />
            )}
            {title}
            {rightIcon && (
                <Image
                    src={rightIcon}
                    alt="Right icon"
                    width={14}
                    height={14}
                />
            )}
        </button>
    );
};

export default Button;
