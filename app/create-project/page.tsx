import { Modal, ProjectForm } from '@/components';

const page = () => {
    return (
        <Modal>
            <h3 className="modal-head-text">Create a New Project</h3>

            <ProjectForm />
        </Modal>
    );
};

export default page;
