import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";

function Menu(props){

    const linkBlue = "nav-link align-middle px-1 border border-primary"
    // TODO arrumar a exibição do link para aparecer somente 
    const linkBlack = "nav-link align-middle px-1 link-secondary"

    return <>
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline">
                    <img src={logo} className="img-logo" />
                </span>
            </a>

            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start " id="menu">

                <li className="nav-item">
                    <Link to="/dashboard" className={props.page === "dashboard" ? linkBlue : linkBlack}>
                        <i className="fs-4 bi bi-bar-chart"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/negocios" className={props.page === "negocios" ? linkBlue : linkBlack}>
                        <i className="fs-4 bi-wallet2"></i> <span className="ms-1 d-none d-sm-inline">Negócios</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="#" className={props.page === "atividades" ? linkBlue : linkBlack}>
                        <i className="fs-4 bi-calendar4-week"></i> <span className="ms-1 d-none d-sm-inline">Atividades</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="#" className={props.page === "config" ? linkBlue : linkBlack}>
                        <i className="fs-4 bi-gear"></i> <span className="ms-1 d-none d-sm-inline">Configurações</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="#" className={props.page === "config" ? linkBlue : linkBlack}>
                        <i className="fs-4 bi-box-arrow-left"></i> <span className="ms-1 d-none d-sm-inline">Desconectar</span>
                    </Link>
                </li>
            </ul>
        </div>
    </>
}

export default Menu; 