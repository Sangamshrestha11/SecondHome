import React from "react";
import RoomCard from "../components/RoomCard";

function Rooms(){

return(
<div>

<h2 style={{textAlign:"center"}}>Available Rooms</h2>

<RoomCard
title="Single Room"
price="5000/month"
/>

<RoomCard
title="Double Sharing"
price="3500/month"
/>

<RoomCard
title="Triple Sharing"
price="2500/month"
/>

</div>
)
}

export default Rooms;