import React, { Component, Fragment } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    closeHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          {this.state.error ? (
            <Modal show={this.state.error} cancelOrder={this.closeHandler}>
              {this.state.error.message}
            </Modal>
          ) : null}
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};
export default withErrorHandler;
