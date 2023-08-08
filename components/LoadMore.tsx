'use client';

import { useRouter } from 'next/navigation';

import Button from './Button';

type Props = {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

const LoadMore = ({
    startCursor,
    endCursor,
    hasPreviousPage,
    hasNextPage,
}: Props) => {
    const router = useRouter();

    const handleNavigation = (direction: string) => () => {
        const currentParams = new URLSearchParams(window.location.search);

        if (direction === 'next' && hasNextPage) {
            currentParams.delete('startcursor');
            currentParams.set('endcursor', endCursor);
        } else if (direction === 'first' && hasPreviousPage) {
            currentParams.delete('endcursor');
            currentParams.set('startcursor', startCursor);
        }

        const newSearchParams = currentParams.toString(); // category=webdev&startcursor=123&endcursor=456

        const newPath = `${window.location.pathname}?${newSearchParams}`; // /projects?category=webdev&startcursor=123&endcursor=456

        router.push(newPath);
    };

    return (
        <div className="w-full flexCenter gap-5 mt-10">
            {hasPreviousPage && (
                <Button
                    title="First Page"
                    handleClick={handleNavigation('first')}
                />
            )}
            {hasNextPage && (
                <Button title="Next" handleClick={handleNavigation('next')} />
            )}
        </div>
    );
};

export default LoadMore;
