import { createRoot } from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import store from './redux/store.js'
import { RouterProvider } from 'react-router-dom'
import router from './routes/AllRoutes.jsx'

createRoot(document.getElementById('root')).render(
   
   <Provider store={store}>
    <ChakraProvider>
            <RouterProvider router={router} />
    </ChakraProvider>
    </Provider>
)