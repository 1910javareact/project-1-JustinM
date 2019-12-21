import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header id='navHeader'>
        <div>
          <h1>Brooklyn's 99th Precinct Reimbursement</h1>
        </div>
        <Link to='/' className='navLink'>Login</Link> | <Link to='/user' className='navLink'>User</Link> | <Link to='/reimbursement' className='navLink'>Reimbursements</Link>
      </header>
    </div>
  );
}

export default Header;