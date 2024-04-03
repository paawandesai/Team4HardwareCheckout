
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login"
import Projects from "./Projects";
import ProjectMgmt from "./ProjectMgmt";
import Project from "./Project";

// React-Router 
function App() {
  return (
    <div>
       <Router>
        <Routes>
          <Route path="/" exact element={<Login/>}></Route>
          <Route path="/projects/" element={ <Projects/>}></Route>
          <Route path="/projectMgmt/" element={ <ProjectMgmt/>}></Route>
          <Route path="/project/:projectID" element={ <Project/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}



// The following two functions are the example of React-Router 
// function Layout() {
//   return (
//     <>
//       <Navbar bg="dark" expand="sm" variant="dark">
//         <Nav>
//         <LinkContainer to="/">
//           <Nav.Link>Home</Nav.Link>
//         </LinkContainer>
//         <LinkContainer to="/about">
//           <Nav.Link>About</Nav.Link>
//         </LinkContainer>
//         <LinkContainer to="/products">
//           <Nav.Link>Products</Nav.Link>
//         </LinkContainer>
//         </Nav>
//       </Navbar>
//       <main>

//         <Outlet></Outlet>
//       </main>

    
//     </>
//     );
// }

// This function is the example of Layout for React-Router-Hooks deck
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route path="about" element={<About />} />
//           <Route path="products" element={<Products />} />
//           <Route path="*" element={<PageNotFound />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }


// These two functions are created for React-Router : 
// function User() {
//   const { name } = useParams();
//   return <div>User Name: {name}</div>;
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/home" element={<Home />}></Route>
//         <Route path="/users/:name" element={<User />}></Route>
//       </Routes>
//     </Router>
//   );
// }



export default App;
