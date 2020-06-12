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
      //Geolocation APIを利用できる環境向けの処理
      setIsGeolocation(true);
    } else {
      //Geolocation APIを利用できない環境向けの処理
      setIsGeolocation(false);
    }
  }, []);

  if (!isGeolocation) return <Fragment/>;

  const start = () => {
    console.log("Start!!!");
    if (isGeolocation) {
      setDisabled(true);
      // navigator.geolocation.getCurrentPosition(success, fail);
      const watchId = navigator.geolocation.watchPosition(success, fail);
      setWatchId(watchId);
    }
  };

  const stop = () => {
    navigator.geolocation.clearWatch(watchId);
    setDisabled(false);
  };

  const success = (pos: any) => {
    console.log(pos);
    setLatitudes(pushValue(latitudesRef.current, pos.coords.latitude));
    setLongitudes(pushValue(longitudesRef.current, pos.coords.longitude));
  };

  const fail = (error: any) => {
    console.error(error);
    const errorMessage: any = {
      0: "原因不明のエラーが発生しました" ,
      1: "位置情報の取得が許可されませんでした" ,
      2: "電波状況などで位置情報が取得できませんでした" ,
      3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました"
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
    <h1>nousagi</h1>
    <button className="btn btn-primary" onClick={() => start()} disabled={disabled}>Start!!!</button>
    <button className="btn btn-primary" onClick={() => stop()} disabled={!disabled}>Stop!!!</button>
    {
      showLocations()
    }
  </div>;
};

export default Top;
