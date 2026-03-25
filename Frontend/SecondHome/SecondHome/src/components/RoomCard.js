import React from "react";
import "../styles/room.css";

function RoomCard({title,price}){

return(
<div className="room-card">

<h3>{title}</h3>

<p>{price}</p>

<button>Book Now</button>

</div>
)

}

export default RoomCard;