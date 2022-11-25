import ReactDOM from 'react-dom';
import React from 'react';
import CreatePrediction from '../../prediction/CreatePrediction';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { userDummy, matchDummy } from '../utils/dummies';
const mockChildComponent = jest.fn();

afterEach(() => {
  cleanup(); 
})

jest.mock("../../prediction/CreatePrediction", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});

test("should render CreatePrediction component", () =>{
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
                     <CreatePrediction/>
                    </BrowserRouter>,div)
    
});

test("if ParentComponent is passed open and has data, ChildComponent is called with prop open and data", () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
        <CreatePrediction user = {userDummy()} match = {matchDummy()} mode = "user" />
       </BrowserRouter>,div)
  
    // Check that the Jest mock function is called with an object.
    // Use 'expect.objectContaining'
    expect(mockChildComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        user: userDummy(),
        match: matchDummy(),
        mode : "user"
      }) 
    ); 
  });

describe("Button Component" ,() => {
  const setToggle= jest.fn(); 
  const div = document.createElement('div');
  render(<BrowserRouter>
      <CreatePrediction user = {userDummy()} match = {matchDummy()} mode = "user" />
      </BrowserRouter>)

  const button = screen.queryByTestId("button-prediction"); 
    
  // Test 1n 
  test("Button Rendering", () => {
      expect(button).toBeInTheDocument(); 
  })

  // Test 2 
  test("Button Text", () => {
      expect(button).toHaveTextContent("Click Me!"); 
  })
})