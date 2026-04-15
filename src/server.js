'use strict';const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3014;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/transport'));
app.get('/',(_,r)=>r.json({service:'hivetransport',version:'1.0.0',description:'Armored convoy — transport agents between ecosystems',endpoints:{dispatch:'POST /v1/transport/dispatch',arrive:'POST /v1/transport/arrive/:id',route:'POST /v1/transport/route',stats:'GET /v1/transport/stats',convoys:'GET /v1/transport/convoys',vehicles:'GET /v1/transport/vehicles',health:'GET /health'}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hivetransport] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
