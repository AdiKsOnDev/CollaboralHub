import { render, screen, cleanup } from "@testing-library/react";
import ProfilePicture from "../ProfilePicture.js";

test('test calendar component', () => {
  render(<ProfilePicture />);
  const calendar = screen.getByTestId('PFP');
  
  expect(calendar).toBeInTheDocument();
}) 
