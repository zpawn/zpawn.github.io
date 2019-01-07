import { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { wordsFetch } from "../store/words";

////

const mapDispatchToProps = dispatch => ({
  onFetchWords: () => dispatch(wordsFetch())
});

////

class Preload extends PureComponent {
  componentDidMount() {
    this.props.onFetchWords();
  }

  render() {
    return null;
  }
}

Preload.propTypes = {
  onFetchWords: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(Preload);
