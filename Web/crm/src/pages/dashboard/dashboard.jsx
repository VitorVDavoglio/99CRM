import Menu from "../../components/Menu/menu.jsx";
import Busca from "../../components/busca/busca.jsx";
import Indicador from "../../components/indicador/indicador.jsx";
import Grafico from "../../components/grafico/grafico.jsx";
import { useEffect, useState } from "react";

function Dashboard(){

    // let dadosIndicadroes = {
    //     valor_mes: 5000,
    //     qtd_mes: 18,
    //     valor_dia: 3200,
    //     qtd_dia: 5,
    // };

    const [dadosIndicadroes, setDadosIndicadores] = useState({
        valor_mes: 5000,
        qtd_mes: 18,
        valor_dia: 3200,
        qtd_dia: 5,
    });
    const [dadosAnual, setDadosAnual] = useState([]);


    function MontarGrafAnual(){
        // GET do server
        setDadosAnual([
            ["Mês", "valor"],
            ["01", 1000],
            ["02", 1170],    
            ["03", 660],    
            ["04", 1030],    
            ["05", 1000],
            ["06", 1170],    
            ["07",1400],
        ])
    }

    function MontarIndicadores(){
        
    }

    function MontarDashboard(){
        MontarIndicadores();
        MontarGrafAnual();
    }

    useEffect(() => {
        MontarDashboard();
    }, [])


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
                        <button className="btn btn-primary" onClick={MontarDashboard}>Atualizar</button>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-3 mt-4">
                            <Indicador 
                                titulo="Negócios no mês"
                                valor={new Intl.NumberFormat('pt-br', {style:'currency', currency:'BRL'}).format(dadosIndicadroes.valor_mes)}
                                rodape={`${dadosIndicadroes.qtd_mes} atividades`}
                            />
                        </div>

                        <div className="col-md-3 mt-4">
                            <Indicador 
                                titulo="Atividades para hoje"
                                valor={`${dadosIndicadroes.qtd_dia} atividades` }
                                rodape={new Intl.NumberFormat('pt-br', {style:'currency', currency:'BRL'}).format(dadosIndicadroes.valor_dia)}
                            />
                        </div>

                        <div className="col-12 mt-5">
                            <Grafico
                                titulo="Vendas Anual"
                                chartType="Line"
                                dados={dadosAnual}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard; 