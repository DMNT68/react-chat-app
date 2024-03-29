import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const { name, email, password } = form;

    const res = await register(name, email, password);

    if (res.ok) {
      toast.success(res.msg);
    } else {
      toast.error(res.msg);
    }
  };

  const todoOK = () => {
    return form.email.length > 0 && form.password.length > 0 && form.name.length > 0 ? true : false;
  };

  return (
    <div>
      <form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmit}>
        <span className="login100-form-title mb-3">Chat - Registro</span>

        <div className="wrap-input100 validate-input mb-3">
          <input className="input100" type="text" name="name" value={form.name} onChange={onChange} placeholder="Nombre" />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input className="input100" type="email" name="email" value={form.email} onChange={onChange} placeholder="Email" />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input className="input100" type="password" name="password" value={form.password} onChange={onChange} placeholder="Password" />
          <span className="focus-input100"></span>
        </div>

        <div className="row mb-3">
          <div className="col text-right">
            <Link to="/auth/login" className="txt1">
              Ya tienes cuenta?
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button disabled={!todoOK()} type="submit" className="login100-form-btn">
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
};
