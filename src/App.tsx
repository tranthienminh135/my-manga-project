import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Suspense } from 'react';
import RenderRouter from './route/route';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCmYIyaCXUNns8tDmeMH5l8oJVDq8-G6mE',
    authDomain: 'manga-2416d.firebaseapp.com',
    projectId: 'manga-2416d',
    storageBucket: 'manga-2416d.appspot.com',
    messagingSenderId: '126846395551',
    appId: '1:126846395551:web:06780760f5a1117e0baeaa',
    measurementId: 'G-7JQCZCVE6L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

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
