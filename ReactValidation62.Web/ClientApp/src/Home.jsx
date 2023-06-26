import { useEffect, useState } from "react"
import axios from 'axios'
import HomeRow from "./HomeRow";

const Home = () => {
    const [top5urlList, setTop5UrlList] = useState([]);
    useEffect(() => {
        const getUrls = async () => {
            const { data } = await axios.get('/api/bookmark/gettop5bookmarks')
            setTop5UrlList(data)
        }
        getUrls();
    }, [])
    return (
        <div className="container" style={{ marginTop: 80 }}>
            <main role="main" className="pb-3">
                <div>
                    <h1>Welcome to the React Bookmark Application.</h1>
                    <h3>Top 5 most bookmarked links</h3>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Url</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top5urlList.map(u => <HomeRow topUrl={u} />)}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
export default Home