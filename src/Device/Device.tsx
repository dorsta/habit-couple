import { useEffect, useState, type FC } from 'react';
import './Device.scss';
import type { Mqtt } from '../utils/mqtt';

export type TDayState = [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
const emptyState: TDayState = [false, false, false, false, false, false, false];

type TDeviceProps = {
  mqtt: Mqtt | undefined;
  initialState: TDayState | undefined;
};

const Device: FC<TDeviceProps> = ({ mqtt, initialState }) => {
  const [yourLights, setYourLights] = useState<TDayState>(initialState || emptyState);
  const [friendLights, setFriendLights] = useState<TDayState>(initialState || emptyState);

  const messageCallback = (message: string) => {
    const receivedLights = message.split(',').map((value) => value === 'true') as TDayState;
    setFriendLights(receivedLights);
  };

  useEffect(() => {
    if (mqtt) {
      mqtt.subscribeToMessages(messageCallback);
    }
  }, [mqtt]);

  useEffect(() => {
    if (initialState) {
      setYourLights(initialState);
    }
  }, [initialState]);

  const handleDayButtonClick = (index: number) => {
    const newDays = [...yourLights] as TDayState;
    newDays[index] = !yourLights[index];
    setYourLights(newDays);

    if (mqtt) {
      mqtt.sendMessage(newDays.toString());
    }
  };

  const handleResetClick = () => {
    setYourLights(emptyState);

    if (mqtt) {
      mqtt.sendMessage(emptyState.toString());
    }
  };

  return (
    <div className="device">
      <h2 className="device__title">Habit couple</h2>
      <div className="device__body">
        <div className="device__labels">
          <label className="device__label">Friend</label>
          <label className="device__label">You</label>
        </div>
        <ul className="device__list">
          {yourLights.map((_value, index) => (
            <li key={index} className="device__item">
              <div className={`device__light${friendLights[index] ? ' device__light--enabled' : ''}`} />
              <div className={`device__light${yourLights[index] ? ' device__light--enabled' : ''}`} />
              <button className="device__button" onClick={() => handleDayButtonClick(index)} type="button">
                {index + 1}
              </button>
            </li>
          ))}
          <li className="device__item">
            <button className="device__reset-button" onClick={handleResetClick} type="button">
              🔃
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Device;
