import React, { useState } from "react";

const MyBookmarkRow = ({ currentUser, onDelete, onUpdate }) => {

    const { id, title, url, userId } = currentUser;
    const [isEditing, setIsEditing] = useState(false)
    const [updatedBookmark, setUpdatedBookmark] = useState({ id: id, title: title, url: url, userId: userId })

    const onTitleTextChange = e => {
        const copy = { ...updatedBookmark }
        copy[e.target.name] = e.target.value;
        setUpdatedBookmark(copy);
    }
    const onEdit = () => {
        setIsEditing(true)
    }
    const onCancel = () => {
        setIsEditing(false)
    }
    const update = async () => {
        await onUpdate(updatedBookmark)
        setIsEditing(false)
    }
    return (
        <tr>
            {!isEditing ? <td>{title}</td> :
                <input type="text" class="form-control" placeholder="Title" value={updatedBookmark.title} onChange={onTitleTextChange} name="title"></input>
            } <td>
                <a href={url} target="_blank">
                    {url}
                </a>
            </td>
            <td>
                {!isEditing && <button className="btn btn-success" onClick={onEdit}>Edit Title</button>}
                {isEditing && <><button className="btn btn-warning" onClick={update}>Update</button>
                    <button className="btn btn-info" onClick={onCancel}>Cancel</button></>}
                <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={onDelete}>
                    Delete
                </button>
            </td>
        </tr>
    )
}
export default MyBookmarkRow

