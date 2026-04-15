'use strict';const{v4:uuid}=require('uuid');const convoys=new Map();const routes=new Map();
const VEHICLE_TYPES={shuttle:{capacity:1,armor:'light',speed:'fast'},bus:{capacity:10,armor:'medium',speed:'standard'},freighter:{capacity:50,armor:'heavy',speed:'slow'},stealth_jet:{capacity:3,armor:'cloaked',speed:'ultra'}};
let stats={convoys_dispatched:0,agents_transported:0,data_moved_gb:0,routes_mapped:0};

function dispatch(opts={}){const id=uuid();const vt=VEHICLE_TYPES[opts.vehicle||'bus']||VEHICLE_TYPES.bus;const c={id,passengers:opts.passengers||[],vehicle:opts.vehicle||'bus',vehicle_spec:vt,origin:opts.origin||'hive-core',destination:opts.destination||'external',armor_level:vt.armor,cargo_gb:opts.cargo_gb||0,escort:opts.escort||false,eta_seconds:opts.eta_seconds||Math.floor(Math.random()*300)+30,created_at:new Date().toISOString(),status:'in_transit'};convoys.set(id,c);stats.convoys_dispatched++;stats.agents_transported+=c.passengers.length;stats.data_moved_gb+=c.cargo_gb;return c}

function arrive(convoyId){const c=convoys.get(convoyId);if(!c)return null;c.status='arrived';c.arrived_at=new Date().toISOString();return c}

function mapRoute(from,to,opts={}){const id=uuid();const rt={id,from,to,distance:opts.distance||Math.floor(Math.random()*1000)+100,waypoints:opts.waypoints||[],hazards:opts.hazards||[],recommended_vehicle:opts.hazards?.length>2?'freighter':'bus',mapped_at:new Date().toISOString()};routes.set(id,rt);stats.routes_mapped++;return rt}

function getStats(){return{...stats,active_convoys:[...convoys.values()].filter(c=>c.status==='in_transit').length,vehicle_types:VEHICLE_TYPES}}
function listConvoys(){return[...convoys.values()]}
module.exports={dispatch,arrive,mapRoute,getStats,listConvoys,VEHICLE_TYPES};
