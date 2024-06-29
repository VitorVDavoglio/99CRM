import Menu from "../../components/Menu/menu.jsx";
import Busca from "../../components/busca/busca.jsx";
import Indicador from "../../components/indicador/indicador.jsx";
import Grafico from "../../components/grafico/grafico.jsx";
import { useEffect, useState } from "react";
import api from "../../services/api.js";

function Dashboard(){

    const [dadosIndicadroes, setDadosIndicadores] = useState({
        "valor_mes": 0,
        "qtd_mes":0,
        "valor_dia":0,
        "qtd_dia":0
    });
    const [dadosAnual, setDadosAnual] = useState([["Mês", "Valor"], [0, 0]]);


    function MontarGrafAnual(){
        // GET do server
        api.get("/dashboard/negocios")
        .then((resp) => {
            setDadosAnual(resp.data);
        })
        .catch((err) => {
            setDadosAnual(["Mês", "Valor"], [0, 0]);
            alert("Erro ao carregar gráfico");
        })
    }

    function MontarIndicadores(){
        api.get("/dashboard/resumos?id_usuario=" + localStorage.getItem("id_usuario"))
        .then((resp) => {
            setDadosIndicadores(resp.data);
        })
        .catch((err) => {
            setDadosIndicadores({
                "valor_mes": 0,
                "qtd_mes":0,
                "valor_dia":0,
                "qtd_dia":0
            });
            alert("Erro ao carregar indicadores");
        })
    }

    function MontarDashboard(){
        MontarIndicadores();
        MontarGrafAnual();
    }

    useEffect(() => {
        localStorage.setItem("id_usuario", 1);
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