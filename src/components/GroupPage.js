import React, { useState, useEffect, useContext } from "react";
import { auth, database } from "../firebase.js";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import GroupChat from "../components/GroupChat";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import group_icon_red from "../Assets/group_icon_red.png"
import group_icon_blue from "../Assets/group_icon_blue.png"


import "./GroupPage.css"

function GroupPage() {

  var databaseReadCount = 0;
  const { currentUser } = useContext(AuthContext);
  const { groupName } = useParams();
  const location = useLocation();
  const thisGroup = location.state.group;
  console.log("dsa", thisGroup)
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'files'
  const [groupImageURL, setGroupImageURL] = useState("");
  const [showAddWhiteboard, setShowAddWhiteboard] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newWhiteboardName, setNewWhiteboardName] = useState("");
  const [newWhiteboardDescription, setNewWhiteboardDescription] = useState("");
  const [whiteboards, setWhiteboards] = useState([]);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [currentUserPermission, setCurrentUserPermission] = useState('');
  const [groupMemberPermissions, setGroupMemberPermissions] = useState([]);
  const [currentUserIsMuted, setCurrentUserIsMuted] = useState(false);
  const navigate = useNavigate();


  const fetchGroupMemberPermissions = async () => {

    const userGroupCol = query(collection(database, 'UsersToGroup'), where('groupID', '==', thisGroup.id));
    const userGroupSnapshot = await getDocs(userGroupCol);
    const userGroupList = userGroupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setGroupMemberPermissions(userGroupList);

    databaseReadCount++;
    console.log("Database read count increased: " + databaseReadCount + " || in fetchGroupMemberPermissions");
  }


  useEffect(() => {

    if (!thisGroup) {
      console.error('Group data is not available');
      navigate('/groupsPanel');
    }

    const fetchGroupImage = async () => {
      const groupsCol = query(collection(database, 'Groups'), where('name', '==', groupName));
      const groupSnapshot = await getDocs(groupsCol);
      const groupList = groupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(groupList);
      setGroupImageURL(groupList[0].imageUrl);

      databaseReadCount++;
      console.log("Database read count increased: " + databaseReadCount + " || in fetchGroupImage");
    }

    const fetchWhiteboards = async () => {
      const whiteboardsCol = query(collection(database, 'Whiteboards'), where('groupName', '==', groupName));
      const whiteboardsSnapshot = await getDocs(whiteboardsCol);
      const whiteboardsList = whiteboardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(whiteboardsList);
      setWhiteboards(whiteboardsList);

      databaseReadCount++;
      console.log("Database read count increased: " + databaseReadCount + " || in fetchWhiteboards");
    }


    fetchGroupMemberPermissions();
    fetchGroupImage();
    fetchWhiteboards();

  }, []);



  const handleStartWhiteboardClick = () => {
    setShowAddWhiteboard(true);
    document.getElementsByClassName("overlay")[0].style.display = "flex";
  }

  const handleInfoClick = () => {
    setShowGroupInfo(true);
    document.getElementsByClassName("overlay")[0].style.display = "flex";
  }

  const removeUserFromGroup = async (userID) => {

    const userGroupsRef = collection(database, 'UsersToGroup');
    const q = query(
      userGroupsRef,
      where('userID', '==', userID),
      where('groupID', '==', thisGroup.id)
    );

    databaseReadCount++;
    console.log("Database read count increased: " + databaseReadCount + " || in removeUserFromGroup");

    const userGroupsSnapshot = await getDocs(q);

    if (!userGroupsSnapshot.empty) {
      const deletePromises = userGroupsSnapshot.docs.map(docSnapshot =>
        deleteDoc(doc(database, 'UsersToGroup', docSnapshot.id))
      );

      Promise.all(deletePromises)
        .then(() => {
          console.log("All matching documents successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing documents: ", error);
        });
    } else {
      console.log("No such documents found!");
    }

  }

  const handleLeaveGroupClick = async (e, userID) => {

    e.preventDefault();
    setIsSubmitting(true);

    console.log("Still running fine");

    removeUserFromGroup(userID).then(() => {
      setShowGroupInfo(false);
      document.getElementsByClassName("overlay")[0].style.display = "none";
      setIsSubmitting(false);
      navigate('/groupsPanel');
    });

    setIsSubmitting(false);

  }

  const handleKickClick = async (userID) => {

    setIsSubmitting(true);

    removeUserFromGroup(userID).then(() => {
      fetchGroupMemberPermissions();
    });

    setIsSubmitting(false);

  }

  const handleCloseFormClick = () => {
    document.getElementsByClassName("overlay")[0].style.display = "none";
    setNewWhiteboardDescription("");
    setNewWhiteboardName("");
    setShowAddWhiteboard(false);
    setShowGroupInfo(false);
  }

  const handlePermissionChange = async (e, member) => {

    e.preventDefault();
    setIsSubmitting(true);

    member.userPermission = e.target.value;
    const memberId = member.userID;

    const userGroupRef = collection(database, "UsersToGroup");
    const q = query(userGroupRef, where("userID", "==", memberId), where("groupID", "==", thisGroup.id));

    databaseReadCount++;
    console.log("Database read count increased: " + databaseReadCount + " || in handlePermissionChange");

    console.log(memberId + " " + e.target.value);
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        for (const docSnapshot of querySnapshot.docs) {
          const docRef = doc(database, "UsersToGroup", docSnapshot.id);
          await updateDoc(docRef, { userPermission: e.target.value });
        }
        console.log("Permission updated successfully");

        // Update the local state to reflect the change
        setGroupMemberPermissions(prevPermissions => {
          return prevPermissions.map(member => {
            if (member.id === memberId) {
              return { ...member, userPermission: e.target.value };
            }
            return member;
          });
        });
      } else {
        console.log("No matching document found");
      }
    } catch (error) {
      console.error("Error updating permission: ", error);
    }

    setIsSubmitting(false);

  };

  const handleMuteClick = async (member) => {
    console.log("Mute clicked: " + currentUserPermission);
    if (currentUserPermission !== "group-owner" && currentUserPermission !== "group-admin" && currentUserPermission !== "group-moderator") {
      return console.log("You do not have permission to mute users.");
    } else {

      setIsSubmitting(true);
      const memberId = member.userID;

      const userGroupRef = collection(database, "UsersToGroup");
      const q = query(userGroupRef, where("userID", "==", memberId), where("groupID", "==", thisGroup.id));

      databaseReadCount++;
      console.log("Database read count increased: " + databaseReadCount + " || in handleMuteClick");

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          for (const docSnapshot of querySnapshot.docs) {
            const docRef = doc(database, "UsersToGroup", docSnapshot.id);
            await updateDoc(docRef, { isMuted: !member.isMuted });
          }

          console.log("User muted successfully");
          member.isMuted = !member.isMuted;
        } else {
          console.log("No matching document found");
        }
      } catch (error) {
        console.error("Error muting user: ", error);
      }
      setIsSubmitting(false);

    }
  }

  const handleSubmitNewWhiteboard = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(database, 'Whiteboards'), {
        wName: newWhiteboardName,
        groupName: groupName,
        createdBy: auth.currentUser.uid, // Replace with actual image path or logic
        createdAt: Timestamp.now()
      });

      databaseReadCount++;
      console.log("Database read count increased: " + databaseReadCount + " || in handleSubmitNewWhiteboard");

      const whiteboardsCol = query(collection(database, 'Whiteboards'), where('groupName', '==', groupName));
      const whiteboardsSnapshot = await getDocs(whiteboardsCol);
      const whiteboardsList = whiteboardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWhiteboards(whiteboardsList);

      setNewWhiteboardName("");
      setNewWhiteboardDescription("");
      document.getElementsByClassName("overlay")[0].style.display = "none";
      setShowAddWhiteboard(false);
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    setIsSubmitting(false);
  }


  const determineVisibilityForKick = (member) => {
    if (currentUserPermission !== "group-owner" && currentUserPermission !== "group-admin") {
      console.log("You do not have permission to kick users.")
      return "removed";
    } else if (currentUserPermission === "group-owner") {
      if (member.userPermission === "group-owner") {
        return "hidden";
      } else {
        return "visible";
      }
    } else if (currentUserPermission === "group-admin") {
      if (member.userPermission === "group-owner" || member.userPermission === "group-admin") {
        return "hidden";
      } else {
        return "visible";
      }
    }
  }

  const determineVisibilityForMute = (member) => {
    if (currentUserPermission === "group-owner") {
      if (member.userPermission === "group-owner") {
        return "hidden";
      } else {
        return "visible";
      }
    } else if (currentUserPermission === "group-admin") {
      if (member.userPermission === "group-owner" || member.userPermission === "group-admin") {
        return "hidden";
      } else {
        return "visible";
      }
    } else if (currentUserPermission === "group-moderator") {
      if (member.userPermission === "group-owner" || member.userPermission === "group-admin" || member.userPermission === "group-moderator") {
        return "hidden";
      } else {
        return "visible";
      }
    } else {
      return "removed";
    }
  }

  const handleCallButtonClick = async () => {
    window.open('/Call', '_blank');
  };

  return (
    <div className="group-page">
      <div className='group-page-container'>
        <div className='group-navbar'>
          <div className="group-header">
            <img src={group_icon_blue} alt='logo' className="group-image" />
            <h1 className="group-name">{groupName}</h1>

            <div className="group-actions">
              {/* <button className='bob-btn-1' id="start-whiteboard-btn" onClick={() => handleStartWhiteboardClick()}>Start a Whiteboard</button> */}
              {/* <button className='bob-btn-1' id="call-btn">Voice Call</button> */}
              <button className="text-center font-semibold bg-accent-red rounded-md hover:bg-accent-blue duration-300  text-lg p-4 text-white px-7 mr-4" onClick={handleCallButtonClick}>Call</button>
              <button className='text-center font-semibold bg-accent-red rounded-md hover:bg-accent-blue duration-300  text-lg p-4 text-white px-7' onClick={handleInfoClick}> Info </button>
            </div>

          </ div>

          <div className="tabs">
            <button onClick={() => setActiveTab('chat')} className={activeTab === 'chat' ? 'active' : ''}>Chat</button>
            {/* <button onClick={() => setActiveTab('files')} className={activeTab === 'files' ? 'active' : ''}>Files</button>
            <button onClick={() => setActiveTab('whiteboards')} className={activeTab === 'whiteboards' ? 'active' : ''}>Whiteboards</button> */}
            {/* <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''} id='group-page-users-btn'>Users</button> */}
          </div>
        </div>


        <div className="content">
          {activeTab === 'chat' && (
            <GroupChat groupName={groupName} isMuted={currentUserIsMuted} />
          )}


          {activeTab === 'files' && (
            <div className="files-container">

              {/* Files would be listed here */}
            </div>
          )}


          {activeTab === 'whiteboards' && (
            <div className="whiteboards-container">

              <div className="whiteboards-grid">
                {whiteboards.map((whiteboard) => (
                  <div key={whiteboard.id} className="whiteboard-item">
                    <img src="/clouds.jpeg" alt={whiteboard.name} className="whiteboard-image" />
                    <h2 className="whiteboard-name">{whiteboard.wName}</h2>
                    <h3 className="whiteboard-creation-date">Created at: {whiteboard.createdAt.toDate().toLocaleDateString()}</h3>
                    <button /*onClick={() => navigate(</div>`/whiteboard/${whiteboard.id}`)}*/ className="whiteboard-grid-btn"><img src="/edit.png" alt='pencil' className='w-btn-img' /></button>
                  </div>
                ))}
              </div>


            </div>
          )}

          {activeTab === 'users' && (

            <div className='group-page-users-tab-container'>

              <div className='group-page-users-container'>

                {groupMemberPermissions.map((member) => (
                  <div key={member.id} className='group-page-user-container'>

                    <img src={member.userPhotoURL} alt='user' className='group-page-user-image' />

                    <h2 className='group-page-user-name'>{member.userDisplayName}</h2>

                  </div>
                ))}

              </div>
            </div>
          )}



          {showAddWhiteboard && (
            <div className="popup-form">
              <img src={'/clouds.jpeg'} alt={'brainwave'} className="popup-form-image" />
              <button className="popup-form-close-btn" onClick={handleCloseFormClick}>X</button>
              <img className="popup-form-cloud-icon" src="/Component 1.png" alt="cloud" />
              <form onSubmit={handleSubmitNewWhiteboard} className="popup-form-form">

                <div className="popup-form-container">

                  <h1 className="popup-form-title">Start a Whiteboard!</h1>
                  <div className="popup-form-div">
                    <h2 className="popup-form-subtitle">Whiteboard Name:</h2>

                    <input
                      type="text"
                      placeholder="Enter name"
                      className="popup-form-input"
                      value={newWhiteboardName}
                      onChange={(e) => setNewWhiteboardName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="popup-form-div">
                    <h2 className="popup-form-subtitle">Whiteboard Description:</h2>

                    <textarea
                      type="text"
                      placeholder="Enter description"
                      className="popup-form-input"
                      value={newWhiteboardDescription}
                      onChange={(e) => setNewWhiteboardDescription(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <button type="submit" className="bob-btn-1" id="start-whiteboard-btn" disabled={isSubmitting}>Start Whiteboard</button>
                </div>
              </form>
            </div>
          )}

        </div>

        {showGroupInfo && (
          <div className="popup-form">

            <button type="button" className="popup-form-close-btn" onClick={handleCloseFormClick}>X</button>

            <form onSubmit={(e) => handleLeaveGroupClick(e, currentUser.uid)} className='popup-form-form'>


              <div className='popup-form-container'>
                <img className="rounded-lg w-3/4" src={group_icon_red}></img>
                <h1 className="popup-form-title">{thisGroup.name}</h1>

                <div className='popup-form-div'>
                  <h2 className="popup-form-subtitle font-semibold">Group Description:</h2>
                  <div className="popup-form-text">{thisGroup.details}</div>
                </div>

                <div className='popup-form-div'>
                  <h2 className="popup-form-subtitle font-semibold">Group Members ({thisGroup.members.length}):</h2>

                  <div className="popup-form-member-icons-container">

                    {thisGroup.members.length === 0 ? (
                      <img className="popup-form-member-icon" src="/cross.png" alt="Default" />
                    ) : (
                      thisGroup.members.map((member) => (
                        <h3 className="text-center rounded-full font-semibold bg-accent-blue  text-lg p-1 text-white px-7 mr-4">{member.userDisplayName} </h3>
                        // <img className="popup-form-member-icon" src={member.userPhotoURL} alt="user" />
                      )))}

                  </div>
                </div>

                <button type="submit" className="text-center font-semibold bg-accent-red rounded-md hover:bg-accent-blue duration-300  text-lg p-4 px-7 text-white mr-8" disabled={isSubmitting}>Leave Group</button>
              </div>

            </form>
          </div>
        )}

        <div className="overlay"></div>
      </div >
    </div>
  )
}

export default GroupPage;