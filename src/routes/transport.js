'use strict';const{Router}=require('express');const e=require('../services/transport-engine');const r=Router();
r.post('/v1/transport/dispatch',(q,s)=>{const c=e.dispatch(q.body);s.status(201).json({status:'dispatched',convoy:c})});
r.post('/v1/transport/arrive/:id',(q,s)=>{const c=e.arrive(q.params.id);if(!c)return s.status(404).json({error:'Convoy not found'});s.json({status:'arrived',convoy:c})});
r.post('/v1/transport/route',(q,s)=>{const{from,to,waypoints,hazards}=q.body;if(!from||!to)return s.status(400).json({error:'from and to required'});s.status(201).json({status:'route_mapped',route:e.mapRoute(from,to,{waypoints,hazards})})});
r.get('/v1/transport/stats',(_,s)=>s.json(e.getStats()));
r.get('/v1/transport/convoys',(_,s)=>s.json({convoys:e.listConvoys()}));
r.get('/v1/transport/vehicles',(_,s)=>s.json({vehicles:e.VEHICLE_TYPES}));
module.exports=r;
