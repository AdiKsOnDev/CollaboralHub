import React, { useEffect, useState, useContext, GroupContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, query, where, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { database, auth } from '../firebase';
import Navbar from '../components/Navbar';
import { AuthContext } from "../context/AuthContext";
import { ReactComponent as PlusSVG } from "../Assets/New-Icon.svg";
import './GroupsPanel.css';
import { ReactComponent as SearchSVG } from "../Assets/Magnifier.svg";
import group_icon_blue from "../Assets/group_icon_blue.png"
import group_icon_red from "../Assets/group_icon_red.png"
import { ReactComponent as PlusNoCircleSVG } from "../Assets/Plus-No-Circle.svg"

//------------------------------------------------------------------------------//
//------------------------------------------------------------------------------//

function GroupsPanel() {

  const GroupContext = React.createContext();
  const { currentUser } = useContext(AuthContext);

  const [showAddGroup, setShowAddGroup] = useState(false);
  const [showGroupPreview, setShowGroupPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("your");
  const [searchTerm, setSearchTerm] = useState('');
  const [nonMemberGroups, setNonMemberGroups] = useState([]);
  const [nonMemberGroupsWithMembers, setNonMemberGroupsWithMembers] = useState([]);
  const [yourGroupsWithMembers, setYourGroupsWithMembers] = useState([]);
  const [yourGroups, setYourGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDetails, setNewGroupDetails] = useState('');
  const [newGroupCategory, setNewGroupCategory] = useState('');
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("null");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayingCategory, setDisplayingCategory] = useState(false);
  const [openedGroup, setOpenedGroup] = useState([]);
  const [showErrorForm, setShowErrorForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //------------------------------------------------------------------------------//
  //------------------------------------------------------------------------------//

  const fetchNonMemberGroups = async () => {

    if (!currentUser || !currentUser.uid) {
      console.error("Current user data is not available.");
      return;
    }

    // Step 1: Fetch group IDs that the user is already in
    const userGroupsRef = collection(database, 'UsersToGroup');
    const q = query(userGroupsRef, where('userID', '==', currentUser.uid)); // Replace with current user ID
    const userGroupsSnapshot = await getDocs(q);
    const userGroupIDs = userGroupsSnapshot.docs.map(doc => doc.data().groupID);

    // Step 2: Fetch all groups and filter out the ones the user is already in
    const groupsRef = collection(database, 'Groups');
    const allGroupsSnapshot = await getDocs(groupsRef);
    const nonMemberGroups = allGroupsSnapshot.docs
      .filter(doc => !userGroupIDs.includes(doc.id))
      .map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("gaaaa", nonMemberGroups)
    const groupsWithMembers = await fetchGroupsWithMembers(nonMemberGroups);
    setNonMemberGroups(nonMemberGroups);
    setNonMemberGroupsWithMembers(groupsWithMembers);
    return nonMemberGroups;

  };

  const fetchYourGroups = async () => {

    if (!currentUser || !currentUser.uid) {
      console.error("Current user data is not available.");
      return;
    }

    const userGroupsRef = collection(database, 'UsersToGroup');
    console.log("test3", currentUser.uid);
    const q = query(userGroupsRef, where('userID', '==', currentUser.uid));
    const userGroupsSnapshot = await getDocs(q);
    const groupIDs = userGroupsSnapshot.docs.map(doc => doc.data().groupID);

    const groupsRef = collection(database, 'Groups');
    const allGroupsSnapshot = await getDocs(groupsRef);
    const filteredGroups = allGroupsSnapshot.docs
      .filter(doc => groupIDs.includes(doc.id))
      .map(doc => ({ id: doc.id, ...doc.data() }));

    const groupsWithMembers = await fetchGroupsWithMembers(filteredGroups)
    setYourGroupsWithMembers(groupsWithMembers);
    setYourGroups(filteredGroups);
    return filteredGroups;

  };

  const fetchGroupByName = async (groupName) => {

    const groupsRef = collection(database, 'Groups');
    console.log("test2", groupName);
    const q = query(groupsRef, where('name', '==', groupName));
    const groupSnapshot = await getDocs(q);
    const groupByName = groupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return groupByName;

  };

  const fetchGroupsWithMembers = async (groups) => {
    const groupsWithMembers = await Promise.all(groups.map(async (group) => {
      // Fetch members for each group
      const members = await fetchSelectedGroupMembers(group.name);
      return { ...group, members }; // Combine group info with its members
    }));
    return groupsWithMembers;
  };

  const fetchSelectedGroupMembers = async (groupName) => {

    const userGroupsRef = collection(database, 'UsersToGroup');

    const groupsRef = collection(database, 'Groups');
    const q = query(groupsRef, where('name', '==', groupName));
    console.log("test1", groupName);
    const groupSnapshot = await getDocs(q);
    const groupByName = groupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(selectedGroup);
    const q1 = query(userGroupsRef, where('groupID', '==', groupByName[0].id));
    console.log("test", groupByName[0].id)
    const userGroupsSnapshot = await getDocs(q1);
    const groupMember = userGroupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log(groupMember);
    // console.log(currentUser.photoURL);

    setSelectedGroupMembers(groupMember);
    return groupMember;

  }

  const fetchCategories = async () => {

    const categoriesCol = collection(database, 'GroupCategories');
    const categoriesSnapshot = await getDocs(categoriesCol);
    const categoriesList = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCategories(categoriesList);
  };


  //------------------------------------------------------------------------------//
  //------------------------------------------------------------------------------//

  useEffect(() => {

    if (currentUser) {
      fetchCategories();
      fetchNonMemberGroups();
      fetchYourGroups();
    }
  }, []);

  //------------------------------------------------------------------------------//
  //------------------------------------------------------------------------------//

  const handleOkClick = () => {
    setShowErrorForm(false);
    setErrorMessage("");
    document.getElementsByClassName("overlay")[0].style.display = "none";
  };

  const deleteAllGroups = async () => {
    const collectionRef = collection(database, 'Groups'); // Replace with your collection name
    const documentToKeepId = '9OxeBXw9b5tVS3keD9D1'; // Replace with the ID of the document you want to keep

    getDocs(collectionRef)
      .then(snapshot => {
        const deletePromises = [];

        snapshot.forEach(doc => {
          if (doc.id !== documentToKeepId) {
            deletePromises.push(deleteDoc(doc.ref));
          }
        });

        return Promise.all(deletePromises);
      })
      .then(() => {
        console.log('All documents except the specified one have been deleted');
      })
      .catch(error => {
        console.error('Error deleting documents:', error);
      });
  }

  const deleteAllUsersToGroups = async () => {
    const collectionRef = collection(database, 'Messages'); // Replace with your collection name
    const variableName = 'groupName'; // The name of the variable to check
    const valueToKeep = 'Gomo'; // The value to keep

    // Query for documents that do NOT meet the condition
    const q = query(collectionRef, where(variableName, '!=', valueToKeep));

    getDocs(q)
      .then(snapshot => {
        const deletePromises = [];

        snapshot.forEach(doc => {
          deletePromises.push(deleteDoc(doc.ref));
        });

        return Promise.all(deletePromises);
      })
      .then(() => {
        console.log('All documents not meeting the condition have been deleted');
      })
      .catch(error => {
        console.error('Error deleting documents:', error);
      });
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleCreateGroupClick = () => {

    setShowAddGroup(true);
    document.getElementsByClassName("overlay")[0].style.display = "flex";

  };


  const handleCloseFormClick = () => {

    setNewGroupName('');
    setNewGroupDetails('');
    setNewGroupCategory('');
    setSearchTerm('');

    setShowAddGroup(false);
    setShowGroupPreview(false)
    setSelectedGroup(null);
    setSelectedGroupMembers([]);
    document.getElementsByClassName("overlay")[0].style.display = "none";

  };


  const handleSubmitNewGroup = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);

    if (newGroupName !== '') {

      try {
        await addDoc(collection(database, 'Groups'), {

          name: newGroupName,
          details: newGroupDetails,
          // imageUrl: '/brainwave.png', // Replace with actual image path or logic
          // category: newGroupCategory.category,
          createdAt: Timestamp.now(),
          createdBy: currentUser.uid

        });

      } catch (error) {
        console.error('Error adding document: ', error);
      }

      fetchGroupByName(newGroupName).then(async (newGroup) => {

        try {
          await addDoc(collection(database, 'UsersToGroup'), {
            groupID: newGroup[0].id,
            grouName: newGroupName,
            userID: auth.currentUser.uid,
            userPermission: "group-owner",
            isMute: false,
            userDisplayName: currentUser.displayName,
            // userPhotoURL: currentUser.photoURL
          });

        } catch (error) {
          console.error('Error adding document: ', error);
        }
      });

      // fetchNonMemberGroups();
      fetchYourGroups();

      setNewGroupName('');
      setNewGroupDetails('');
      setNewGroupCategory('');
      document.getElementsByClassName("overlay")[0].style.display = "none";

    } else {

      setErrorMessage("Please enter a group name to create a group");
      console.log("Please enter a group name");
      setShowErrorForm(true);
      document.getElementsByClassName("overlay")[0].style.display = "flex";

    }

    setShowAddGroup(false)
    setIsSubmitting(false);
  };


  const handleGroupClick = (group) => {

    setSelectedGroup(group);
    fetchSelectedGroupMembers(group.name);
    setShowGroupPreview(true);
    document.getElementsByClassName("overlay")[0].style.display = "flex";


    //navigate(`/GroupPreview/${groupName}`);
  };


  const handleJoinGroupClick = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(database, 'UsersToGroup'), {
        groupID: selectedGroup.id,
        grouName: selectedGroup.name,
        userID: auth.currentUser.uid,
        isMute: false,
        userPermission: "default-member",
        userDisplayName: currentUser.displayName,
        // userPhotoURL: currentUser.photoURL
      });

    } catch (error) {
      console.error('Error adding document: ', error);
    }

    setIsSubmitting(false);
    setSelectedGroup(null);
    setSelectedGroupMembers([]);
    setShowGroupPreview(false);
    document.getElementsByClassName("overlay")[0].style.display = "none";

    fetchYourGroups();
    fetchNonMemberGroups();

  }

  const handleYourGroupClick = (group) => {
    navigate(`/GroupPage/${group.name}`, { state: { group } });
  }

  const handleYourGroupsClick = () => {
    fetchYourGroups();
    setActiveTab("your");
  };

  const handleDiscoverGroupsClick = () => {
    setActiveTab("discover");
    setDisplayingCategory(false);
  };

  const handleCategoryClick = (categoryName) => {

    setSelectedCategory(categoryName);
    setDisplayingCategory(true);

  };



  return (

    <div className="groups-panel overflow-x-hidden">
      <div className="groups-panel-navbar-container"> <Navbar page="groups" /> </div>
      <div className="groups-panel-container">
        <div className="flex w-full justify-center items-center">
          <input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full h-14 px-4 py-2 border rounded-l-md focus:outline-none text-xl font-semibold"
          />
          <button className="px-4 py-2 h-14 text-text-color bg-accent-red font-semibold rounded-r-md focus:outline-none text-xl hover:bg-accent-blue duration-300" ><SearchSVG className="h-8 w-8" /></button>
        </div>
        <div className="groups-panel-menu-btns-contianer py-5 justify-between">
          <div className=''>  <button className="text-center font-semibold bg-accent-red rounded-md hover:bg-accent-blue duration-300  text-lg p-4 px-7 text-white mr-8" onClick={handleYourGroupsClick}>Your Groups</button>
            <button className="text-center font-semibold bg-accent-red rounded-md hover:bg-accent-blue duration-300  text-lg p-4 text-white px-7 " onClick={handleDiscoverGroupsClick}>Discover Groups</button>
          </div>
          <button className="text-center font-semibold flex justify-center items-center bg-accent-red rounded-md hover:bg-accent-blue duration-300  text-lg p-4 text-white" onClick={handleCreateGroupClick}><PlusNoCircleSVG className="h-8 w-8" /></button>
        </div>

        <div className="white-line"></div>

        {activeTab === 'discover' && (
          <div>
            {!displayingCategory && (
              <div className="categories-container">
              </div>
            )}

            {displayingCategory && (
              <div>
                <img src={group_icon_red}> </img>
                <h1 className="category-banner-name">{selectedCategory}</h1>
                <button className="return-btn" onClick={handleDiscoverGroupsClick}>Back</button>
                <h2>Discover the category's trending groups!</h2>

              </div>
            )}

            <div className="groups-container">
              <h2 className='discover-title'>Join recommended groups!</h2>

              <div className="group-grid">
                {nonMemberGroupsWithMembers.filter(displayingCategory ? (group => group.name.toLowerCase().includes(searchTerm.toLowerCase()) && group.category.toLowerCase() === selectedCategory.toLowerCase()) : (group =>
                  group.name && typeof group.name === 'string' &&
                  group.name.toLowerCase().includes(searchTerm.toLowerCase()))
                ).map(group => (
                  <div
                    key={group.name}
                    className="group-grid-item"
                    onClick={() => handleGroupClick(group)}
                  >
                    <div className='flex flex-col justify-center items-center'>
                      <img className='rounded-lg w-3/4 hover:w-64 duration-300' src={group_icon_red}></img>
                      <h3 className="text-text-color text-wxl mt-5 font-semibold">{group.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'your' && (

          <div>
            <div className="groups-container">
              <h2 className='discover-title'>Your groups:</h2>
              <div className="group-grid">
                {yourGroupsWithMembers.filter(group => group.name.toLowerCase().includes(searchTerm.toLowerCase())).map(group => (
                  <div
                    key={group.name}
                    className="group-grid-item"
                    onClick={() => handleYourGroupClick(group)}
                  >
                    <div className='flex flex-col justify-center items-center'>
                      <img className='rounded-lg w-3/4 hover:w-64 duration-300' src={group_icon_blue}></img>
                      <h3 className="text-text-color text-wxl mt-5 font-semibold">{group.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        )}


        {showAddGroup && (
          <div className="popup-form">
            <button className="popup-form-close-btn" type="button" onClick={handleCloseFormClick}>X</button>

            <form onSubmit={handleSubmitNewGroup} className='popup-form-form'>

              <div className='popup-form-container'>

                <h1 className="popup-form-title">Create a new group!</h1>

                <div className="popup-form-div">
                  <h2 className="popup-form-subtitle">Group Name:</h2>
                  <input
                    className="popup-form-input"
                    type="text"
                    placeholder="Enter name here"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="popup-form-div">
                  <h2 className="popup-form-subtitle">Group Details:</h2>
                  <textarea
                    className="popup-form-input"
                    placeholder="Enter details here"
                    value={newGroupDetails}
                    onChange={(e) => setNewGroupDetails(e.target.value)}
                    disabled={isSubmitting}
                  ></textarea>
                </div>




                <button type="submit" className='bob-btn-1' id="create-group-btn" disabled={isSubmitting}>Create Group</button>

              </div>
            </form>
          </div>
        )}

        {showGroupPreview && (
          <div className="popup-form">
            <button type="button" className="popup-form-close-btn" onClick={handleCloseFormClick}>X</button>


            <form onSubmit={handleJoinGroupClick} className='popup-form-form'>

              <div className='popup-form-container'>

                <h1 className="popup-form-title">{selectedGroup.name}</h1>

                <div className='popup-form-div'>
                  <h2 className="popup-form-subtitle">Group Description:</h2>
                  <div className="popup-form-text">{selectedGroup.details}</div>
                </div>

                <div className='popup-form-div'>
                  <h2 className="popup-form-subtitle">Group Members ({selectedGroupMembers.length}):</h2>

                  <div className="popup-form-member-icons-container">

                    {selectedGroupMembers.length === 0 ? (
                      <img className="popup-form-member-icon" src="/cross.png" alt="Default" />
                    ) : (
                      selectedGroupMembers.map((member) => (
                        <img className="popup-form-member-icon" src={member.userPhotoURL} alt="user" />
                      )))}

                  </div>
                </div>

                <button type="submit" className='bob-btn-1' id="join-group-btn" disabled={isSubmitting}>Join Group</button>
              </div>


            </form>
          </div>
        )}
        <div className="overlay"></div>

        {showErrorForm && (
          <div className="popup-form" id="error-form">
            <form onSubmit={handleOkClick} className='popup-form-form' id='error-form-form'>
              <div className='popup-form-text' id='error-form-text'>{errorMessage}</div>
              <button type="submit" className="bob-btn-1" id='error-form-btn'>
                Okay
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupsPanel;