import { Categories, LoadMore, Posts } from '@/components';

const Home = () => {
    return (
        <section className="flex-start flex-col paddings mb-16">
            <Categories />
            <Posts />
            <LoadMore />
        </section>
    );
};

export default Home;
