import React from "react";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

////

function getSteps() {
  return ["Select campaign settings", "Create an ad group", "Create an ad"];
}

class HorizontalNonLinearAlternativeLabelStepper extends React.Component {
  state = {
    activeStep: 0,
    completed: new Set(),
    skipped: new Set()
  };

  totalSteps = () => {
    return getSteps().length;
  };

  handleSkip = () => {
    const { activeStep } = this.state;

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped
      };
    });
  };

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step
    });
  };

  handleComplete = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const completed = new Set(this.state.completed);
    completed.add(this.state.activeStep);
    this.setState({
      completed
    });

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== this.totalSteps() - this.skippedSteps()) {
      this.handleNext();
    }
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set()
    });
  };

  skippedSteps() {
    return this.state.skipped.size;
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  isStepComplete(step) {
    return this.state.completed.has(step);
  }

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  render() {
    return (
      <div>
        <Stepper alternativeLabel nonLinear>
          <Step key={0} active={false}>
            <StepButton onClick={this.handleStep(0)} completed={true} />
          </Step>

          <Step key={1} active={true}>
            <StepButton onClick={this.handleStep(1)} completed={false} />
          </Step>

          <Step key={2} active={false}>
            <StepButton onClick={this.handleStep(2)} completed={false} />
          </Step>

          <Step key={3} active={false}>
            <StepButton onClick={this.handleStep(3)} completed={false} />
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default HorizontalNonLinearAlternativeLabelStepper;
