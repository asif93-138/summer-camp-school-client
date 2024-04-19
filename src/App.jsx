import { useEffect, useState } from 'react'



function App() {
  const [classes, setClasses] = useState([]);
  const [Instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/classes')
    .then(res => res.json())
    .then(data => {
      data.sort(function(a, b) {return b.enrolled - a.enrolled});
      setClasses(data.slice(0, 6));
      const filteredIns = [];
      data.forEach(x => {
        if (filteredIns.find(y => y.insID == x.insID) == undefined) {
            filteredIns.push(x);
        }
    });
    setInstructors(filteredIns.slice(0, 6));
    })
  }, [])

  return (
    <div className='container'>
  
<section id="demo" className="carousel slide mb-5" data-bs-ride="carousel">

  
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
  </div>
  

  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://images.unsplash.com/photo-1613738053817-7f0983aa456d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Los Angeles" className="d-block" style={{width: "100%"}} />
    </div>
    <div className="carousel-item">
      <img src="https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chicago" className="d-block" style={{width: "100%"}} />
    </div>
    <div className="carousel-item">
      <img src="https://images.unsplash.com/photo-1571235479512-36bb46e1c587?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="New York" className="d-block" style={{width: "100%"}} />
    </div>
  </div>
  
  
  <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
    <span className="carousel-control-next-icon"></span>
  </button>
</section>
<h3 className='text-center'>Top Classes</h3>
<p className='text-center'>According to the number of enrolled students.</p>
<section className='row'>
{classes.map(x => (<div className='col-sm-4' key={x._id}>
        <div className='card p-3 m-4'>
        <img className='card-img-top w-100' src={x.cImgURL} />
      <div className="card-body mt-3 text-center">
      <h6 className="card-title">Class Name : {x.cN}</h6>
      <p className="card-text">Instructor Name : {x.insName}</p>
      </div>
        </div>
    </div>))}
</section>
<h3 className='text-center'>Top Instructors</h3>
<p className='text-center'>According to the number of enrolled students.</p>
<section className='row'>
{Instructors.map(x => (<div className='col-sm-4' key={x._id}>
      <div className='card m-4'>
      <img className='card-img-top w-100' src={x.insImgURL} />
      <div className="card-body text-center">
      <h6 className="card-title">Instructor Name : {x.insName}</h6>
      <p className="card-text">Email : {x.insEmail}</p>
      </div>
      </div>
    </div>))}
</section>
    </div>
  )
}

export default App;
