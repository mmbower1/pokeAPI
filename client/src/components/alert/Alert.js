import React from 'react';
import PropTypes from'prop-types';
import { connect } from 'react-redux';
import './Alert.scss';

const Alert = ({ alerts }) => {
  return (
    alerts !== null && 
    alerts.length > 0 && 
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        <i className="fas fa-exclamation-circle"></i>
        {' ' + alert.msg}
      </div>
    ))
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, null)(Alert)