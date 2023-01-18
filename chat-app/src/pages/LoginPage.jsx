import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: 'test1@email.com',
    password: '12341234',
    rememberme: false,
  });

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) setForm((form) => ({ ...form, email, rememberme: true }));
  }, []);

  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const toggleCheck = () => {
    setForm({ ...form, rememberme: !form.rememberme });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    form.rememberme ? localStorage.setItem('email', form.email) : localStorage.removeItem('email', form.email);

    const { email, password } = form;

    const res = await login(email, password);

    if (res.ok) {
      toast.success('Usuario Autenticado');
    } else {
      toast.error('Verifique email y password');
    }
  };

  const todoOK = () => {
    return form.email.length > 0 && form.password.length > 0 ? true : false;
  };

  return (
    <div>
      <form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmit}>
        <span className="login100-form-title mb-3">Chat - Ingreso</span>

        <div className="wrap-input100 validate-input mb-3">
          <input className="input100" type="email" name="email" value={form.email} onChange={onChange} placeholder="Email" />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input className="input100" type="password" name="password" value={form.password} onChange={onChange} placeholder="Password" />
          <span className="focus-input100"></span>
        </div>

        <div className="row mb-3">
          <div className="col" onClick={() => toggleCheck()}>
            <input className="input-checkbox100" id="ckb1" type="checkbox" name="rememberme" checked={form.rememberme} readOnly />
            <label className="label-checkbox100">Recordarme</label>
          </div>

          <div className="col text-right">
            <Link to="/auth/register" className="txt1">
              Nueva cuenta?
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button disabled={!todoOK()} type="submit" className="login100-form-btn">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};
