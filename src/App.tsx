import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.scss';
import RenderRouter from './route/route';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
