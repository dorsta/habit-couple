import type { FC } from 'react';
import './Form.scss';

type TFormProps = {
  isOpen: boolean;
  username: string;
  password: string;
  deviceNumber: string;
  isLoading: boolean;
  onConfirmSettings: (event: React.FormEvent<HTMLFormElement>) => void;
  onUserNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeviceNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form: FC<TFormProps> = ({
  isOpen,
  username,
  password,
  deviceNumber,
  isLoading,
  onConfirmSettings,
  onDeviceNumberChange,
  onPasswordChange,
  onUserNameChange,
}: TFormProps) => {
  return (
    <div className={`form__backdrop${isOpen ? '' : ' form__backdrop--hidden'}`}>
      <form className="form" onSubmit={onConfirmSettings}>
        <input
          className="form__username"
          type="text"
          placeholder="username"
          onChange={onUserNameChange}
          value={username}
          required={true}
        />
        <input
          className="form__password"
          type="password"
          placeholder="password"
          onChange={onPasswordChange}
          value={password}
          required={true}
        />
        <p>Device number</p>
        <div>
          <input
            className="form__radio"
            type="radio"
            name="deviceNumber"
            id="device1"
            value={1}
            onChange={onDeviceNumberChange}
            checked={deviceNumber === '1'}
            required={true}
          />
          <label id="device1">1</label>
        </div>
        <div>
          <input
            className="form__radio"
            id="device2"
            type="radio"
            name="deviceNumber"
            value={2}
            onChange={onDeviceNumberChange}
            checked={deviceNumber === '2'}
            required={true}
          />
          <label id="device2">2</label>
        </div>
        {isLoading ? <span className="form__loader"></span> : <button type="submit">Confirm</button>}
      </form>
    </div>
  );
};

export default Form;
