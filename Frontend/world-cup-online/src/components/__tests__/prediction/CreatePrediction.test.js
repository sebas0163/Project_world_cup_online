import ReactDOM from 'react-dom';
import React from 'react';
import CreatePrediction from '../../prediction/CreatePrediction';

import { BrowserRouter } from 'react-router-dom';

test("should render CreatePrediction component", () =>{
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
                     <CreatePrediction/>
                    </BrowserRouter>,div)

})
