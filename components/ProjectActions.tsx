'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { deleteProject, fetchToken } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const ProjectActions = ({ projectId }: { projectId: string }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const deleteProjectHandler = async () => {
        setIsDeleting(true);
        const { token } = await fetchToken();

        try {
            await deleteProject(projectId, token);

            router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Link
                href={`/edit-project/${projectId}`}
                className="flexCenter edit-action_btn"
            >
                <Image src="/pencile.svg" width={15} height={15} alt="edit" />
            </Link>

            <button
                type="button"
                className={`flexCenter delete-action_btn ${
                    isDeleting ? 'bg-gray' : 'bg-primary-purple'
                } `}
                onClick={deleteProjectHandler}
            >
                <Image src="/trash.svg" width={15} height={15} alt="delete" />
            </button>
        </>
    );
};

export default ProjectActions;
