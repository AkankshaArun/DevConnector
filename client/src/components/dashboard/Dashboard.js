import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 class='large text-primary'>Dashboard</h1>
      <p class='lead'>
        <i class='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
        </>
      ) : (
        <>
          <p>No profile, create one below</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);