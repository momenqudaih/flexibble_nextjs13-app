'use client';

import { useState } from 'react';
import { FormState, ProjectInterface, SessionInterface } from '@/common.types';
import Image from 'next/image';
import FormField from './FormField';
import { useRouter } from 'next/navigation';
import { categoryFilters } from '@/constants';
import { Button, CustomMenu } from '@/components';
import { createNewProject, fetchToken, updateProject } from '@/lib/actions';

type Props = {
    type: string;
    session: SessionInterface;
    project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    const reader = new FileReader();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSubmitting(true);

        const { token } = await fetchToken();

        try {
            if (type === 'create') {
                // here we will create a new project
                await createNewProject(form, session?.user?.id, token);

                router.push('/');
            }

            if (type === 'edit') {
                // here we will update the existing project
                await updateProject(form, project?.id as string, token);

                router.push('/');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred while submitting the form. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes('image')) {
            alert('Please upload an image file');
            return;
        }

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;

            handleStateChange('image', result);
        };
    };

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prev) => ({ ...prev, [fieldName]: value }));
    };

    const [form, setForm] = useState<FormState>({
        title: project?.title || '',
        description: project?.description || '',
        image: project?.image || '',
        liveSiteUrl: project?.liveSiteUrl || '',
        githubUrl: project?.githubUrl || '',
        category: project?.category || '',
    });

    return (
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleFormSubmit} className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image && 'Choose a poster for your project'}
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    required={type === 'create' ? true : false}
                    className="form_image-input"
                    onChange={(e) => handleChangeImage(e)}
                />
                {form.image && (
                    <Image
                        src={form.image}
                        alt="Project poster"
                        className="sm:p-10 object-contain z-20"
                        fill
                    />
                )}
            </div>

            <FormField
                title="Title"
                state={form.title}
                placeholder="InspiroShot"
                setState={(value) => handleStateChange('title', value)}
            />

            <FormField
                title="Description"
                state={form.description}
                placeholder="Showcase and discover remarkable developer projects."
                isTextArea
                setState={(value) => handleStateChange('description', value)}
            />

            <FormField
                type="url"
                title="Website URL"
                state={form.liveSiteUrl}
                placeholder="https://momenqudaih.pro"
                setState={(value) => handleStateChange('liveSiteUrl', value)}
            />

            <FormField
                type="url"
                title="GitHub URL"
                state={form.githubUrl}
                placeholder="https://github.com/momen-qudaih"
                setState={(value) => handleStateChange('githubUrl', value)}
            />

            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            />

            <div className="flexStart w-full">
                <Button
                    title={
                        submitting
                            ? `${
                                  type === 'create' ? 'Creating' : 'Updating'
                              } project...`
                            : `${
                                  type === 'create' ? 'Create' : 'Update'
                              } project`
                    }
                    type="submit"
                    leftIcon={submitting ? '' : '/plus.svg'}
                    submitting={submitting}
                />
            </div>
        </form>
    );
};

export default ProjectForm;