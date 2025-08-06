import React from 'react'
import './LocationOptions.css'
import {Link} from "react-router-dom";
const LocationOptions = () => {
    return (
			<>
			
				<div className="flex parent-location-class">
					<ul className="options">
						<li>
							<Link
								className="tede"
								style={{ textDecoration: "none" }}
								to='/restaurant'
							>
								Restaraunt
							</Link>
						</li>
						<li>
							<Link
								className="tede"
								style={{ textDecoration: "none" }}
								to="/GasStations"
							>
								Gas Stations
							</Link>
						</li>
						<li>
							<Link
								className="tede"
								style={{ textDecoration: "none" }}
								to="/Motels"
							>
								Motels
							</Link>
						</li>
						<li>
							<Link
								className="tede"
								style={{ textDecoration: "none" }}
								to="/Hospitals"
							>
								Hospitals
							</Link>
						</li>
					</ul>
				</div>
			</>
		);
}

export default LocationOptions



// // 