import { useEffect, useState } from "react"
import MyBookmarkRow from "./MyBookmarkRow"
import axios from 'axios'
import { Link } from "react-router-dom";
import { useAuth } from "./Context";
import { useNavigate } from "react-router-dom";



const MyBookmarks = () => {

  const { user } = useAuth()
  const [currentUserBookmarks, setCurrentUserBookmarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookmarks();
  }, [])
  const getBookmarks = async () => {
    const { data } = await axios.get('/api/bookmark/GetBookmarksForCurrentUser');
    setCurrentUserBookmarks(data);
  }
  const onDelete = async (bookmark) => {
      await axios.post('/api/bookmark/delete', bookmark)
    getBookmarks();
    navigate('/mybookmarks')
  }
const onUpdate = async (bookmark) =>{
    await axios.post('/api/bookmark/edit', bookmark)
  getBookmarks();
}
  return (
    <div style={{ marginTop: 20 }}>
      <div className="row">
        <div className="col-md-12">
          <h1>Welcome back {user.firstName} </h1>
          <Link className="btn btn-primary btn-block" to="/addbookmark">
            Add Bookmark
          </Link>
        </div>
      </div>
      <div className="row" style={{ marginTop: 20 }}>
        <table className="table table-hover table-striped table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Url</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentUserBookmarks.map(c => <MyBookmarkRow key={c.id} currentUser={c} onDelete={() => { onDelete(c) }} onUpdate={onUpdate} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default MyBookmarks