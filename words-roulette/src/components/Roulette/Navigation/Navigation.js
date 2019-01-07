import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

import { createArray } from "../../../core/Utilitiy";
import { rouletteChangeStep } from "../../../store/roulette";

////

const mapStateToProps = state => ({
  activeStep: state.roulette.activeStep,
  count: state.rouletteSettings.count
});

const mapDispatchToProps = dispatch => ({
  onChangeStep: step => dispatch(rouletteChangeStep(step))
});

////

const navigation = ({ activeStep, count, onChangeStep }) => (
  <Stepper alternativeLabel nonLinear>
    {createArray(count).map(step => (
      <Step key={step} active={step === activeStep}>
        <StepButton onClick={() => onChangeStep(step)} completed={false} />
      </Step>
    ))}
  </Stepper>
);

navigation.propTypes = {
  count: PropTypes.number,
  activeStep: PropTypes.number,
  onChangeStep: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigation);
