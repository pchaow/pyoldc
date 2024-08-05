import { FrappeProvider, useFrappeAuth } from 'frappe-react-sdk';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import MainPage from './pages/MainPage';
import DisabledPersonCreate from './pages/DisabledPeopleServices/DisabledPersonCreate.tsx'
import DisabledPersonEdit from './pages/DisabledPeopleServices/DisabledPersonEdit.tsx'
import DisabledPersonIndex from './pages/DisabledPeopleServices/DisabledPersonIndex.tsx'
import AlertProvider from './providers/AlertProvider';
import AuthProvider from './providers/AuthProvider';
import SupportIndex from './pages/DisabledPeopleServices/DisabledPersonSupportIndex.tsx';
import SupportEdit from './pages/DisabledPeopleServices/DisabledPersonSupportEdit.tsx';
import SupportCreate from './pages/DisabledPeopleServices/DisabledPersonSupportCreate.tsx';


function App() {

    const LoginGuard = ({ children }: React.PropsWithChildren) => {

        const auth = useFrappeAuth()
        const navigate = useNavigate()

        useEffect(() => {
            if (auth.isLoading) {

            } else {
                if (!auth.currentUser) {
                    navigate("/login")
                }
            }

        }, [auth.isLoading])

        return (
            <main>
                {children}
            </main>
        )
    }


    return (
        <div className="App">
            <NextUIProvider>
                <FrappeProvider siteName={import.meta.env.VITE_FRAPPE_URL ?? ''} socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''} >
                    <AlertProvider>
                        <AuthProvider>
                            <BrowserRouter basename={import.meta.env.VITE_BASE_PATH} >
                                <Routes>
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/register' element={<Register />} />
                                    <Route path="/" element={<LoginGuard><MainPage /></LoginGuard>} >
                                        <Route index element={<Dashboard />} />

                                        <Route path="disabledperson">DisabledPerson
                                            <Route index element={<DisabledPersonIndex />} />
                                            <Route path='create' element={<DisabledPersonCreate />} />
                                            <Route path='edit/:id' element={<DisabledPersonEdit />} />

                                            <Route path="support">
                                                <Route index element={<SupportIndex />} />
                                                <Route path=':create' element={< SupportCreate/>} />
                                                <Route path='edit/:id' element={<SupportEdit />} />
                                            </Route>

                                        </Route>

                                    </Route>
                                </Routes>
                            </BrowserRouter>
                        </AuthProvider>
                    </AlertProvider>
                </FrappeProvider >
            </NextUIProvider >
        </div >
    )
}

export default App
