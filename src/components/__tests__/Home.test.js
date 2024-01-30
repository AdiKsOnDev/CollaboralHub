 import { render, screen, cleanup } from "@testing-library/react";
 import Home from '../../pages/Home.js';
 
 test('Test Canvases list', () => {
   render(<Home />);
   const canvases = screen.getByTestId('canvases');
   
   expect(canvases).toBeInTheDocument();
 }) 

 test('Test Navbar', () => {
   render(<Home />);
   const navbar = screen.getAllByTestId('navbar');

   for (let i=0 ; i < navbar.length ; i++) {
     expect(navbar[i]).toBeInTheDocument();
   }
 })

 test('Test StatusBar', () => {
   render(<Home />);
   const statusBar = screen.getByTestId('statusbar');

   expect(statusBar).toBeInTheDocument();
 })
