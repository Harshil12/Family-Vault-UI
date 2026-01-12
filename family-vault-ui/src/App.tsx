import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Family from "./pages/Family";
import FamilyMembers from "./pages/FamilyMember";
import Documents from "./pages/Document";

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/families" element={<Family />} />
    <Route path="/families/:familyId/members" element={<FamilyMembers />} />
   <Route  path="/family-members/:familyMemberId/documents" element={<Documents />}
/>

  </Routes>
);

export default App;
