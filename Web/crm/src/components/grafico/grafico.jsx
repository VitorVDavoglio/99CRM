import { Chart } from "react-google-charts";

function Grafico(props){

    const options = {
        legend: props.legenda ? {} : {position: "none"}
    }
    
    return<>
        <div className="card">
            <div className="card-header">
                {props.titulo}
            </div>
            <div className="card-boy text-center">
                <Chart 
                    chartType={props.chartType}
                    data={props.dados}
                    width="100%"
                    height="350px"
                    options={options}
                    legendToggle={true}
                />

            </div>
        </div>
    
    </>
}

export default Grafico;