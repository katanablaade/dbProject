'use strict';

const urlGet = 'db.json';
const urlSend = 'https://jsonplaceholder.typicode.com/posts';

const getData = (url) => {
  return fetch(url).then((response) => response.json());
};

const sendData = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((response) => response.json());
};

const sendXMLHttpRequest = (url, data) => {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('Successfully:', JSON.parse(xhr.responseText));
    } else {
      console.error('Error:', xhr.statusText);
    }
  };
  xhr.onerror = () => {
    console.error('Request failed');
  };
  xhr.send(JSON.stringify(data));
};

getData(urlGet)
  .then((user) => {
    return sendData(urlSend, user);
  })
  .then((response) => {
    console.log('Successfully:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

getData(urlGet).then((user) => {
  sendXMLHttpRequest(urlSend, user);
});
