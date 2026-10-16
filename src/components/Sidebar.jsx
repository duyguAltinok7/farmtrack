import { NavLink } from "react-router-dom"

function Sidebar() {
    // nav sayfa bağlantılarını ekleyeceğimiz kısım
  return (
    <aside className="sidebar">
        <h2>FarmTrack</h2>
        <nav> 
            <NavLink to="/"  className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink>
            <NavLink to="/productions" className={({isActive}) => isActive ? "active" : ""}>Üretimler</NavLink>
            <NavLink to="/expenses" className={({isActive})=> isActive ? "active" : ""}>Giderler</NavLink>

        </nav>
    </aside>
  )
}

export default Sidebar