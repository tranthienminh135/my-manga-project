import { Suspense } from 'react';
import './App.scss';
import RenderRouter from './route/route';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function App() {
    return (
        <div>
            <Suspense>
                <RenderRouter />
            </Suspense>
        </div>
    );
}

export default App;
