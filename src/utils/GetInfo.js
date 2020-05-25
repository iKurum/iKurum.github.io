require('../setupProxy');

function GetInfo(url, c, access_token, v = null) {
  if (typeof access_token === 'string') {
    const headers = {
      Authorization: `Bearer ${access_token}`
    }

    switch (c) {
      case 'json':
        switch (v) {
          case 'onedrive':
            return fetch(
              `/ms/drive/root:/emilia - share${url}`,
              { headers: headers })
              .then(res => {
                if (res.ok) {
                  return res.json();
                } else {
                  return Promise.reject({
                    status: res.status,
                    statusText: res.statusText
                  })
                };
              })
          case 'preview':
            return fetch(
              `/ms/drive/items/${url}/preview`,
              {
                method: 'POST',
                headers: headers
              })
              .then(res => {
                if (res.ok) {
                  return res.json();
                } else {
                  return Promise.reject({
                    status: res.status,
                    statusText: res.statusText
                  })
                };
              })
          default:
            return fetch(
              `/ms${url}?$select=givenName`,
              { headers: headers })
              .then(res => {
                if (res.ok) {
                  return res.json();
                } else {
                  return Promise.reject({
                    status: res.status,
                    statusText: res.statusText
                  })
                };
              })
        }
      case 'arrayBuffer':
        return fetch(
          `/ms${url}`,
          { headers: headers })
          .then(res => {
            if (res.ok) {
              return res.arrayBuffer();
            } else {
              return Promise.resolve({
                status: res.status,
                statusText: res.statusText
              })
            };
          })
      default:
        return Promise.resolve({ str: '格式不匹配' });
    }
  }
  return Promise.resolve({ str: '等待 access_token' });
}

export default GetInfo;