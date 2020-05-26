import React from 'react';
import Modal from 'react-responsive-modal';
import '../css/main.css';

// An object containing the styles objects to style the modal, c
//an have properties 'overlay', 'modal', 'closeButton', 'closeIcon'.
const styles = {
  closeIcon: {
    color: 'red',
    borderColor: 'none',
    marginLeft: '0',
  },
  modal: {
    color: 'rgba(46, 122, 117)',
    textAlign: 'center',
    width: '100%',
    borderRadius: '1rem',
  },
  overlay: {
    background: 'rgba(46, 122, 117, 0.7)',
  },
};

export default class ReactModal extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <>
        <a
          onClick={this.onOpenModal}
          className={this.props.buttonStyle}
        >
          {this.props.buttonName}
        </a>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          styles={styles}
        >
          {this.props.content}
        </Modal>
      </>
    );
  }
}
