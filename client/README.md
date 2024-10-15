# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  const {user,token,isLoading, error} =useSelector((store)=>store.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const toast=useToast()
    let [data,setData]=useState({
        email:"",password:""
    })
    
    function HandleFormChange(e){
        setData({...data,[e.target.name]:e.target.value})
    }