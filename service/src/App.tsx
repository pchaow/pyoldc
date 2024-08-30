import { FrappeProvider, useFrappeAuth } from 'frappe-react-sdk';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import MainPage from './pages/MainPage';
import DisabledPersonCreate from './pages/disabledPeopleServices/disabledPeople/DisabledPersonCreate.tsx'
import DisabledPersonIndex from './pages/disabledPeopleServices/disabledPeople/DisabledPersonIndex.tsx'
import AlertProvider from './providers/AlertProvider';
import AuthProvider from './providers/AuthProvider';
import SupportIndex from './pages/disabledPeopleServices/disabledPersonSupport/DisabledPersonSupportIndex.tsx';
import SupportEdit from './pages/disabledPeopleServices/disabledPersonSupport/DisabledPersonSupportEdit.tsx';
import SupportCreate from './pages/disabledPeopleServices/disabledPersonSupport/DisabledPersonSupportCreate.tsx';
import DisabledPersonData from './pages/disabledPeopleServices/disabledPeople/disabledPeopleData/DisabledPersomData.tsx';
import DisabledPersomDataGeneralInformation from './pages/disabledPeopleServices/disabledPeople/disabledPeopleData/DisabledPersomDataGeneralInformation.tsx';
import DisabledPersomDataHealthFrom from './pages/disabledPeopleServices/disabledPeople/disabledPeopleData/DisabledPersomDataHealthFrom.tsx';
import DisabledPersomDataProblemStatusFrom from './pages/disabledPeopleServices/disabledPeople/disabledPeopleData/DisabledPersomDataProblemStatusFrom.tsx';


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

                                        <Route path="disabledperson">
                                            <Route index element={<DisabledPersonIndex />} />
                                            <Route path='create' element={<DisabledPersonCreate />} />

                                            <Route path="data/:id">
                                                <Route index element={<DisabledPersonData />} />
                                                <Route path='generalInformation/:id' element={<DisabledPersomDataGeneralInformation />} />
                                                <Route path='health/:id' element={<DisabledPersomDataHealthFrom />} />
                                                <Route path='problemStatus/:id' element={<DisabledPersomDataProblemStatusFrom />} />
                                            </Route>

                                            <Route path="support">
                                                <Route index element={<SupportIndex />} />
                                                <Route path=':create' element={< SupportCreate />} />
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
