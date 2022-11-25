import{render, screen, cleanup} from '@testing-library/react';
import CreatePrediction from '../../prediction/CreatePrediction';

test("should render CreatePrediction component", () =>{
    render(<CreatePrediction />);
    //const prediction_element = screen.getByTestId("prediction-test");
    //expect(prediction_element).toBeInTheDocument();
})
