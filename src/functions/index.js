/* eslint-disable no-plusplus */
//  Change UNIX to date
import store from 'store';
import axios from 'axios';
import { changeSidePanelState } from 'actions';
import path from '../path';
import { useSelector } from 'react-redux';

export const formatDate = date => {
  const months = [
    'sty',
    'lut',
    'mar',
    'kwi',
    'maj',
    'cze',
    'lip',
    'sie',
    'wrz',
    'paź',
    'lis',
    'gru',
  ];

  const format = new Date(date * 1000);

  const day = format.getDate();
  const month = format.getMonth();
  const year = format.getFullYear();

  return `${day}-${months[month]}-${year}`;
};

//  Change format date from xxx-xx-xx to xx-xx-xxx

export const reverseDate = date => {
  if (typeof date === 'string') {
    const temp = date
      .split('-')
      .reverse()
      .join('-');
    return temp;
  }
  return '';
};

// Base64 format to canvas

export const image64toCanvasRef = (canvasRef, image64, pixelCrop) => {
  const canvas = canvasRef;
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  const image = new Image();
  image.src = image64;
  const countAspect = image.naturalWidth / image.naturalHeight;

  const countWith = (364 * countAspect).toFixed(0);

  const scaleY = image.naturalHeight / 364;
  const scaleX = image.naturalWidth / countWith;

  image.onload = () => {
    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );
  };
};

//  File extension from Base64
export const extractImageFileExtensionFromBase64 = base64Data => {
  return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'));
};

//  File from Base64
export const base64StringtoFile = (base64String, filename) => {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

//  handle sidePanel
export const sidePanel = result => {
  const { appState } = store.getState();
  const { inProgress } = appState;
  const { content, error } = result;
  if (!inProgress) {
    store.dispatch(changeSidePanelState({ content, error }));
    setTimeout(() => store.dispatch(changeSidePanelState({ content, error })), 2000);
    setTimeout(() => store.dispatch({ type: 'UNLOCK_SIDE_PANEL' }), 4500);
  }
};

// SET NEW CURRENT CV

export const setNewCurrentCVData = (type, token, id, data) => () => {
  return axios
    .post(`${path.cors}handleCurrentCv.php`, {
      type,
      id,
      token,
      data,
    })
    .then(result => {
      sidePanel(result.data);
    })
    .catch(error => {
      console.log(error);
    });
};

export const getPanelName = name => {
  switch (name) {
    case 'education': {
      return 'Szkoła';
    }
    case 'languages': {
      return 'Język';
    }
    case 'skills': {
      return 'Umiejętność';
    }
    case 'interests': {
      return 'Zainteresowania';
    }
    case 'experience': {
      return 'Doświadczenie';
    }

    default: {
      return '';
    }
  }
};

export const getNewItemName = currentView => {
  const array = [
    { education: 'nową szkołę' },
    { interest: 'nową umiejętność' },
    { languages: 'nowy język' },
    { skills: 'nową umiejętność' },
    { skills: 'doświadczenie zawodowe' },
  ];

  const index = array.find(item => String(Object.keys(item)) === currentView);
  return index ? index[currentView] : 'nowy element';
};