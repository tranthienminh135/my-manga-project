import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Suspense } from 'react';
import RenderRouter from './route/route';

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense>
                <RenderRouter />
            </Suspense>
        </QueryClientProvider>
    );
}

export default App;
