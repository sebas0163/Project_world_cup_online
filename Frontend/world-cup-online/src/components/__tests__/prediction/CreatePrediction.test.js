import ReactDOM from 'react-dom';
import React from 'react';
import CreatePrediction from '../../prediction/CreatePrediction';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { userDummy, matchDummy } from '../utils/dummies';
const mockChildComponent = jest.fn();


jest.mock("../../prediction/CreatePrediction", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});

test("should render CreatePrediction component", () =>{
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
                     <CreatePrediction/>
                    </BrowserRouter>,div)
    //render(<CreatePrediction user={user} match={match} mode={userType}/>)
});

test("If ParentComponent is passed open and has data, ChildComponent is called with prop open and data", () => {
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
