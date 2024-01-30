import { render, screen, cleanup } from "@testing-library/react";
import PlannerCreate from '../../pages/PlannerCreate.js';

test('test calendar component', () => {
  render(<PlannerCreate />);
  const calendar = screen.getByTestId('calendar');
  
  expect(calendar).toBeInTheDocument();
}) 
