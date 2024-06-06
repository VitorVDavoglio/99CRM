import express from "express";
import cors from "cors";
import basicAuth from "express-basic-auth";

import routeEtapa from "./routes/route.etapa.js";
import routeNegocio from "./routes/route.negocio.js";
import routeDashboard from "./routes/route.dashboard.js"

const app = express();

//Middleware JSON
app.use(express.json());

//Middleware CORS
app.use(cors());

//Middleware Basic Auth
app.use(basicAuth({
    authorizer: function(usuario, senha){
        return basicAuth.safeCompare(usuario, "root") && basicAuth.safeCompare(senha, "admin");
    }
}));


//Rotas
app.use(routeEtapa);
app.use(routeNegocio);
app.use(routeDashboard);


const port = 3001;

app.listen(port, () => {
    console.log("Servidor rodando na porta: " + port);
});