import React from "react";

const HomeRow = ({topUrl}) =>{
const {url, urlCount} = topUrl
return(
    <tr>
    <td>
        <a href={url} target="_blank">
            {url}
        </a>
    </td>
    <td>{urlCount}</td>
</tr>
)
}
export default HomeRow;