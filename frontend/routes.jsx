import Comments from "./src/Components/Comments/Comments";
import Offs from "./src/Components/Offs/Offs";
import Orders from "./src/Components/Orders/Orders";
import Products from "./src/Components/Products/Products";
import Users from "./src/Components/Users/Users";

let routs = [
    { path: "/products", element: <Products /> },
    { path: "/comments", element: <Comments /> },
    { path: "/users", element: <Users /> },
    { path: "/orders", element: <Orders /> },
    { path: "/offs", element: <Offs /> }
]
export default routs 