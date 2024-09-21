import "./single.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import Table from "../../components/table/Table";;

const Single = () => {

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>


            <div className="item">
              <img
                //src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                src="https://firebasestorage.googleapis.com/v0/b/bluecollar-33e04.appspot.com/o/images%2FGgqrBmcub2h3GP7oFw3yzSEwapH2?alt=media&token=a63a565f-c06d-4786-91a0-c76e796d0a21"
                alt=""
                className="itemImg"
              />
              <div className="details">

                <h1 className="itemTitle">Ganesh Gaitonde</h1>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">GgqrBmcub2h3GP7oFw3yzSEwapH2</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+919167969251</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  Mumbai, Gopalmath"
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Aadhar:</span>
                  <span className="itemValue">547866589922</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Expected Salary:</span>
                  <span className="itemValue">25k</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Bio:</span>
                  <span className="itemValue">No bio</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">Watchmen</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Entries</h1>
          <Datatable/>
        </div> */}
      </div>
    </div>
  )
}

export default Single