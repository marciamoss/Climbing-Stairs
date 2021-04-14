import React, { Component } from "react";   
import { Input, FormBtn } from "../../components/Form";
import PopUps from "../../components/PopUps";

class StairsCombination extends Component {
    constructor() {
      super();
      this.state = {
        totalSteps: "",
        steps: 0,
        stepsCombination: null,
        show: false,
        handleClose() {
        this.setState({ show: false });
        },
        handleShow() {
        this.setState({ show: true });
        }
      };
    }

    // Captures the values from input box to state after the validation
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        },()=>{
            this.setState({steps: Number(this.state.totalSteps), stepsCombination: null}) ;
        });
    };

    //calculates steps
    async calculateSteps(steps) {
        let handleCloseCopy = this.state.handleClose.bind(this);
        if (isNaN(steps) || !(Number.isInteger(steps)) || (steps < 0)) {
            this.setState({show:true, handleClose: handleCloseCopy});
        }
        else {
            let stepsCombination = await this.getCount(steps);
            this.setState({stepsCombination: stepsCombination, show:true, handleClose: handleCloseCopy});
        }
    };

    getCount(steps) {
        if (steps === 0 || steps === 1) {
            return 1;
        } else if (steps === 2) {
            return 2;
        } else {
            return this.getCount(steps - 2) + this.getCount(steps - 1);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1 style={{color:"orange", fontWeight:"bold" ,textAlign:"center"}}>Combination of steps</h1>
                    </div>
                </div>
                <form> 
                    <PopUps show={this.state.show} handleClose={this.state.handleClose} steps={this.state.steps} stepsCombination={this.state.stepsCombination}>

                    </PopUps>
                    <div className="row mt-5">
                        <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <label style={{fontWeight: "bold", color:"orange"}}>Enter the total number of steps</label>
                            <p style={{fontWeight: "bold", color:"yellow"}}>(For steps above 40 the response takes a while, for testing use maximum steps below 40)</p>
                            <Input
                                value={this.state.totalSteps}
                                onChange={this.handleInputChange}
                                name="totalSteps"
                                placeholder="Total Steps" 
                            />
                        </div>
                    </div>
                        <div className="row">
                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                            
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <FormBtn 
                                    disabled={!this.state.totalSteps}
                                    data-value={this.state.totalSteps}
                                    label="totalSteps"
                                    onClick=
                                    {(event) => 
                                        {
                                        event.preventDefault();
                                        this.calculateSteps(this.state.steps)
                                        }
                                    } 
                                >
                                    Enter
                                </FormBtn>
                            </div>
                        </div>
                </form>

            </div>
        );
    }
}

export default StairsCombination;