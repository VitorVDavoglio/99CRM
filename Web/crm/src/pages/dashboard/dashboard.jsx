import Menu from "../../components/Menu/menu.jsx";
import Busca from "../../components/busca/busca.jsx";
import Indicador from "../../components/indicador/indicador.jsx";
import Grafico from "../../components/grafico/grafico.jsx";

function Dashboard(){
    return <>
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
                    <Menu page="dashboard"/>
                </div>

                <div className="col py-3 me-3">
                    <div className="mb-5">
                        <Busca texto="Busca por negócios"/>
                    </div>

                    <div className="d-flex justify-content-between">
                        <h1>Dashboard</h1>
                        <button className="btn btn-primary">Atualizar</button>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-3 mt-4">
                            <Indicador 
                                titulo="Negócios no mês"
                                valor="R$ 19.000,00"
                                rodape="12 atividades"
                            />
                        </div>

                        <div className="col-md-3 mt-4">
                            <Indicador 
                                titulo="Atividades para hoje"
                                valor="R$ 3.150,00"
                                rodape="6 atividades"
                            />
                        </div>

                        <div className="col-12 mt-5">
                            <Grafico
                                titulo="Vendas Anual"
                                chartType="Line"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard; 