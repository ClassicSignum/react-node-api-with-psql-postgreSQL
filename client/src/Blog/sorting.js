import React from "react";
import Datasort from "react-data-sort";
// import tableData from "./sortingdata/data";
// import maleData from "./sortingdata/maledata";
import {Button} from '@material-ui/core'
import {Container,Row,Col} from 'react-bootstrap'
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';


const axiosIns=axios.create({
  baseURL:"http://localhost:5000"
})
let data=[];
const getPost=()=>{
        
  axiosIns.get('/api/get/allposts')
       .then((res)=>{data=res.data;})
       .catch((err)=>console.log(err))
  // axiosIns.get('/hello')
  //       .then(res=>console.log(res.data))
  //       .catch(err=>console.log(err))
}

////////
function MyTable() {
  //getPost();
  // console.log(data)
  return (
    <Datasort
      // data={tableData}
     data={data}
      defaultSortBy="pid"
      paginate
      
      render={({
        data,
        setSortBy,
        sortBy,
        direction,
        activePage,
        toggleDirection,
        goToPage,
        nextPage,
        prevPage,
        pages
      }) => {
        return (
          <div>
           
            <Container>

                <TableHead
                  setSortBy={setSortBy}
                  sortBy={sortBy}
                  direction={direction}
                  toggleDirection={toggleDirection}
                />

              <TableBody data={data}  />

            </Container>

            <Flex style={{justifyContent: 'space-between'}}>
              <GoToPage goToPage={goToPage} pages={pages} />
              <PageIndicator pages={pages} activePage={activePage} />
              <Navigation
                activePage={activePage}
                goToPage={goToPage}
                nextPage={nextPage}
                prevPage={prevPage}
                pages={pages}
              />
              
            </Flex>
          </div>
        );
      }}
    />
  );
}
////
function TableHead({ setSortBy, sortBy, direction, toggleDirection }) {
  const columns = [
    { key: "pid", title: "post id" },
    { key: "title", title: "post title" },
   
  ];
  const items = columns.map(({ key, title }) => {
    console.log(key)
    const active = key === sortBy;
    return (
      <HeadToggle
        
        key={key}
        active={active}
        onClick={() => {
          if (active) {
            toggleDirection();
          }
          setSortBy(key);
        }}
      
      >
        <Col  >
          <Button variant="contained" color="primary" disableElevation>
            Sort By {title}
            {active ? direction === "asc" ? "▲" : "▼" : null}
          </Button>
        </Col>
          
      </HeadToggle>
    );
  });
  return (
    
      <Row style={{width:"60%" ,marginLeft:"auto",marginRight:"auto"}}>
        {items}
      </Row>
   
  );
}

function HeadToggle({ children, active,onClick }) {
  return (
    <Col
    onClick={onClick}//sort by onclick
      style={{color:"white", fontWeight: active ? "bold" : "normal", cursor: "pointer" }}
    >
      {children}
    </Col>
  );
}



function TableBody({ data }) {

  // console.log(data)
  
  
  return (
    <div>      
      {data.map((post) => (
        
        <Row style={{color:"white",marginTop:"20px",marginBottom:"10px",borderBottom:"5px solid #eee"}}> 
          <Col >
          
          <p>post id: {post.pid} </p>
          <p>user id: {post.user_id} </p>
          <p>author: {post.author} </p>
          <Link to={{pathname:"/post/"+post.pid,state:{post}}}>
          <h5>post title: {post.title} </h5>
          </Link>
          <h4>post body: {post.body} </h4>
          <p>post created: {moment(post.date_created).format('MMMM Do, YYYY | h:mm a')} </p>

          </Col>
         
        </Row>
      ))}
    </div>
  );
}

function Flex({ children, style }) {
  return <div style={{ display: "flex", ...style }}>{children}</div>;
}

function GoToPage({ goToPage, pages}) {
  const options = []
  for(let i = 0; i < pages; i++) {
    options.push(<option value={i}>{i + 1}</option>)
  }
  return <div style={{marginLeft:"10vw"}}>Go to page <select onChange={e => goToPage(parseInt(e.target.value))}>{options}</select></div>
}

function Navigation({ activePage, goToPage, nextPage, prevPage, pages }) {
  return (
    <Flex>
     
        <DoubleArrowIcon color={activePage===0 ? "disabled":""} onClick={() => goToPage(0)} 
        style={{transform:"rotate(180deg)",background:"#444",borderRadius:"50%",marginRight:"10px"}} />
   
        <ArrowForwardIosIcon color={activePage===0 ? "disabled":""} onClick={prevPage}
        style={{transform:"rotate(180deg)",background:"#444",borderRadius:"50%",marginRight:"10px"}}
        />
     
        <ArrowForwardIosIcon color={activePage===pages-1 ? "disabled":""} onClick={nextPage}
        style={{background:"#444",borderRadius:"50%",marginRight:"10px"}}
        />
    
      <DoubleArrowIcon 
      
      color={activePage===pages-1 ? "disabled":""}
      onClick={() => goToPage(pages - 1)}
      style={{marginRight:"10vw",background:"#444",borderRadius:"50%"}}
      />
    </Flex>
  );
}

function PageIndicator ({pages, activePage}) {
  return <div>
    <b>{activePage + 1}</b> / {pages}
  </div>
} 

const Myapp = (props) => {
   getPost();
  return (
    <div style={{color:"aqua",background:"#111"}}>
    {/* <MyTable  />  */}
    {data.length<2?getPost():<MyTable />}
  </div>
  );
};

export default Myapp;
