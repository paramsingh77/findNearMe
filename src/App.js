import React from 'react'
import Header from '../src/components/Header';
import Title from '../src/components/Title';
import LocationOptions from '../src/components/LocationOptions';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navigation from "./components/Navigation";
import Restaraunt from '../src/components/Restaraunt';
import GasStations from '../src/components/GasStations';
import Hospitals from '../src/components/Hospitals';
import Motels from '../src/components/Motels';
import Rest from '../src/subComponents/Rest';
import ShopNeighbour from '../src/components/ShopNeighbour';
import Empty from '../src/components/Empty'
import Hos from '../src/subComponents/Hos';
import Leftcomponent from '../src/subComponents/Leftcomponent';
import './App.css';
import GassStations from './subComponents/GassStations';
function App() {
  return (
		<>
			{/* <LandingPage/> */}
			<Router>
				<Header />
				<Title />
				<LocationOptions />
				<Routes>
         		 <Route path='/restaurant' element={<Restaraunt />} />
         		 {/* <Route path='/GasStations' element={<GasStations />} /> */}
         		 <Route path='/Hospitals' element={<Hospitals />} />
         		 <Route path='/Motels' element={<Motels />} />
				 <Route path='/Leftcomponent' element={<Leftcomponent/>}/>
				</Routes>
				
            <Rest/>
			<ShopNeighbour/>
			<Hos/>
			<GassStations/>
			<Empty/>
		</Router>
		</>
	);
}

export default App;
