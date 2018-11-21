export default class ServerRequester {
  constructor(){
    this.Adapter = {
      baseUrl: "http://localhost:3001/colorList",
      toJSON: function(data) {
        return data.then((res) => res.json())
      },
      getAll: function(param) {
        return this.toJSON(fetch(this.baseUrl));
      },
      getOne: function(param) {
        return this.toJSON(fetch(`${this.baseUrl}/${param.id}`))
      },
      destroy: function(param) {
        let options = { method: 'DELETE' }
        return this.toJSON(fetch(`${this.baseUrl}/${param.id}`, options))
      },
      create: function(param) {
        let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(param.data)
        };
        return this.toJSON(fetch(this.baseUrl, options));
      },
      update: function(param) {
        let options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(param.data)
        };
        return this.toJSON(fetch(`${this.baseUrl}/${param.id}`, options));
      }
    };
    this.setResquest = this.setResquest.bind(this);
  }
  setResquest(requestName, param){
    return this.Adapter[requestName](param);
  }

}