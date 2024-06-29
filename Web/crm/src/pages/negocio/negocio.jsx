import Menu from "../../components/Menu/menu.jsx";
import Busca from "../../components/busca/busca.jsx";
import NegocioCad from "../negocio-cad/negocio-cad.jsx";

import DataTable from "react-data-table-component";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from "../../services/api.js";
import { useEffect, useState } from "react";

function Negocio(){

    const [etapas, setEtapas] = useState([]);
    const [etapa, setEtapa] = useState("");
    const [qtd_reg_pagina, setQtdRegPagina] = useState(10);
    const [dados, setDados] = useState([]);
    const [totalRegistros, setTotalRegistros] = useState(0);

    const columns = [        
        {
            name: 'Código',
            selector: row => row.id_negocio,
            sortable: true,
            width: "120px",
        },
        {
            name: 'Descrição',
            selector: row => row.descricao,
            sortable: true,
            compact: true
         },
        {
          name: 'Etapa',
          selector: row => row.etapa,
          sortable: true
        },
        {
          name: 'Empresa',
          selector: row => <>
                        <p className="mb-1">{row.empresa}</p>
                        <p className="mb-1">Contato: {row.contato}</p>
                    </>,
          sortable: true,
          compact: true
       },
       {
        name: 'Dados Contato',
        selector: row => <>
                    <p className="mb-1">E-mail: {row.email}</p>
                    <p className="mb-1">Fone: {row.fone}</p>
                </>,
        sortable: true
        },
        {
            name: 'Vl. Estimado',
            selector: row => row.valor,
            sortable: true,
            right: true,
            format: row => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.valor)
         },
        {
            cell: (row) => <>
            <button onClick={() => WhatsApp(row.fone)} className={row.fone ? "btn btn-sucess" :"btn btn-success disabled"}><i className="bi bi-whatsapp"></i></button>
            <button onClick={() => Editar(row.id_negocio)} className="btn btn-primary ms-3"><i className="bi bi-pencil-square"></i></button>
            <button onClick={() => Excluir(row.id_negocio)} className="btn btn-danger ms-3"><i className="bi bi-trash3-fill"></i></button>
            </>,    
            width: "200px",
            right: true
       }
    ];

    const paginationOptions = {
        rowsPerPageText: 'Registros por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    function WhatsApp(fone){
        const url = "https://web.whatsapp.com/send?phone=55" + fone;
        window.open(url, "_blank", "noreferrer")
    };

    function Excluir(id){
        confirmAlert({
            title: 'Exclusão',
            message: 'Confirma exclusão do negócio?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        api.delete("/negocios/" + id)
                        .then((resp) => {
                            ListarNegocios(localStorage.getItem("id_usuario"), etapa, 1, qtd_reg_pagina);
                        })
                        .catch((err) => {
                            alert("Erro ao excluir negócio");
                        })
                    }
                },
                {
                    label: 'Não',
                    onClick: () => {}
                }
            ]
        });
    };

    function Editar(id){
        const event = new CustomEvent("openSideBar", { detail: {
            operacao: "edit",
            id_negocio: id
        }
        });

        window.dispatchEvent(event);
    };

    function Novo(){
        const event = new CustomEvent("openSideBar", { detail: {
            operacao: "new"
        }
        });

        window.dispatchEvent(event);
    };

    function ComboEtapas(){
        api.get("etapas")
        .then((resp) => {
            setEtapas(resp.data);
        })
        .catch((err) => {
            setEtapas({
                "valor_mes": 0,
                "qtd_mes":0,
                "valor_dia":0,
                "qtd_dia":0
            });
            alert("Erro ao carregar indicadores");
        })
    }

    function ListarNegocios(id_usuario, etapa, pagina, qtd_reg_pagina){

        console.log({id_usuario, etapa, pagina, qtd_reg_pagina})
        
        api.get("/negocios", {params: {id_usuario, etapa, pagina, qtd_reg_pagina}})
        .then((resp) => {
            setTotalRegistros(resp.data.totalRegistros);
            setDados(resp.data.dados);
        })
        .catch((err) => {
            setTotalRegistros(0);
            setDados([]);
            alert("Erro ao carregar indicadores");
        })
    }

    function ChangeEtapa(e){
        setEtapa(e.target.value);

        ListarNegocios(localStorage.getItem("id_usuario"), e.target.value, 1, qtd_reg_pagina);
    }

    function ChangePerRows(newQtd, page){
        ListarNegocios(localStorage.getItem("id_usuario"), etapa, page, newQtd);
        setQtdRegPagina(newQtd);
    }

    function ChangePage(page){
        ListarNegocios(localStorage.getItem("id_usuario"), etapa, page, qtd_reg_pagina);
    }

    function RefreshDados(){
        ListarNegocios(localStorage.getItem("id_usuario"), etapa, 1, qtd_reg_pagina);
    }

    useEffect(() => {
        ComboEtapas();

        ListarNegocios(localStorage.getItem("id_usuario"), etapa, 1, qtd_reg_pagina);
    }, [])



    
    return<>

        <NegocioCad onClose={RefreshDados}/>

        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
                    <Menu page="negocios"/>
                </div>

                <div className="col py-3 me-3">
                    <div className="mb-5">
                        <Busca texto="Busca por negócios"/>
                    </div>

                    <div className="bg-white p-4 rounded-4 border">
                        <div className="d-flex justify-content-between mb-3">
                            <div className="d-inline-flex">
                                <h2>Negócios</h2>

                                <div className="form-control ms-4">
                                    <select name="etapa" id="etapa" onChange={ChangeEtapa}>
                                        <option value="">Todas as etapas</option>
                                        {
                                            etapas.map((item) => {
                                                return <option key={item.etapa} value={item.etapa}>{item.etapa}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <button onClick={Novo} className="btn btn-primary ms-4"><i className="bi bi-plus-lg me-2"></i>Novos negócios</button>
                        </div>

                        <DataTable columns={columns}
                                   data={dados}
                                   pagination={true}
                                   paginationComponentOptions={paginationOptions}
                                   noDataComponent={<p className="no-data-found">Nenhum registro encontrado</p>}

                                   paginationServer={true}
                                   paginationTotalRows={totalRegistros}
                                   onChangeRowsPerPage={ChangePerRows}
                                   onChangePage={ChangePage}
                        />

                    </div>

                    
                    <div className="row">
                        
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Negocio;