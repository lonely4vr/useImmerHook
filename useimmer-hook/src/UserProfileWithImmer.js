import React, { useState } from 'react';
import produce from 'immer'; 

function UserProfileWithImmer() {
  // State initialization
  const [userProfile, setUserProfile] = useState({
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    contact: {
      phoneNumber: '555-555-5555',
      homeAddress: '789 Pine St, Smalltown, USA'
    },
    settings: {
      newsletter: true,
      notifications: true
    }
  });

  // Function to update contact details
  const updateContactDetails = (newPhone, newAddress) => {
    // Use Immer to update nested state immutably
    const updatedProfile = produce(userProfile, draft => {
      draft.contact.phoneNumber = newPhone;
      draft.contact.homeAddress = newAddress;
    });
    // Update state with the new profile
    setUserProfile(updatedProfile);
  };

  // Function to toggle newsletter subscription
  const toggleNewsletterSubscription = () => {
    // Use Immer to update state immutably
    const updatedProfile = produce(userProfile, draft => {
      draft.settings.newsletter = !draft.settings.newsletter;
    });
    // Update state with the new profile
    setUserProfile(updatedProfile);
  };

  return (
    <div>
      {/* Display user profile information */}
      <h2>User Profile</h2>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Phone: {userProfile.contact.phoneNumber}</p>
      <p>Address: {userProfile.contact.homeAddress}</p>
      <p>Newsletter Subscription: {userProfile.settings.newsletter ? 'Subscribed' : 'Not Subscribed'}</p>
      
      {/* Buttons to trigger state updates */}
      <button onClick={() => updateContactDetails('987-654-3210', '456 Elm St, Othertown, USA')}>
        Update Contact Details
      </button>
      <button onClick={toggleNewsletterSubscription}>
        {userProfile.settings.newsletter ? 'Unsubscribe' : 'Subscribe'} to Newsletter
      </button>
    </div>
  );
}

export default UserProfileWithImmer;
