import { useState, useEffect } from 'react';
import { useAddNewAdminMutation } from '../../features/admins/adminsApiSlice';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AdminCreate = () => {
  const { roles } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if(!roles.includes('superadmin')) {
      navigate('/home');
    }
  }, [roles]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminRole, setAdminRole] = useState(true);
  const [superadminRole, setSuperadminRole] = useState(false);

  const [addNewAdmin, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewAdminMutation();

  const canSave = username.length >= 4 && password.length >= 8;
  console.log(canSave);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password, adminRole, superadminRole);
    if (canSave) {
      try {
        const { success } = await addNewAdmin({ username, password, adminRole, superadminRole }).unwrap()
        setUsername('');
        setPassword('');
        setAdminRole(true);
        setSuperadminRole(false);
        navigate('/home');
      }
      catch (err) {
        console.log(err)
        setPassword('');
      }
    }
  }

  return (
    <form onSubmit={e => handleSubmit(e)} className='form container'>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group">
          <label htmlFor="username">username</label>
          <input 
            value={username}
            onChange={e=>setUsername(e.target.value)}
            id="username" 
            type="text" 
            autoComplete="off" 
            required className={`form-control floating ${username.length && (username.length >= 4 ? 'is-valid' : 'is-invalid' )}`} />
          </div>
          <div className="form-group">
          <label htmlFor="password">password</label>
          <input 
            value={password}
            onChange={e=>setPassword(e.target.value)}
            id="password" 
            type="text" 
            autoComplete="off" 
            required 
            required className={`form-control floating mb-3 ${password.length && (password.length >= 8 ? 'is-valid' : 'is-invalid' )}`} />
          </div>
          <div className="d-flex justify-content-around">
            <div className="form-check">
              <input 
                checked={superadminRole || adminRole}
                onChange={e => setAdminRole(e.target.checked)}
                id="checkAdmin" 
                type="checkbox" 
                disabled={true}
                className="form-check-input" />
              <label htmlFor="checkAdmin" className="form-check-label">admin</label>
            </div>
            <div className="form-check">
              <input 
                checked={superadminRole}
                onChange={e => setSuperadminRole(e.target.checked)}
                id="checkSuperadmin" 
                type="checkbox" 
                className="form-check-input" />
              <label htmlFor="checkSuperadmin" className="form-check-label">superadmin</label>
            </div>
          </div>
          <button type="submit" className="btn btn-warning mt-3" disabled={!canSave}>создать</button>
        </div>
      </div>
    </form>
  );
}

export default AdminCreate;
