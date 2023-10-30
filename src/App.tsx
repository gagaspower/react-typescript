import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import Test from './pages/Test';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})



const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Test />
    </QueryClientProvider>
  );
};

export default App;
