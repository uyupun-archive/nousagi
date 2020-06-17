import React, {useEffect, useRef, useState, Fragment} from 'react';

const Top = () => {
  const [isGeolocation, setIsGeolocation] = useState<boolean>(false);
  const [latitudes, setLatitudes] = useState<string[]>([]);
  const [longitudes, setLongitudes] = useState<string[]>([]);
  const [watchId, setWatchId] = useState<any>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const latitudesRef = useRef(latitudes);
  const longitudesRef = useRef(longitudes);

  useEffect(() => {
    latitudesRef.current = latitudes;
    longitudesRef.current = longitudes
  }, [latitudes, longitudes]);

  useEffect(() => {
    if (navigator.geolocation) {
      setIsGeolocation(true);
    } else {
      setIsGeolocation(false);
    }
  }, []);

  if (!isGeolocation) return <Fragment/>;

  const start = () => {
    if (!isGeolocation) return;
    setDisabled(true);
    const watchId = navigator.geolocation.watchPosition(success, fail);
    setWatchId(watchId);
  };

  const stop = () => {
    navigator.geolocation.clearWatch(watchId);
    setDisabled(false);
  };

  const success = (pos: any) => {
    setLatitudes(pushValue(latitudesRef.current, pos.coords.latitude));
    setLongitudes(pushValue(longitudesRef.current, pos.coords.longitude));
  };

  const fail = (error: any) => {
    console.error(error);
    const errorMessage: any = {
      0: "原因不明のエラーが発生しました" ,
      1: "位置情報の取得が許可されていません" ,
      2: "電波状況等の影響で位置情報が取得できませんでした" ,
      3: "位置情報の取得がタイムアウトしました"
    } ;
    alert(errorMessage[error.code]);
  };

  const pushValue = (array: any[], value: any) => {
    const newArray = [...array];
    newArray.push(value);
    return newArray;
  };

  const showLocations = () => {
    return latitudes.map((latitude, index) => {
      return <p key={index}>{`${latitude} / ${longitudes[index]}`}</p>;
    });
  };

  return <div>
    <h1 className="text-center">nousagi</h1>
    <div className="d-flex justify-content-center mb-3">
      <button className="btn btn-primary mx-1" onClick={() => start()} disabled={disabled}>START</button>
      <button className="btn btn-primary mx-1" onClick={() => stop()} disabled={!disabled}>STOP</button>
    </div>

    <div className="ml-2 mr-2">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a href="#speed" className="nav-link active" data-toggle="tab">Speed</a>
        </li>
        <li className="nav-item">
          <a href="#geo" className="nav-link" data-toggle="tab">Geo</a>
        </li>
        <li className="nav-item">
          <a href="#map" className="nav-link" data-toggle="tab">Map</a>
        </li>
      </ul>

      <div className="tab-content">
        <div id="speed" className="tab-pane active">
          <p>speed</p>
          {
            showLocations()
          }
        </div>
        <div id="geo" className="tab-pane">
          <p>geo</p>
        </div>
        <div id="map" className="tab-pane">
          <p>map</p>
        </div>
      </div>
    </div>
  </div>;
};

export default Top;
