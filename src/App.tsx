import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Suspense } from 'react';
import RenderRouter from './route/route';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
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
