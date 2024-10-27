import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  router.push('tabs/marketplace');
};

export default Home;
