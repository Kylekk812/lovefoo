import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [mylist, changeMylist] = useState(null);
  const [rec, changeRec] = useState(null)
  const [change, toChange] = useState(false)
  const [displayRemove, setRemoveButton] = useState([0,false])
  const [displayAdd, setAddButton] = useState([0,false]);



  useEffect(() => {
    fetch('http://5ca334a8190b430014edbc1f.mockapi.io/api/v1/movies')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        changeMylist(data[0].mylist)
        changeRec(data[0].recommendations)
        toChange(true)
      })
  }, [change])

  return (
    <div className="App">
      <header className="App-header">
        {!mylist ? null :
          <div id='overview'>
            <div id='mylist'>
              {mylist.map((item) => {
                return (
                  <div id='mylist_container' key={item.id}>
                    <ul> {item.title}</ul>
                    <img src={item.img} alt={item.id}
                      onMouseEnter={e=> setRemoveButton([item.id,true])}
                      />
                      <div> </div>
                    {displayRemove[0] === item.id && displayRemove[1] ? 
                    <button id = {item.id} onClick={e=> {
                      let temp = mylist.filter(item => item.id !== Number(e.target.id));

                      changeMylist(temp)
                    }}> Delete </button>
                    :null}
                  </div>

                )
              })}
            </div>
            <div id='reco'>
              {rec.map(item => {
                return (
                  <div id='reco_container' key={item.id}>
                    <ul>{item.title} </ul>
                    <img src={item.img} alt={item.id} 
                    onMouseEnter={e=> setAddButton([item.id,true])}
                    />
                  <div></div>
                  {displayAdd[0] === item.id && displayAdd[1] ? 
                  <button id={item.id} onClick={e => {
                    let toAdd = null;
                    for(var film of rec) {
                      if(film.id === Number(e.target.id)) {
                        // console.log(film, 'sfsfs')
                        toAdd = film
                      }
                    }
                    let temp = mylist.concat(toAdd);
                    let temp1 = rec.filter(item => item.id !== Number(e.target.id))
                    changeMylist(temp)
                    changeRec(temp1)
                  }}> 
                  Add
                  </button>
                  : null
                }
                  </div>
                )
              })}
            </div>
          </div>}
      </header>
    </div>
  );
}

export default App;
