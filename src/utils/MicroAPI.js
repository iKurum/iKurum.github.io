function GetInfo() {
  const headers = new Headers();
  this.graph = 'https://graph.microsoft.com/v1.0';

  this.init = token => {
    const bearer = 'Bearer ' + token;
    headers.append('Authorization', bearer);

    this.opt = {
      method: 'GET',
      headers: headers
    };

    this.token = token;
  }

  this.url = (url, c) => {
    switch (c) {
      case 'json':
        return this.token
          ?
          fetch(`${this.graph}${url}`, this.opt)
            .then(res => {
              if (res.ok) {
                return res.json();
              } else {
                return Promise.reject({
                  ST: '获取内容错误 ...',
                  status: res.status,
                  statusText: res.statusText
                })
              };
            })
          :
          Promise.resolve({});
      case 'arrayBuffer':
        return this.token
          ?
          fetch(`${this.graph}${url}`, this.opt)
            .then(res => {
              if (res.ok) {
                return res.arrayBuffer();
              } else {
                return Promise.resolve({
                  ST: '获取内容错误 ...',
                  status: res.status,
                  statusText: res.statusText
                })
              };
            })
          :
          Promise.resolve({});
      default:
        Promise.resolve({});
        break;
    }
  }
}

export default GetInfo;