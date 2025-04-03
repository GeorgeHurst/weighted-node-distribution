class Requester {
  constructor() {
    this.url = "http://192.168.0.1:5201/api/";
  }

  getRelatedNodes(nodeid, searchDepth) {
    return fetch(`${this.url}nodes/displaychildren/${nodeid}/${searchDepth}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("getRelatedNodes: Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        //~ console.log(data);
        return data;
        // Returns objects to use
      })
      .catch(error => {
        console.error(
          'There was a problem with "getRelatedNodes" request:', error
        );
      });
  }

  getParents(nodeid) {
    fetch(`${this.url}nodes/parents/${nodeid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("getParents: Network response was not ok");
        }
        return response.json()
      })
      .then((data) => {
        //~ console.log(data);
        return data;
        // Returns a list of parents
      })
      .catch((error) => {
        console.error('There was a problem with "getParents" request:', error);
      });
  }

}
