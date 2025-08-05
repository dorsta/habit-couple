import { useState } from 'react';
import './App.scss';
import Device, { type TDayState } from './Device/Device';
import Form from './Form/Form';
import { Mqtt } from './utils/mqtt';

function App() {
  const [isInSetup, setIsInSetup] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [deviceNumber, setDeviceNumber] = useState('');
  const [mqtt, setMqtt] = useState<Mqtt>();
  const [isLoading, setIsLoading] = useState(false);
  const [initialState, setInitialState] = useState<TDayState>();

  const handleUserNameChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onRadioInputChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceNumber(event.target.value);
  };
  const handleSettingsConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    if (mqtt) {
      mqtt.terminate();
    }
    event.preventDefault();
    setIsInSetup(false);
    setIsLoading(true);
    setMqtt(new Mqtt(username, password, deviceNumber as '1' | '2', setInitialState));
    setIsLoading(false);
  };

  return (
    <>
      <Form
        isOpen={isInSetup}
        username={username}
        password={password}
        deviceNumber={deviceNumber}
        isLoading={isLoading}
        onConfirmSettings={handleSettingsConfirm}
        onDeviceNumberChange={onRadioInputChangeEvent}
        onPasswordChange={handlePasswordChange}
        onUserNameChange={handleUserNameChange}
      />
      <Device mqtt={mqtt} initialState={initialState} />
      <button className="settings" type="button" onClick={() => setIsInSetup(true)}>
        Settings
      </button>
    </>
  );
}

export default App;
